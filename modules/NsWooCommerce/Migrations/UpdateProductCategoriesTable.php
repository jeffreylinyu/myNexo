<?php
/**
 * Table Migration
**/

namespace Modules\NsWooCommerce\Migrations;

use App\Classes\Schema;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class UpdateProductCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::table('nexopos_products_categories', function (Blueprint $table) {
            if (! Schema::hasColumn('nexopos_products_categories', 'wc_category_id')) {
                $table->integer('wc_category_id')->nullable();
            }
        });

        Schema::table('nexopos_products', function (Blueprint $table) {
            if (! Schema::hasColumn('nexopos_products', 'wc_product_id')) {
                $table->integer('wc_product_id')->nullable();
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
