<?php

namespace Modules\NsGastro\Models;

use App\Models\NsModel;
use App\Models\Product;

class OrderProductModifier extends NsModel
{
    protected $table = 'nexopos_orders_products_modifiers';

    public function product()
    {
        return $this->hasOne(Product::class, 'id', 'modifier_id');
    }

    public function group()
    {
        return $this->belongsTo(OrderProductModifierGroup::class, 'product_modifier_group_id', 'id');
    }
}
