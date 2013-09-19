var http = require('http'),
    util = require('util'),
    crypto = require('crypto'),
    d = new Date(),
    config = require('./s3.json'),
    options = {
      hostname: config.bucket + '.s3.amazonaws.com',
      path: '/css/main.css',
      headers: {
        'X-Amz-Date': d.toUTCString(),
        'Authorization': ' AWS ' + config.s3Key + ':' + getSignature()
      },
      method: 'GET'
    };
function getSignature() {
  var sig = [
    'GET',
    '',
    '',
    '',
    'x-amz-date:' + d.toUTCString(),
    '/' + config.bucket + '/css/main.css'
  ].join('\n');
  console.log(sig);
  return crypto.createHmac('sha1', config.s3Secret).update(new Buffer(sig, 'utf8')).digest('base64');

}

var req = http.request(options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function(chunk) {
    console.log('BODY: \n' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});


req.end();
