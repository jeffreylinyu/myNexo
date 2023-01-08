<?php
namespace Modules\AimvastFactura\Events;

use App\Events\OrderAfterCreatedEvent;
use App\Events\OrderAfterCheckPerformedEvent;
use Modules\AimvastFactura\DTE;
use Modules\AimvastFactura\Config;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;
use Log;

/**
 * Register Events
**/
class AimvastFacturaEvent
{
    public function __construct() {}

    public function create(OrderAfterCheckPerformedEvent $event) {
        $folio = isset($event->fields['folio']) ? $event->fields['folio'] : null;

        // skip folio operation
        if($folio == null) { return; }

        $config = App(Config\Config::class);
        $ANONYMOUS_RUT = $config->get_anonymous_rut();
        $apiKey = $config->get_api_key();
        $apiUrl = $config->get_api_url();

        $recv_rut = $ANONYMOUS_RUT;
        $recv_giro = '';
        $giro = '';
        $desc = '';

        $api = new DTE\OpenFactura($apiKey, $apiUrl);
        $dteResp = new DTE\DTEResponse();
        $dteResp->enable80mm();
        $dteResp->enablePdf();
        switch($folio['type']) {
        case DTE\FolioType::Boleta:
            $idDoc = new DTE\IdDoc(DTE\FolioType::Boleta);
            $cdg = '';
            $recv_cdg = '';
            break;
        case DTE\FolioType::Factura:
            $idDoc = new DTE\IdDoc(DTE\FolioType::Factura);
            $cdg = is_null($folio['cdg'])?'':$folio['cdg'];
            $giro = $folio['giro'];
            $recv_giro = $folio['recv_giro'];
            $recv_cdg = $folio['recv_cdg'];
            break;
        default:
            return;
        }

        $items = [];
        $item_idx = 1;

        foreach($event->fields['products'] as $item){
            //Log::debug(print_r($item, true));
            $item = new DTE\DetailItem(
                $item_idx,
                $item['name'],
                $item['quantity'],
                $item['unit_price'],
                $item['discount'],
            );
            array_push($items, $item->get());
            $item_idx++;
        }

        $discount = $event->fields['subtotal'] - $event->fields['total'];
        if (count($items)){
            $result = $api->issueDte(
                $recv_rut,
                $dteResp,
                $idDoc,
                $items,
                (0.19),
                $discount,
                $giro,
                $cdg,
                $recv_giro,
                $recv_cdg,
                $desc,
            );
            Log::error(print_r($result->OK(), true));
            $data = $result->data();

            $filename = 'folio-latest.pdf';
            if ($folio['hash']){ $filename = 'folio-' . $folio['hash'] . '.pdf'; }
            Log::debug("StroingFolioTo:" . $filename);
            Storage::disk('local')->put($filename, base64_decode($data->getPdf()));
        }

        Log::debug("CreatedBoletaDone");
    }

    public function write_folio(OrderAfterCreatedEvent $event) {
        $folio = isset($event->fields['folio']) ? $event->fields['folio'] : null;

        if($folio == null) {
            // skip folio operation
            return;
        }

        $new_filename = 'folio-' . $event->order->id . '.pdf';
        $filename = 'folio-latest.pdf';
        if ($folio['hash']){ $filename = 'folio-' . $folio['hash'] . '.pdf'; }

        Log::debug('Move ' . $filename . ' to ' . $new_filename);
        Storage::disk('local')->move($filename, $new_filename);
    }
}
