<?php

namespace Tests\Feature;

use Tests\TestCase;

class SPATest extends TestCase
{
    /**
     * Test the SPA at //docroot/login.html
     *
     * @return void
     */
    public function test_spa_route()
    {
        $response = $this->get('/');
        $response->assertStatus(302);
        $response->assertRedirect('login.html');
    }
}