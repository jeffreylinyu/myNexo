<?php
namespace App\Models;

use App\Models\Unit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductHistory extends Model
{
    use HasFactory;
    
    protected $table    =   'nexopos_' . 'products_histories';

    const ACTION_STOCKED       =   'procured';
    const ACTION_DELETED       =   'deleted';
    const ACTION_TRANSFER_OUT  =   'outgoing-transfer';
    const ACTION_TRANSFER_IN   =   'incoming-transfer';
    const ACTION_REMOVED       =   'removed';
    const ACTION_ADDED         =   'added';
    const ACTION_SOLD          =   'sold';
    const ACTION_RETURNED      =   'returned';
    const ACTION_DEFECTIVE     =   'defective';
    const ACTION_LOST          =   'lost';

    /**
     * actions that reduce stock
     */
    const STOCK_REDUCE         =   [
        ProductHistory::ACTION_DELETED,
        ProductHistory::ACTION_TRANSFER_OUT,
        ProductHistory::ACTION_REMOVED,
        ProductHistory::ACTION_SOLD,
        ProductHistory::ACTION_DEFECTIVE,
        ProductHistory::ACTION_LOST,
    ];

    /**
     * actions that increase stock
     */
    const STOCK_INCREASE        =   [
        ProductHistory::ACTION_ADDED,
        ProductHistory::ACTION_RETURNED,
        ProductHistory::ACTION_TRANSFER_IN,
        ProductHistory::ACTION_STOCKED,
    ];

    public function scopeFindProduct( $query, $id )
    {
        return $query->where( 'product_id', $id );
    }

    public function unit()
    {
        return $this->belongsTo( Unit::class );
    }
}