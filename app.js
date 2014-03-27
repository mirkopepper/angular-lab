var fs = require('fs');
var express = require('express');
var request = require('request');
var _ = require('underscore');

var app = express();
var config = JSON.parse(fs.readFileSync('config.json'));

// Config a proxy
if (config.proxy) {
  request = request.defaults({
    'proxy': config.proxy
  });
}

app.use(express.logger());
app.use(express.static(__dirname + '/app'));

// Cross-origin resource sharing //
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  next();
});

app.get('/', function (req, res) {
  res.send('index.html');
});

app.all('/api/*', function(req, res) {
  proxy(req, res, 'https://api.github.com/');
});

app.all('/login/*', function (req, res) {
  proxy(req, res, 'https://github.com/login/');
});

/**
 * Ensure Content-Type "text/cache-manifest" to cache manifest
 */
app.get('/app.manifest', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/cache-manifest'
  });
  res.send('app.manifest');
});

/**
 * Create a proxy for all urls of the GitHub Api injecting our client id and client secret
 *
 * @param req
 * @param res
 * @param {String} url
 */
var proxy = function (req, res, url) {
  var options = {
    url: url + req.params.join('/'),
    headers: {
      'User-Agent': 'request'
    },
    method: req.method,
    qs: _.extend(config.github_app, req.query)
  };

  request(options, function (err, response, body) {
    if (err) {
      res.send(500, err);
    }
    res.send(response.statusCode, body);
  });
};

app.listen(3000);