<?php

namespace Modules\NsWooCommerce;

use App\Services\Module;

include_once dirname(__FILE__).'/vendor/autoload.php';

class NsWooCommerceModule extends Module
{
    public function __construct()
    {
        parent::__construct(__FILE__);
    }
}
