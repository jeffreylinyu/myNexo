<?php

namespace Modules\NsGastro\Models;

use App\Models\NsModel;
use Illuminate\Database\Eloquent\Factories\Relationship;

class KitchenPrinter extends NsModel
{
    protected $table = 'nexopos_gastro_kitchens_printers';

    /**
     * Relation for fetching attached
     * kitchen.
     *
     * @return Relationship;
     */
    public function kitchen()
    {
        return $this->belongsTo(Kitchen::class, 'id', 'kitchen_id');
    }
}
