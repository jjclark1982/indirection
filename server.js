#!/usr/bin/env node

var http = require('http');

var port = process.env.PORT || 8000;

var server = http.createServer(function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip, req.method, req.url);
    var pathname = req.url.replace(/^\//, '');
    if ((pathname === '') || pathname === 'favicon.ico') {
        return res.end();
    }
    var headers = {
        "Location": pathname || ''
    };
    res.writeHead(302, headers);
    res.end("Redirecting you to "+pathname);
});

server.once('listening', function() {
    var a = server.address();
    console.log('HTTP server listening on', a.address+":"+a.port);
});

server.listen(port);
