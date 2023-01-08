<?php
/**
 * Table Migration
**/

namespace Modules\NsGastro\Migrations;

use App\Classes\Schema;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateKitchensForRestaurant extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::createIfMissing('nexopos_gastro_kitchens', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('notification_status')->default('enabled'); // enabled, disabled
            $table->string('notification_sound')->nullable();
            $table->string('status')->default('unavailable'); // available, unavailable, booked
            $table->integer('author');
            $table->timestamps();
        });

        Schema::createIfMissing('nexopos_gastro_kitchens_categories', function (Blueprint $table) {
            $table->id();
            $table->integer('kitchen_id');
            $table->integer('category_id');
            $table->timestamps();
        });

        Schema::createIfMissing('nexopos_gastro_kitchens_printers', function (Blueprint $table) {
            $table->id();
            $table->integer('kitchen_id');
            $table->string('printer'); // might be printer name
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return  void
     */
    public function down()
    {
        Schema::dropIfExists('nexopos_gastro_kitchens');
        Schema::dropIfExists('nexopos_gastro_kitchens_categories');
        Schema::dropIfExists('nexopos_gastro_kitchens_printers');
    }
}
