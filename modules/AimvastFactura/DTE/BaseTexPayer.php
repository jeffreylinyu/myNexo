<?php

namespace Modules\AimvastFactura\DTE;

interface BaseTexPayer {
    public function getRut();
    public function getEmail();
    public function getPhoneNumber();
    public function getDirection();
    public function getVillage();
    public function getBusinessName();
}

