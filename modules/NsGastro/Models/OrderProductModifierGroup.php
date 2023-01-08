<?php

namespace Modules\NsGastro\Models;

use App\Models\NsModel;

class OrderProductModifierGroup extends NsModel
{
    protected $table = 'nexopos_orders_products_modifiers_groups';

    public function modifiers()
    {
        return $this->hasMany(OrderProductModifier::class, 'product_modifier_group_id', 'id');
    }
}
