//Express is required for creating Node.js based web apps
var express = require('express');

var app = express();

app.set('port', 3300);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('smartmeter.db');


//Starting up the server on the port: 3300
app.listen(app.get('port'), function(){
    console.log('Server up: http://localhost:' + app.get('port'));
});
app.use(express.static('public'));
app.use(express.static('files'));

app.use("/", express.static(__dirname + '/'));

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get("/allValues", function(req, res){

    var result = [];

    db.serialize(function () {
        db.each("SELECT * FROM data", function (err, row) {
            result.push(row);
            result.push(err.message);
        });
    });

    res.json(result);


});