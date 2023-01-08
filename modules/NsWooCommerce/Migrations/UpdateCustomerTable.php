<?php
/**
 * Table Migration
**/

namespace Modules\NsWooCommerce\Migrations;

use App\Classes\Schema;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class UpdateCustomerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::table('nexopos_customers', function (Blueprint $table) {
            if (! Schema::hasColumn('nexopos_customers', 'wc_customer_id')) {
                $table->integer('wc_customer_id')->nullable();
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
        Schema::table('nexopos_customers', function (Blueprint $table) {
            if (Schema::hasColumn('nexopos_customers', 'wc_customer_id')) {
                $table->dropColumn('wc_customer_id');
            }
        });
    }
}
