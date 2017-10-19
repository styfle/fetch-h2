'use strict';

import 'mocha';
import { expect } from 'chai';
import { delay } from 'already';
import { buffer } from 'get-stream';

import { fetch, disconnectAll, JsonBody, StreamBody, DataBody } from '../../';

afterEach( disconnectAll );

import * as http2 from 'http2'
class Server
{
	private _server: http2.Http2Server;
	private _sessions: Set< http2.Http2Session >;

	constructor( )
	{
		this._server = http2.createServer( );
		this._sessions = new Set( );

		this._server.on( 'stream', ( stream, headers ) =>
		{
			stream.respond( {
				'content-type': 'text/plain',
				':status': 200,
			} );

			stream.end( JSON.stringify( { path: headers[ ':path' ] } ) );

			this._sessions.add( stream.session );
			stream.session.once( 'close', ( ) =>
				this._sessions.delete( stream.session) );
		} );
	}

	listen( port: number ): Promise< void >
	{
		return new Promise( ( resolve, reject ) =>
		{
			this._server.listen( port, '0.0.0.0', resolve );
		} );
	}

	shutdown( ): Promise< void >
	{
		return new Promise< void >( ( resolve, reject ) =>
		{
			for ( let session of this._sessions )
			{
				session.destroy( );
			}
			this._server.close( resolve );
		} );
	}
}

describe( 'basic', ( ) =>
{
	it( 'should be able to perform simple GET', async ( ) =>
	{
		const server = new Server( );
		await server.listen( 4711 );

		const response = await fetch( 'http://localhost:4711/' );
		const res = await response.json( );
		expect( res.path ).to.equal( '/' );

		await server.shutdown( );
	} );

	it( 'should be possible to GET HTTPS/2', async ( ) =>
	{
		const response = await fetch( 'https://nghttp2.org/httpbin/user-agent' );
		const data = await response.json( );
		expect( data[ 'user-agent' ] ).to.include( 'fetch-h2/' );
	} );

	it( 'should be possible to POST JSON', async ( ) =>
	{
		const testData = { foo: 'bar' };

		const response = await fetch(
			'https://nghttp2.org/httpbin/post',
			{
				method: 'POST',
				body: new JsonBody( testData ),
			}
		);
		const data = await response.json( );
		expect( testData ).to.deep.equal( data.json );
		// fetch-h2 should set content type for JsonBody
		expect( data.headers[ 'Content-Type' ] ).to.equal( 'application/json' );
	} );

	it( 'should be possible to POST buffer-data', async ( ) =>
	{
		const testData = '{"foo": "data"}';

		const response = await fetch(
			'https://nghttp2.org/httpbin/post',
			{
				method: 'POST',
				body: new DataBody( testData ),
			}
		);
		const data = await response.json( );
		expect( data.data ).to.equal( testData );
		expect( Object.keys( data.headers ) ).to.not.contain( 'Content-Type' );
	} );
} );

