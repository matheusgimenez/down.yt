
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
, select = require('./routes/select.js')
, downloader = require('./routes/downloader.js')
, help = require('./routes/help.js');

var app = module.exports = express.createServer();

// Configuration
siteinfo = {};
siteinfo.url = 'http://localhost:666';
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/select/:id', select.select);
app.get('/download/original/:id', downloader.original);
app.get('/download/audio/:id', downloader.audio);
app.get('/help', help.help);
app.get('/help/', help.help);

app.listen(666, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
