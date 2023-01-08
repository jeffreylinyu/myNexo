<?php

namespace Modules\NsGastro\Models;

use App\Models\NsModel;
use App\Models\Product;

class ModifierGroup extends NsModel
{
    protected $table = 'nexopos_gastro_modifiers_groups';

    public function modifiers()
    {
        return $this->hasMany(Product::class, 'modifiers_group_id');
    }
}
