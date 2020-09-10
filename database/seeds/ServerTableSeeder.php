<?php

use App\Server;
use Illuminate\Database\Seeder;

class ServerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Server::create([
            'name' => 'Staging Site',
            'fqdn' => 'test.com',
            'description' => 'this is a staging environment',
        ]);
        Server::create([
            'name' => 'Production Site',
            'fqdn' => 'production.com',
            'description' => 'this is a production environment',
        ]);
    }
}