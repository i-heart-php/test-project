<?php

namespace Tests\Unit;

use App\Server;
use App\User;
use JWTAuth;
use Tests\TestCase;

class APITest extends TestCase
{

    public function test_logged_out()
    {
        $this->get('/api/servers')
            ->assertStatus(401);
        $this->post('/api/server')
            ->assertStatus(401);
        $this->patch('/api/server')
            ->assertStatus(401);
        $this->delete('/api/server')
            ->assertStatus(401);
    }

    public function test_can_get_servers_logged_in()
    {
        $user = User::where('email', 'admin@admin.com')->first();
        $token = JWTAuth::fromUser($user);
        $servers = Server::all();
        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->get('/api/servers')
            ->assertStatus(200)
            ->assertJson(compact($servers));
    }

    /* I would normally confgiure sqllite in a .env.test to test post, patch & update */
}