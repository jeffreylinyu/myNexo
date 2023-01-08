<?php

namespace Modules\AimvastFactura\DTE;

use Modules\AimvastFactura\DTE\BaseTexPayer;
use Modules\AimvastFactura\DTE\HttpClient;
use App\Exceptions\Dte\IssueFolioFailed;
use Illuminate\Support\Facades\Cache;
use DateTime;
use Log;

class FolioType {
    /* DTE Type(Tipo DTE)
     * Factura electrónica (33).
     * Factura exenta electrónica (34).
     * Boleta electrónica (39).
     * Boleta exenta electrónica (41).
     * Factura de compra electrónica (46).
     * Guía de despacho electrónica (52).
     * Nota de débito electrónica (56).
     * Nota de crédito electrónica (61).
     * Factura de exportación electrónica (110).
     * Nota de débito exportación electrónica (111).
     * Nota de crédito exportación electrónica (112).
     * Información electrónica de compras y ventas (IECV).
     * Libro de guías de despacho electrónico.
     * Libro de boletas y reporte de consumo de folios (RCOF).
     */

    public const Receipt = 1;  //XXX set as receipt type
    public const Factura = 33;
    public const Boleta = 39;
    public const NotaDeCreditoElectrónica = 61;
}

abstract class AbstractFiller {
    public function get() { return $this->d; }
}

class IdDoc extends AbstractFiller{
    public function __construct(int $type, DateTime $datetime=NULL)
    {
        $dt = isset($datetime)? $datetime: new DateTime();

        $this->d = [
            "TipoDTE" => $type,
            "Folio" => 0, // must be 0
            "FchEmis" => $dt->format('Y-m-d'),
            'IndServicio' => '3',
        ];
    }

    public function get_type() { return $this->d['TipoDTE']; }
}

class DteResponse extends AbstractFiller{

    public function __construct()
    {
        $this->d = [
            'FOLIO',
        ];
    }

    public function enable80mm(){ array_push($this->d, '80MM'); }
    public function enablePdf(){ array_push($this->d, 'PDF'); }
}

class DetailItem extends AbstractFiller{
    public function __construct(
        int $number, // NorLieDet
        string $name,  // NmbItem
        float $qty, // max 6 decimals
        float $price,  // max 6 decimals
        float $discount
    )
    {
        $this->d = [
            'NroLinDet'=> $number,
            'NmbItem'=> $name,
            'QtyItem' => $qty,
            'PrcItem' => $price,
            'MontoItem' => ($qty*$price)-$discount,
        ];

        if($discount != 0) {
            $this->d['DescuentoMonto'] = $discount;
        }
    }
}

class ResultSet
{
    public function __construct($raw, $clsType=null)
    {
        $this->_OK = false;
        if ($raw['httpcode'] == 200) {
            $this->_OK = true;
        } else {
            Log::Error("OpenFacturaRequestFail:" . $raw['data']);
        }
        $this->_data = json_decode($raw['data']);
        if (property_exists($this->_data, 'error')) {
            $this->_OK = false;
        }
        if ($this->_OK) {
            if (isset($clsType)) {
                $this->_data = new $clsType($this->_data);
            }
        }
    }

    public function OK() : bool
    {
        return $this->_OK;
    }
    public function data()
    {
        return $this->_data;
    }
}

class Document
{
    public function __construct($raw)
    {
        $this->raw = $raw;
    }
    public function getToken()
    {
        return $this->raw->TOKEN;
    }
    public function getFolio()
    {
        return $this->raw->FOLIO;
    }
    public function getPdf()
    {
        return $this->raw->PDF;
    }
}

class TexPayer implements BaseTexPayer
{
    /*
    * {
    *     "rut": "76795561-8",
    *     "razonSocial": "HAULMER SPA",
    *     "email": null,
    *     "telefono": "0 0",
    *     "direccion": "ARTURO PRAT 527   CURICO",
    *     "comuna": "Curicó",
    *     "actividades": [
    *         {
    *             "giro": "PRODUCTOS Y SERVICIOS RELACIONADOS CON INTERNET, SOFTWARE, DISPOSITIVO",
    *             "actividadEconomica": "VENTA AL POR MENOR DE COMPUTADORES, EQUIPO PERIFERICO, PROGRAMAS INFOR",
    *             "codigoActividadEconomica": "474100",
    *             "actividadPrincipal": false
    *         },
    *         {
    *             "giro": "VENTA AL POR MENOR POR CORREO, POR INTERNET Y VIA TELEFONICA",
    *             "actividadEconomica": "VENTA AL POR MENOR POR CORREO, POR INTERNET Y VIA TELEFONICA",
    *             "codigoActividadEconomica": "479100",
    *             "actividadPrincipal": true
    *         },
    *         {
    *             "giro": "VENTA AL POR MENOR POR CORREO, POR INTERNET Y VIA TELEFONICA",
    *             "actividadEconomica": "ACTIVIDADES DE CONSULTORIA DE INFORMATICA Y DE GESTION DE INSTALACIONE",
    *             "codigoActividadEconomica": "620200",
    *             "actividadPrincipal": false
    *         },
    *         {
    *             "giro": "VENTA AL POR MENOR POR CORREO, POR INTERNET Y VIA TELEFONICA",
    *             "actividadEconomica": "PROCESAMIENTO DE DATOS, HOSPEDAJE Y ACTIVIDADES CONEXAS",
    *             "codigoActividadEconomica": "631100",
    *             "actividadPrincipal": false
    *         },
    *         {
    *             "giro": "VENTA AL POR MENOR POR CORREO, POR INTERNET Y VIA TELEFONICA",
    *             "actividadEconomica": "EMPRESAS DE ASESORIA Y CONSULTORIA EN INVERSION FINANCIERA; SOCIEDADES",
    *             "codigoActividadEconomica": "661903",
    *             "actividadPrincipal": false
    *         },
    *         {
    *             "giro": "VENTA AL POR MENOR POR CORREO, POR INTERNET Y VIA TELEFONICA",
    *             "actividadEconomica": "ACTIVIDADES DE CALL-CENTER",
    *             "codigoActividadEconomica": "822000",
    *             "actividadPrincipal": false
    *         }
    *     ],
    *     "sucursales": [
    *         {
    *             "cdgSIISucur": "81303347",
    *             "comuna": "Curicó",
    *             "direccion": "ARTURO PRAT 527   CURICO",
    *             "ciudad": "CURICO",
    *             "telefono": null
    *         }
    *     ]
    * }
    */

    public function __construct($raw)
    {
        $this->raw = $raw;
    }
    public function getRut()
    {
        return $this->raw->rut;
    }
    public function getEmail()
    {
        if (is_null($this->raw->email)) {
            return '';
        }
        return $this->raw->email;
    }
    public function getPhoneNumber()
    {
        if (is_null($this->raw->telefono)) {
            return '';
        }
        return $this->raw->telefono;
    }
    public function getDirection()
    {
        return $this->raw->direccion;
    }
    public function getVillage()
    {
        return $this->raw->comuna;
    }
    public function getBusinessName()
    {
        return $this->raw->razonSocial;
    }
    public function getActivities()
    {
        $out = array();
        foreach ($this->raw->actividades as $item) {
            $i = array();
            $i['desc'] = $item->giro;
            $i['activity'] = $item->actividadEconomica;
            $i['code'] = $item->codigoActividadEconomica;
            $i['main_activity'] = $item->actividadPrincipal;
            array_push($out, $i);
        }
        return $out;
    }

    public function getBranch()
    {
        $out = array();
        foreach ($this->raw->sucursales as $item) {
            $i = array();
            $i['cdg'] = $item->cdgSIISucur;
            $i['village'] = $item->comuna;
            $i['direction'] = $item->direccion;
            $i['town'] = $item->ciudad;
            $i['phone'] = $item->telefono;
            array_push($out, $i);
        }
        return $out;
    }
}

class Organization extends TexPayer
{
    public function getGiroInfo()
    {
        return $this->raw->glosaDescriptiva;
    }
    public function getCdg()
    {
        return $this->raw->cdgSIISucur;
    }
}

class OpenFactura
{
    public function __construct(string $apikey, string $baseurl, int $cache_ttl=3600)
    {
        $this->baseurl = $baseurl;
        $this->apikey = $apikey;
        $this->cache_ttl = $cache_ttl;
    }

    private function _getHttpClient()
    {
        $http = new HttpClient();
        $http->setHeaders(
            array(
                'Content-Type' =>  'application/json',
                'apikey' => $this->apikey,
            )
        );
        return $http;
    }

    private function _genUrl($path)
    {
        return $this->baseurl . $path;
    }

    public function issueDte(
        string $rut,
        DteResponse $dr,
        IdDoc $idDoc,
        array $items,
        float $tesaiva,
        int $discount,
        string $giro_code,
        string $cdg,
        string $receiver_giro,
        string $receiver_cdg,
        string $desc
    ) {
        $total = 0;
        foreach ($items as $i) {
            $total += $i['MontoItem'];
        }

        $payload = [
            'response' => $dr->get(),
            'dte' => [
                'Encabezado' => [
                    'IdDoc' => $idDoc->get(),
                    'Receptor' => [
                        'RUTRecep' => $rut,
                    ],
                    'Totales' => [],
                ],
                'Detalle' => $items,
            ],
            'custom' => [
                'informationNote' => $desc,
                'paymentNote' => '',
            ]
        ];

        if ($discount!=0) {
            $total -= $discount;
            $payload['dte']['DscRcgGlobal']['NroLinDR'] = 1;
            $payload['dte']['DscRcgGlobal']['TpoMov'] = 'D';
            $payload['dte']['DscRcgGlobal']['TpoValor'] = '$';
            $payload['dte']['DscRcgGlobal']['ValorDR'] = $discount;
        }

        $r = $this->getOrganization();
        if (!$r->OK()) {
            throw new IssueFolioFailed("Cannot get organization's tax information");
        }
        $org = $r->data();

        $emisor = [];
        $emisor['business_name'] = $org->getBusinessName();
        $emisor['direction'] = $org->getDirection();
        $emisor['village'] = $org->getVillage();
        $emisor['giro'] = $org->getGiroInfo();
        $emisor['phone'] = $org->getPhoneNumber();
        $emisor['cdg'] = $org->getCdg();
        if (!empty($cdg)) {
            foreach ($org->getBranch() as $br) {
                if ($br['cdg'] == $cdg) {
                    $emisor['direction'] = $br['direction'];
                    $emisor['village'] = $br['village'];
                    $emisor['phone'] = $br['phone'];
                    $emisor['cdg'] = $br['cdg'];
                    break;
                }
            }
        }

        if ($idDoc->get_type() == FolioType::Boleta) {
            $payload['dte']['Encabezado']['Emisor'] = [];
            $payload['dte']['Encabezado']['Emisor']['RUTEmisor'] = $org->getRut();
            $payload['dte']['Encabezado']['Emisor']['RznSocEmisor'] = $emisor['business_name'];
            $payload['dte']['Encabezado']['Emisor']['GiroEmisor'] = '';
            $payload['dte']['Encabezado']['Emisor']['DirOrigen'] = $emisor['direction'];
            $payload['dte']['Encabezado']['Emisor']['CmnaOrigen'] = $emisor['village'];

            $net = round($total / (1+$tesaiva));
            $payload['dte']['Encabezado']['Totales']['MntTotal'] = $total;
            $payload['dte']['Encabezado']['Totales']['MntNeto'] = $net;
            $payload['dte']['Encabezado']['Totales']['IVA'] = $total - $net;
        } elseif ($idDoc->get_type() == FolioType::Factura) {
            if (empty($giro_code)) {
                throw new IssueFolioFailed("must set giro code");
            }

            $payload['dte']['Encabezado']['Emisor'] = [];
            $payload['dte']['Encabezado']['Emisor']['RUTEmisor'] = $org->getRut();
            $payload['dte']['Encabezado']['Emisor']['RznSoc'] = $emisor['business_name'];
            $payload['dte']['Encabezado']['Emisor']['GiroEmis'] = $emisor['giro'];
            $payload['dte']['Encabezado']['Emisor']['DirOrigen'] = $emisor['direction'];
            $payload['dte']['Encabezado']['Emisor']['CmnaOrigen'] = $emisor['village'];
            $payload['dte']['Encabezado']['Emisor']['Telefono'] = $emisor['phone'];
            $payload['dte']['Encabezado']['Emisor']['CorreoEmisor'] = '';
            $payload['dte']['Encabezado']['Emisor']['Acteco'] = $giro_code;

            // XXX sleep for OpenFactura, need a cache do it.
            sleep(1);
            $r = $this->getTaxPayer($rut);
            if (!$r->OK()) {
                throw new IssueFolioFailed("Cannot get target's tax information");
            }
            $tax_payer = $r->data();
            $payload['dte']['Encabezado']['Receptor']['RznSocRecep'] = $tax_payer->getBusinessName();

            if (empty($receiver_giro)) {
                // use 1st giro as default giro desc
                $receiver_giro = $tax_payer->getActivities()[0]['desc'];
            }
            $MAX_GERO_RECEP_STR_LEN = 40;
            if (strlen($receiver_giro) > $MAX_GERO_RECEP_STR_LEN) {
                $receiver_giro = substr($receiver_giro, $MAX_GERO_RECEP_STR_LEN);
            }

            $payload['dte']['Encabezado']['Receptor']['GiroRecep'] = $receiver_giro;
            $payload['dte']['Encabezado']['Receptor']['DirRecep'] = $tax_payer->getDirection();
            $payload['dte']['Encabezado']['Receptor']['CmnaRecep'] = $tax_payer->getVillage();

            $FACTURA_INCLUDE_TAX_IN_ITEM = true;

            if ($FACTURA_INCLUDE_TAX_IN_ITEM) {
                $payload['dte']['Encabezado']['IdDoc']['MntBruto'] = 1; // Enable Include Tax InItem

                $net = round($total / (1+$tesaiva));
                $payload['dte']['Encabezado']['Totales']['MntTotal'] = $total;
                $payload['dte']['Encabezado']['Totales']['MntNeto'] = $net;
                $payload['dte']['Encabezado']['Totales']['IVA'] = $total - $net;
            } else {
                $iva = round($total * $tesaiva);
                $payload['dte']['Encabezado']['Totales']['MntTotal'] = $total + $iva;
                $payload['dte']['Encabezado']['Totales']['MntNeto'] = $total;
                $payload['dte']['Encabezado']['Totales']['IVA'] = $iva;
            }
            $payload['dte']['Encabezado']['Totales']['TasaIVA'] = strval($tesaiva*100);

        }

        $http = $this->_getHttpClient();
        $url = $this->_genUrl('/v2/dte/document');
        $r = $http->post($url, null, $payload);
        return new ResultSet($r, Document::class);
    }

    /*
     * https://docsapi-openfactura.haulmer.com/#47417997-ee82-48ca-acf3-8c54ecde99ab
     */
    public function getIssued(
        int $folioType,
        DateTime $start,
        DateTime $end,
        int $pageOffset=null
    )
    {
        $http = $this->_getHttpClient();
        $url = $this->_genUrl('/v2/dte/document/issued');
        /*
         * {
         *    "Page":"5",
         *    "TipoDTE":{
         *       "eq":"33"
         *    },
         *    "FchEmis":{
         *       "lte":"2019-01-31",
         *       "gte":"2018-12-01"
         *    }
         * }
         */

        $payload = array(
            'TipoDTE' => array(
                'eq' => $folioType
            ),
            'FchEmis' => array(
                'lte' => $start->format('Y-m-d'),
                'gte' => $end->format('Y-m-d'),
            ),
        );
        if (isset($pageOffset)) {
            $payload['page'] = $pageOffset;
        }
        $r = $http->post($url, null, $payload);
        return new ResultSet($r);
    }

    /*
     * https://docsapi-openfactura.haulmer.com/#bb24b90f-58ed-4ec7-8107-8f8aa55932b9
     */
    public function getOrganization()
    {
        $output = null;
        $key = 'DteOpenFacturaGetOrganization'.$this->apikey;
        $c = Cache::get($key);

        if (is_null($c)) {
            $http = $this->_getHttpClient();
            $url = $this->_genUrl('/v2/dte/organization');
            $r = $http->get($url, null);
            $output = new ResultSet($r, Organization::class);

            if ($output->OK()) {
                Cache::put($key, $r, $seconds = $this->cache_ttl);
            }
        } else {
            $output = new ResultSet($c, Organization::class);
        }
        return $output;
    }

    /*
     * https://docsapi-openfactura.haulmer.com/#5bfe2d37-940d-4d03-b0da-ae7703f605b0
     */
    public function getTaxPayer($rut)
    {
        $output = null;
        $key = 'DteOpenFacturaGetTaxPayer'.$rut;
        $c = Cache::get($key);

        if (is_null($c)) {
            $http = $this->_getHttpClient();
            $url = $this->_genUrl('/v2/dte/taxpayer/' . $rut);
            $r = $http->get($url, null);

            $output = new ResultSet($r, TexPayer::class);
            if ($output->OK()) {
                Cache::put($key, $r, $seconds = $this->cache_ttl);
            }
        } else {
            $output = new ResultSet($c, TexPayer::class);
        }
        return $output;
    }
}
