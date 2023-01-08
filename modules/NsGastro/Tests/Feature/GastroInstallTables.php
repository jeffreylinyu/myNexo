<?php

namespace Modules\NsGastro\Tests\Feature;

use App\Services\ModulesService;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GastroInstallTables extends TestCase
{
    use WithFaker;

    public function testInstallTables()
    {
        /**
         * let's install gastro
         *
         * @var ModulesService
         */
        $moduleService = new ModulesService;
        $moduleService->load();
        $module = $moduleService->get('NsGastro');
        $migrationsFiles = $moduleService->getAllMigrations($module);

        foreach ($migrationsFiles as $file) {
            $moduleService->runMigration('NsGastro', $file);
        }

        $moduleService->enable('NsGastro');

        return $this->assertTrue(true);
    }
}
