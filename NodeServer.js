/**
 * Created by Jeroen on 25/02/2016.
 */
// Load the net module to create a tcp server.
//var net = require('net');
//
//// Creates a new TCP server. The handler argument is automatically set as a listener for the 'connection' event
//var server = net.createServer(function (socket) {
//
//    // Every time someone connects, tell them hello and then close the connection.
//    console.log("Connection from " + socket.remoteAddress);
//    socket.end("Hello World\n");
//
//});
//
//// Fire up the server bound to port 7000 on localhost
//server.listen(7000, "localhost");
//
//// Put a friendly message on the terminal
//console.log("TCP server listening on port 7000 at localhost.");

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = process.argv[2] || 8887;

http.createServer(function(request, response) {

    var uri = url.parse(request.url).pathname
        , filename = path.join(process.cwd(), uri);

    fs.exists(filename, function(exists) {
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
            if(err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }

            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");