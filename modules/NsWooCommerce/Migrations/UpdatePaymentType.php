<?php
/**
 * Table Migration
**/

namespace Modules\NsWooCommerce\Migrations;

use App\Classes\Schema;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class UpdatePaymentType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::table('nexopos_payments_types', function (Blueprint $table) {
            if (! Schema::hasColumn('nexopos_payments_types', 'wc_payment_id')) {
                $table->string('wc_payment_id')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return  void
     */
    public function down()
    {
        Schema::table('nexopos_payments_types', function (Blueprint $table) {
            if (Schema::hasColumn('nexopos_payments_types', 'wc_payment_id')) {
                $table->dropColumn('wc_payment_id');
            }
        });
    }
}
