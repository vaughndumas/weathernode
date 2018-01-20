// Install the request library using: npm install request --save
var v_request = require('request');

v_request.get("http://httpbin.org/ip", (error, response, body) => {
   if (error) {
       return console.dir(error);
   } 
   console.dir(JSON.parse(body));
});