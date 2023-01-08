<?php
/**
 * Table Migration
**/

namespace Modules\NsWooCommerce\Migrations;

use App\Classes\Schema;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class UpdateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::table('nexopos_orders', function (Blueprint $table) {
            if (! Schema::hasColumn('nexopos_orders', 'wc_order_id')) {
                $table->integer('wc_order_id')->nullable();
            }

            if (! Schema::hasColumn('nexopos_orders', 'wc_order_key')) {
                $table->string('wc_order_key')->nullable();
            }
        });

        Schema::table('nexopos_orders_products', function (Blueprint $table) {
            if (! Schema::hasColumn('nexopos_orders_products', 'wc_order_product_id')) {
                $table->integer('wc_order_product_id')->nullable();
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
        // drop tables here
    }
}
