first of all, add 

<script src="./three.js - pointerlock controls_files/objloader.js"></script>

to the code, I believe it is not included in three.min.js according to the debugger
Second, the code didn’t work for me locally because of some error 

« "Cross origin requests are only supported for HTTP.  »

So the code has to be online. Make a server with Python from ‘pyhon -m SimpleHTTPServer’ on mac, this will upload the current directory to http://localhost:8000. e.g.

Last login: Sat Feb 13 22:59:10 on ttys000
Deividass-MacBook-Pro:~ deividas$ cd ~/Desktop/SERVER <<<<<<<<<<<<<<<<<<<
Deividass-MacBook-Pro:SERVER deividas$ python -m SimpleHTTPServer <<<<<<<<<<<<<<
Serving HTTP on 0.0.0.0 port 8000 ...
127.0.0.1 - - [13/Feb/2016 23:01:03] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [13/Feb/2016 23:01:31] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [13/Feb/2016 23:02:10] "GET /arbor.json HTTP/1.1" 200 -
127.0.0.1 - - [13/Feb/2016 23:02:23] "GET /arbor.json HTTP/1.1" 200 -
----------------------------------------

Or run the website from github. After that, add this snippet:

// instantiate a loader
var loader = new THREE.OBJLoader();

// load a resource
loader.load(
	// resource URL
	'polo.obj',
	// Function when resource is loaded
	function ( object ) {
		scene.add( object );
	}
);
		



and it will work with any .obj, IT DOESN’T WORK WITH .JSON HOWEVER
