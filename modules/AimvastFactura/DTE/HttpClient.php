<?php

namespace Modules\AimvastFactura\DTE;

class HttpClient{
    const HTTP_GET  = 1;
    const HTTP_POST = 2;

    private $method;
    private $headers;

    public function __construct() {
        $this->headers = array();
    }

    private function _getMethodStr($m) {
        switch($m) {
        case 1:
            return 'GET';
        case 2:
            return 'POST';
        default:
            return 'GET';
        }
    }

    public function setHeaders($data) {
            foreach ($data as $key=>$item) {
                $this->headers[] = "$key:$item";
            }
            // POST data length large then 1KB
            // Default no need add Expect:100-continue
            $headers[] = "Expect:";

        return $this;
    }

    public function preformRequest($url, $params, $data) {

        $ch = curl_init();
        $timeout = 120;

        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        if (!empty($this->headers)) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $this->headers);
        }
        curl_setopt($ch, CURLOPT_NOBODY, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $this->_getMethodStr($this->method));

        $url .= '?' . http_build_query($params);
        if ($this->method != self::HTTP_GET) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }
        curl_setopt($ch, CURLOPT_URL, $url);


        $result = curl_exec($ch);

        $response = [];

        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $response['httpcode'] = $httpcode;

        $header_len = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $response_body = substr($result, $header_len);
        $response['data'] = $response_body;
        if(!curl_errno($ch) && $httpcode==200){
            $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

            $info = curl_getinfo($ch);
            //Log::info('Executed time' . $info['total_time'] . ' Seconds, ' . $info['url']);
            $response['msg']= 'OK';
        }else{
            //Log::info('Curl error: ' . curl_error($ch)) ;
            $response['msg'] = "Requset $url failed: Curl error: ". curl_error($ch);
        }

        $reqInfo = curl_getinfo($ch);

        curl_close($ch);
        return $response;
    }

    public function get($url, $params) {
        $this->method = self::HTTP_GET;
        return $this->preformRequest($url, (isset($params))?$params:array(), array());
    }

    public function post($url, $param, $data) {
        $this->method = self::HTTP_POST;
        return $this->preformRequest(
            $url,
            ((isset($params))?$params:array()),
            ((isset($data))?$data:''),
        );
    }
}
