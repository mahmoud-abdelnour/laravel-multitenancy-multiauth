<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TenantSeeder extends Seeder
{
    public function run()
    {
                                       
        if(tenant('domains')->first()?->domain){
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@' . tenant('domains')->first()?->domain . '.com',
                'password' => Hash::make('password'),
            ]);
        }

    }
}