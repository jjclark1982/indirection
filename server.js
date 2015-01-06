#!/usr/bin/env node

var http = require('http');

var port = process.env.PORT || 8000;

var server = http.createServer(function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip, req.method, req.url);
    var pathname = req.url.replace(/^\//, '').replace(/%20/g, ' ');
    if (!pathname.match(/:/)) {
        // expect an explicit protocol
        return res.end();
    }
    var headers = {
        "Refresh": "0; url="+pathname
    };
    res.writeHead(200, headers);
    res.end();
});

server.once('listening', function() {
    var a = server.address();
    console.log('HTTP server listening on', a.address+":"+a.port);
});

server.listen(port);
