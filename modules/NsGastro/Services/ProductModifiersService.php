<?php

namespace Modules\NsGastro\Services;

use Illuminate\Support\Facades\Auth;
use Modules\NsGastro\Models\ModifierGroup;

class ProductModifiersService
{
    public function createGroup($data)
    {
        $group = new ModifierGroup;
        $group->name = $data['name'];
        $group->forced = $data['forced'];
        $group->countable = $data['countable'];
        $group->multiselect = $data['multiselect'];
        $group->description = $data['description'];
        $group->author = Auth::id();
        $group->save();

        return [
            'status'    =>  'success',
            'message'   =>  __m('The product modifier group has been create.', 'NsGastro'),
        ];
    }
}
