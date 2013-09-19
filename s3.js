var http = require('http'),
    util = require('util'),
    crypto = require('crypto'),
    d = new Date(),
    x2j = require('xml2json'),
    pj = require('prettyjson'),
    config = require('./s3.json'),
    options = {
      hostname: config.bucket + '.s3.amazonaws.com',
      path: '/',
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
    '/' + config.bucket + '/'
  ].join('\n');
  console.log(sig);
  return crypto.createHmac('sha1', config.s3Secret).update(new Buffer(sig, 'utf8')).digest('base64');

}

var req = http.request(options, function(res) {
  var xml = '';
  res.setEncoding('utf8');
  res.on('data', function(chunk) {
    xml += chunk;
    //console.log('BODY: \n' + chunk);
  });
  res.on('end', function() {
    console.log(pj.render(x2j.toJson(xml, {object:true})));
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});


req.end();
