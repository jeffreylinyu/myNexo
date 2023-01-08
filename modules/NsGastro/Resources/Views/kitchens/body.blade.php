@extends( 'layout.dashboard' )

@section( 'layout.dashboard.footer.inject' )
    @parent
    <script>
    const GastroSettings    =   {
        ns_gastro_tables_enabled: <?php echo ( int ) ns()->option->get( 'ns_gastro_tables_enabled' ) ? 'true' : 'false'; ?>,
        ns_gastro_table_availability: <?php echo ( int ) ns()->option->get( 'ns_gastro_table_availability' ) ? 'true' : 'false'; ?>,
        ns_gastro_areas_enabled: <?php echo ( int ) ns()->option->get( 'ns_gastro_areas_enabled' ) ? 'true' : 'false'; ?>,
        ns_gastro_seats_enabled: <?php echo ( int ) ns()->option->get( 'ns_gastro_seats_enabled' ) ? 'true' : 'false'; ?>,
        ns_gastro_enable_table_sessions: <?php echo ( int ) ns()->option->get( 'ns_gastro_enable_table_sessions' ) ? 'true' : 'false'; ?>,
        typeLabels: <?php echo json_encode( config( 'nexopos.orders.types-labels' ) );?>
    }
    </script>
    <script src="{{ asset( '/modules/nsgastro/js/GastroKitchen.js' ) }}"></script>
    <link rel="stylesheet" href="{{ asset( 'modules/nsgastro/css/gastro.css' ) }}"></script>
@endsection

@section( 'layout.dashboard.body' )
<div class="h-full overflow-hidden flex flex-col">
    @include( Hook::filter( 'ns-dashboard-header', '../common/dashboard-header' ) )
    <div id="dashboard-content" class="overflow-hidden flex flex-auto w-full">
        <gastro-kitchen></gastro-kitchen>
    </div>
</div>
@endsection