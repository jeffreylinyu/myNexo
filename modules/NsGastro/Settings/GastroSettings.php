<?php

namespace Modules\NsGastro\Settings;

use App\Services\Helper;
use App\Services\ModulesService;
use App\Services\SettingsPage;

class GastroSettings extends SettingsPage
{
    protected $form;

    protected $identifier = 'ns-gastro-settings';

    public function __construct()
    {
        /**
         * @var ModulesService $module
         */
        $module = app()->make(ModulesService::class);

        /**
         * define the settings labels
         */
        $this->labels = [
            'title'         =>  __m('Gastro Settings', 'NsGastro'),
            'description'   =>  __m('Configure the settings for the restaurant.'),
        ];

        /**
         * general settings
         */
        $settings = [
            'tabs'      =>  [
                'general'   =>  [
                    'label' =>      __m('POS', 'NsGastro'),
                    'fields' =>     [
                        [
                            'label'     =>  __m('Table Availability', 'NsGastro'),
                            'name'      =>  'ns_gastro_table_availability',
                            'value'     =>  (int) ns()->option->get('ns_gastro_table_availability'),
                            'type'      =>  'switch',
                            'options'   =>  Helper::kvToJsOptions([
                                true   =>  __m('Enabled', 'Store Name'),
                                false  =>  __m('Disabled', 'NPS Logo'),
                            ]),
                            'description'   =>  __m('The availability determine whether a table can be set as busy or not.', 'NsGastro'),
                        ], [
                            'type'          =>  'switch',
                            'name'          =>  'ns_gastro_tables_enabled',
                            'label'         =>  __m('Tables Enabled', 'NsGastro'),
                            'value'         =>  (int) ns()->option->get('ns_gastro_tables_enabled'),
                            'description'   =>  __m('If set to yes, tables will be displayed on the POS.', 'NsGastro'),
                            'options'       =>  Helper::kvToJsOptions([false => __m('No', 'NsGastro'), true => __m('Yes', 'NsGastro')]),
                        ], [
                            'type'          =>  'switch',
                            'name'          =>  'ns_gastro_areas_enabled',
                            'label'         =>  __m('Areas Enabled', 'NsGastro'),
                            'value'         =>  (int) ns()->option->get('ns_gastro_areas_enabled'),
                            'description'   =>  __m('If set to yes, areas before seeing tables.', 'NsGastro'),
                            'options'       =>  Helper::kvToJsOptions([false => __m('No', 'NsGastro'), true => __m('Yes', 'NsGastro')]),
                        ], [
                            'type'          =>  'switch',
                            'name'          =>  'ns_gastro_seats_enabled',
                            'label'         =>  __m('Seats Enabled', 'NsGastro'),
                            'value'         =>  (int) ns()->option->get('ns_gastro_seats_enabled'),
                            'description'   =>  __m('If set to yes, seats selection will be forced.', 'NsGastro'),
                            'options'       =>  Helper::kvToJsOptions([false => __m('No', 'NsGastro'), true => __m('Yes', 'NsGastro')]),
                        ], [
                            'type'          =>  'switch',
                            'name'          =>  'ns_gastro_freed_table_with_payment',
                            'label'         =>  __m('Freed Table After Payment', 'NsGastro'),
                            'value'         =>  (int) ns()->option->get('ns_gastro_freed_table_with_payment'),
                            'description'   =>  __m('If set to yes, every time a complete payment is made over a table, that table will be marked as free.', 'NsGastro'),
                            'options'       =>  Helper::kvToJsOptions([false => __m('No', 'NsGastro'), true => __m('Yes', 'NsGastro')]),
                        ], [
                            'type'          =>  'switch',
                            'name'          =>  'ns_gastro_enable_table_sessions',
                            'label'         =>  __m('Enable Table Sessions', 'NsGastro'),
                            'value'         =>  (int) ns()->option->get('ns_gastro_enable_table_sessions'),
                            'description'   =>  __m('Useful to track orders made by a customer over a table.', 'NsGastro'),
                            'options'       =>  Helper::kvToJsOptions([false => __m('No', 'NsGastro'), true => __m('Yes', 'NsGastro')]),
                        ], [
                            'type'          =>  'switch',
                            'name'          =>  'ns_gastro_allow_ready_meal_cancelation',
                            'label'         =>  __m('Ready Meal Cancelation', 'NsGastro'),
                            'value'         =>  (int) ns()->option->get('ns_gastro_allow_ready_meal_cancelation'),
                            'description'   =>  __m('Wether or not cancelation for ready meal should possible.', 'NsGastro'),
                            'options'       =>  Helper::kvToJsOptions([false => __m('No', 'NsGastro'), true => __m('Yes', 'NsGastro')]),
                        ], [
                            'type'          =>  'switch',
                            'name'          =>  'ns_gastro_allow_cancelation_print',
                            'label'         =>  __m('Enable Cancelation Print', 'NsGastro'),
                            'value'         =>  (int) ns()->option->get('ns_gastro_allow_cancelation_print'),
                            'description'   =>  __m('Will print a receipt when a meal is canceled.', 'NsGastro'),
                            'options'       =>  Helper::kvToJsOptions([false => __m('No', 'NsGastro'), true => __m('Yes', 'NsGastro')]),
                        ], [
                            'type'          =>  'textarea',
                            'name'          =>  'ns_gastro_cancelation_note',
                            'label'         =>  __m('Cancelation Note', 'NsGastro'),
                            'value'         =>  ns()->option->get('ns_gastro_cancelation_note'),
                            'description'   =>  __m('A note that should appear at the head of each item cancelation receipt.', 'NsGastro'),
                        ],
                    ],
                ],
            ],
        ];

        if ($module->getIfEnabled('NsPrintAdapter')) {
            $settingFields  =   [
                [
                    'label'     =>      __m('Kitchen Print Gateway', 'NsGastro'),
                    'name'      =>  'ns_gastro_kitchen_print_gateway',
                    'value'     =>  ns()->option->get('ns_gastro_kitchen_print_gateway'),
                    'type'      =>  'select',
                    'options'   =>  Helper::kvToJsOptions([
                        'local_print'   =>  __m( 'Local Print', 'NsGastro' ),
                        'cloud_print'   =>  __m( 'Cloud Print', 'NsGastro' )
                    ]),
                    'description'   =>  __m('Select what gateway should be used for kitchen printing.', 'NsGastro'),
                ], 
            ];

            if ( ns()->option->get( 'ns_gastro_kitchen_print_gateway' ) === 'local_print' ) {
                $settingFields  =   array_merge( $settingFields, [
                    [
                        'label'     =>      __m('NPS Address', 'NsGastro'),
                        'name'      =>  'ns_gastro_nps_address',
                        'value'     =>  ns()->option->get('ns_gastro_nps_address'),
                        'type'      =>  'text',
                        'description'   =>  __m('Provide the address to reach Nexo Print Server (3.x)', 'NsGastro'),
                    ], 
                ]); 
            }

            $settingFields  =   array_merge( $settingFields, [
                [
                    'label'     =>      __m('Logo Shortcode', 'NsGastro'),
                    'name'      =>  'ns_gastro_logo_shortcode',
                    'value'     =>  ns()->option->get('ns_gastro_logo_shortcode'),
                    'type'      =>  'text',
                    'description'   =>  __m('If you\'re using a shortcode on or your logo provide it here.', 'NsGastro'),
                ], [
                    'label'     =>      __m('Convert To Image', 'NsGastro'),
                    'name'      =>  'ns_gastro_convert_to_image',
                    'value'     =>  ns()->option->get('ns_gastro_convert_to_image'),
                    'type'      =>  'select',
                    'options'   =>  Helper::kvToJsOptions([
                        'yes'   =>  __m('Yes', 'NsGastro'),
                        'no'    =>  __m('No', 'NsGastro'),
                    ]),
                    'description'   =>  __m('Choose if the receipt must be printed as an image.', 'NsGastro'),
                ], [
                    'label'     =>      __m('Logo Type', 'NsGastro'),
                    'name'      =>  'ns_gastro_logo_type',
                    'value'     =>  ns()->option->get('ns_gastro_logo_type'),
                    'type'      =>  'select',
                    'options'   =>  Helper::kvToJsOptions([
                        'text'   =>  __m('Store Name (Text)', 'Store Name'),
                        'nps'    =>  __m('Nexo Print Server', 'NPS Logo'),
                    ]),
                    'description'   =>  __m('Define what is the logo type.', 'NsGastro'),
                ]
            ]);

            $settings['tabs']['nps-adapter'] = [
                'label'     =>  __m('NPS Adapter', 'NsGastro'),
                'fields'    =>  $settingFields,
            ];
        }

        $this->form = $settings;
    }
}
