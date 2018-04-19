const http2 = require( 'http2' );

const delay = ( ms ) => new Promise( resolve => setTimeout( resolve, ms ) );

const server = http2.createServer( );

let stream0;

const makeFun = name =>
	( ...args ) => console.log( `called: ${name}`, ...args );

async function onStream( stream, $obj0, num, $arr0 )
{
	stream0 = stream;
	stream0.session.once( "close", ( ) => makeFun( "session.close" ) );
	stream0.respond( { } );
	stream0.end( "" );
}

async function start( )
{
	server.addListener( "stream", onStream );
	server.listen( undefined, "0.0.0.0", onListen );
}

async function onListen( )
{
	const addr = server.address( );

	let session;
	const session0promise = new Promise( resolve =>
	{
		session = http2.connect(
			`http://localhost:${addr.port}`, { }, resolve );
	} );

	await doStuff( session );

	await session0promise;

	await delay( 1000 );
	session.destroy( );
	session.destroy( );
	server.close( makeFun( "server.close" ) );
}


async function doStuff( session0 )
{
	session0.addListener( "stream", makeFun( "$fun3" ) );
	session0.once( "close", makeFun( "$fun4" ) );
	session0.once( "timeout", makeFun( "$fun5" ) );
	session0.once( "error", makeFun( "$fun6" ) );

	const $object2 = {
		':method': "GET",
		':scheme': "http",
		':path': "/headers",
		'accept': "application/json, text/*;0.9, */*;q=0.8",
		'user-agent': "foobar",
		'accept-encoding': "gzip;q=1.0, deflate;q=0.5",
	};
	const $object3 = {
		endStream: true
	};

	session0.once( "close", makeFun( "$fun7" ) );
	const $clientHttp2Stream0 = session0.request( $object2, $object3 );
	$clientHttp2Stream0.on( "aborted", makeFun( "$fun8" ) );
	$clientHttp2Stream0.on( "error", makeFun( "$fun9" ) );
	$clientHttp2Stream0.on( "frameError", makeFun( "$fun10" ) );
	$clientHttp2Stream0.on( "streamClosed", makeFun( "$fun11" ) );
	$clientHttp2Stream0.on( "timeout", makeFun( "$fun12" ) );
	$clientHttp2Stream0.on( "trailers", makeFun( "$fun13" ) );
	$clientHttp2Stream0.on( "continue", makeFun( "$fun14" ) );
	$clientHttp2Stream0.on( "headers", makeFun( "$fun15" ) );
	$clientHttp2Stream0.on( "response", makeFun( "$fun16" ) );

	//$fun16( $obj1, 4, $arr1 );

	$clientHttp2Stream0.once( "error", makeFun( "$fun18" ) );
}

start( );


/*
🦎  $http2Server0 Http2Server = $http2Server0.addListener( "stream", $fun0 );
🦎  $http2Server0 Http2Server = $http2Server0.listen( undefined, "0.0.0.0", $fun1 );
🦎      $fun1 Function = $fun1.valueOf( );
🦎  $fun1( );
🦎  $object0 Object = $http2Server0.address( );
[ log ]> A
🦎  $clientHttp2Session0 ClientHttp2Session = http2.connect( "http://localhost:55159", $object1, $fun2 );
🦎  $clientHttp2Session0 ClientHttp2Session = $clientHttp2Session0.addListener( "stream", $fun3 );
🦎  $clientHttp2Session0.once( "close", $fun4 );
🦎  $clientHttp2Session0.once( "timeout", $fun5 );
🦎  $clientHttp2Session0.once( "error", $fun6 );
🦎  $fun2( $clientHttp2Session0, $socket0 );
🦎  $clientHttp2Session0.once( "close", $fun7 );
🦎  $clientHttp2Stream0 ClientHttp2Stream = $clientHttp2Session0.request( $object2, $object3 );
🦎  $clientHttp2Stream0.on( "aborted", $fun8 );
🦎  $clientHttp2Stream0.on( "error", $fun9 );
🦎  $clientHttp2Stream0.on( "frameError", $fun10 );
🦎  $clientHttp2Stream0.on( "streamClosed", $fun11 );
🦎  $clientHttp2Stream0.on( "timeout", $fun12 );
🦎  $clientHttp2Stream0.on( "trailers", $fun13 );
🦎  $clientHttp2Stream0.on( "continue", $fun14 );
🦎  $clientHttp2Stream0.on( "headers", $fun15 );
🦎  $clientHttp2Stream0.on( "response", $fun16 );
🦎  $fun0( $serverHttp2Stream0, $obj0, 5, $arr0 );
🦎      $serverHttp2Stream0.session.once( "close", $fun17 );
🦎      $serverHttp2Stream0.respond( $object4 );
🦎      $serverHttp2Stream0.end( $str0 );
🦎  $fun16( $obj1, 4, $arr1 );
[ log ]> B
🦎  $clientHttp2Stream0.once( "error", $fun18 );
🦎  $passThrough0 PassThrough = $clientHttp2Stream0.pipe( $passThrough0 );
🦎      $passThrough0.on( "unpipe", $fun19 );
🦎      $passThrough0.on( "drain", $fun20 );
🦎      $passThrough0 PassThrough = $passThrough0.prependListener( "error", $fun21 );
🦎      $passThrough0.once( "close", $fun22 );
🦎      $passThrough0.once( "finish", $fun23 );
🦎      false = $passThrough0.emit( "pipe", $clientHttp2Stream0 );
🦎  true = $passThrough0.write( $buffer0 );
🦎  $passThrough0.end( );
🦎      onfinish( );
🦎          $passThrough0 PassThrough = $passThrough0.removeListener( "close", $fun22 );
🦎          true = $passThrough0.emit( "unpipe", $clientHttp2Stream0, $object5 );
🦎              onunpipe( $clientHttp2Stream0, $object5 );
🦎  $clientHttp2Stream0 ClientHttp2Stream = $clientHttp2Stream0.unpipe( $passThrough0 );
[ log ]> C
🦎  $clientHttp2Session0.destroy( );
[ log ]> D
🦎  $serverHttp2Stream0.session.destroy( );
[ log ]> --
🦎  $http2Server0 Http2Server = $http2Server0.close( $fun24 );
🦎  $fun4( );
🦎  $fun7( );
🦎  false = $fun17( );
*/
