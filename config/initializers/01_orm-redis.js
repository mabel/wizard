var redis = require('redis')
  , url   = require('url')
  , nohm = require('nohm').Nohm
//  , urlConnectRedis = 'redis://redistogo:f61729e02d4ae3f829e75a8b1ca3fbd5@dab.redistogo.com:9521/';
    , urlConnectRedis = 'redis://redistogo:d86464e6f19aaf9c432d39442d8cc54d@tarpon.redistogo.com:10455/' 

module.exports = function() {
  var rtg = url.parse(urlConnectRedis);
  if (process.env.REDISTOGO_URL) {
    rtg = url.parse(process.env.REDISTOGO_URL);
  }

  var client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(':')[1]);

  client.on('connect', function () {
    nohm.setClient(client);
  });

  this.db = client;
}
