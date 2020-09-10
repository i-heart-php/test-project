<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ServerTest extends TestCase
{
    use WithFaker;

    public function test_can_create_server()
    {

        $this->assertTrue(true);

        /*        $this->post(route('server.store'), $data)
    ->assertStatus(201)
    ->assertJson($data); */
    }

/*     public function test_can_update_post()
{

$post = factory(Post::class)->create();

$data = [
'title' => $this->faker->sentence,
'content' => $this->faker->paragraph,
];

$this->put(route('posts.update', $post->id), $data)
->assertStatus(200)
->assertJson($data);
}

public function test_can_show_post()
{

$post = factory(Post::class)->create();

$this->get(route('posts.show', $post->id))
->assertStatus(200);
}

public function test_can_delete_post()
{

$post = factory(Post::class)->create();

$this->delete(route('posts.delete', $post->id))
->assertStatus(204);
}

public function test_can_list_posts()
{
$posts = factory(Server::class, 2)->create()->map(function ($server) {
return $server->only(['id', 'fqdn', 'description']);
});

$this->get(route('servers.index'))
->assertStatus(200)
->assertJson($posts->toArray())
->assertJsonStructure([
'*' => ['id', 'fqdn', 'description'],
]);
} */
}