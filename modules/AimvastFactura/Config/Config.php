<?php
namespace Modules\AimvastFactura\Config;

use Illuminate\Support\Facades\Storage;
use Log;

class Config {
    private $ANONYMOUS_RUT = '66666666-6';
    //API_KEY = '928e15a2d14d4a6292345f04960f4bd3';
    //API_URL = 'https://dev-api.haulmer.com';

    private $CONFIG_PATH = "aimvast_factura.json";
    private $api_key;
    private $api_url;

    public function __construct() {
        $this->load_config();
    }

    public function load_config() {
        if (Storage::exists($this->CONFIG_PATH)) {
            $config = json_decode(Storage::get($this->CONFIG_PATH));
            Log::debug(print_r($config, true));
            $this->api_key = $config->api_key;
            $this->api_url = $config->api_url;
            return;
        }
        //set default config
        $this->api_key = '928e15a2d14d4a6292345f04960f4bd3';
        $this->api_url = 'https://dev-api.haulmer.com';
        $this->store_config();
    }

    public function store_config() {
        Storage::put($this->CONFIG_PATH, json_encode($this->dump()));
    }

    public function dump() {
        $config = array(
            'api_key' => $this->api_key,
            'api_url' => $this->api_url,
        );
        return $config;
    }

    public function get_anonymous_rut() { return $this->ANONYMOUS_RUT; }

    public function get_api_key() { return $this->api_key; }
    public function set_api_key($key) { $this->api_key = $key; }
    public function get_api_url() { return $this->api_url; }
    public function set_api_url($url) { $this->api_url = $url; }
}

