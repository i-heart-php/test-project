<?php

namespace App\Http\Controllers;

use App\Server;
use Illuminate\Http\Request;

class ServerController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $servers = Server::all();
        return response()->json(compact('servers'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'fqdn' => 'required',
            'description' => 'required',
        ]);

        $server = new Server([
            'name' => $request->get('name'),
            'fqdn' => $request->get('fqdn'),
            'description' => $request->get('description'),
        ]);
        if ($server->save()) {
            return response()->json(array('OK'));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'id' => 'required',
            'value' => 'required',
        ]);

        $server = Server::find($request->get('id'));
        if ($server) {
            $server->{$request->get('name')} = $request->get('value');
            $server->save();
        } else {
            return abort(500, 'Unable to find server with id=' . $request->get('id'));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id = (int) $request->getContent();

        $server = Server::find($id);
        if ($server) {
            $server->delete();
        } else {
            return abort(500, 'Unable to find server with id=' . $id);
        }

    }
}