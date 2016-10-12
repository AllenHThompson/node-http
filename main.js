var express = require('express');
var app = express();

var fs = require('fs');
var app = express();


var http = require('http');

// var server = http.createServer(function(request, response) {
//      console.log('listening on port 8000');
// })

function getTestPersonaLoginCredentials(callback) {
     return http.get({
          host: 'www.personatestuser.org',
          path: '/email'
     }, function(response) {
          console.log(response)
          //treat incoming data as utf8(avoids issues with multi-byte chars)
          response.setEncoding('utf8');
          //incrementally captue coming response body
          var body = '';
          response.on('data', function(d) {
               body += d;
          });
          response.on('end', function() {
               try {
                    var parsed = JSON.parse(body);
               } catch (error) {
                    console.error('Unable to parse response as JSON', error);
                    return callback(error);
               }
               callback(null, {
                    email: parsed.email,
                    password: parsed.pass
               });
          });
     }).on('error', function(error) {
          //handle erors with the request itself
          console.error('Error with the request:', error.message);
          callback(error);
     })
}

getTestPersonaLoginCredentials(()=>{console.log("WFT4")});


app.listen(8000, function() {
     console.log('listening on port 8000');
});
