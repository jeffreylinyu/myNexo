<?php
namespace Modules\AimvastFactura\Http\Controllers;

use Illuminate\Http\Request;
use Modules\AimvastFactura\DTE;
use Modules\AimvastFactura\Config;
use App\Http\Controllers\DashboardController;

class FolioTaxInfoController extends DashboardController {
    public function __construct() {
        parent::__construct();
        $config = App(Config\Config::class);
        $apiKey = $config->get_api_key();
        $apiUrl = $config->get_api_url();
        $this->api = new DTE\OpenFactura($apiKey, $apiUrl);
    }

    public function get_tax_payer(Request $request) {
        $rut = $request['rut'];
        $r = $this->api->getTaxPayer($rut);
        if (!$r->OK()) {
            throw new IssueFolioFailed("Cannot get organization's tax information");
        }
        $data = $r->data();

        $info = [];
        $info['business_name'] = $data->getBusinessName();
        $info['direction'] = $data->getDirection();
        $info['village'] = $data->getVillage();
        $info['phone'] = $data->getPhoneNumber();
        $info['branch'] = [];
        foreach ($data->getBranch() as $br) {
            $b = array();
            $b['direction'] = $br['direction'];
            $b['village'] = $br['village'];
            $b['phone'] = $br['phone'];
            $b['cdg'] = $br['cdg'];
            array_push($info['branch'], $b);
        }
        return response()->json($info);
    }

    public function get_organization(Request $req) {
        $r = $this->api->getOrganization();
        if (!$r->OK()) {
            throw new IssueFolioFailed("Cannot get organization's tax information");
        }
        $org = $r->data();

        $info = [];
        $info['business_name'] = $org->getBusinessName();
        $info['direction'] = $org->getDirection();
        $info['village'] = $org->getVillage();
        $info['giro'] = $org->getGiroInfo();
        $info['phone'] = $org->getPhoneNumber();
        $info['cdg'] = $org->getCdg();
        $info['branch'] = [];
        foreach ($org->getBranch() as $br) {
            $b = array();
            $b['direction'] = $br['direction'];
            $b['village'] = $br['village'];
            $b['phone'] = $br['phone'];
            $b['cdg'] = $br['cdg'];
            array_push($info['branch'], $b);
        }
        return response()->json($info);
    }

}
