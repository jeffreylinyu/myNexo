<?php

namespace Modules\NsWooCommerce\Console;

use App\Console\Kernel as AppKernel;
use Modules\NsWooCommerce\Jobs\CheckStoreConnectivityJob;

class Kernel extends AppKernel
{
    public function schedule($schedule)
    {
        $schedule->call(CheckStoreConnectivityJob::class)
            ->everyFiveMinutes();
    }
}
