<?php

namespace Modules\NsGastro\Models;

use App\Models\NsModel;
use App\Models\ProductCategory;

class KitchenCategory extends NsModel
{
    protected $table = 'nexopos_gastro_kitchens_categories';

    public function categories()
    {
        return $this->belongsTo(ProductCategory::class, 'category_id', 'id');
    }

    public function kitchen()
    {
        return $this->belongsTo(Kitchen::class, 'kitchen_id', 'id');
    }
}
