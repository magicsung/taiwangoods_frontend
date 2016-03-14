var express = require('express');
var app = express();
var http = require('http').Server(app);
var partials = require('express-partials');
livereload = require('livereload');

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/image', express.static(__dirname + '/image'));

app.set('view engine', 'ejs');
app.use(partials());

app.get('/', function(req, res){
  res.render( __dirname + '/index', {
    title: 'Taiwan Goods 台灣禮品館',
    layout: true
  } );
});
app.get('/pdlist', function(req, res){
  res.render( __dirname + '/pdlist', {
    title: "Taiwan Goods 台灣禮品館 | 商品列表",
    layout: true
  } );
});
app.get('/pddetail', function(req, res){
  res.render( __dirname + '/pddetail', {
    title: "Taiwan Goods 台灣禮品館 | XXX商品",
    layout: true
  } );
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});

server = livereload.createServer({
  exts: ['ejs']
});
server.watch(__dirname + "/");
server.watch([__dirname + "/js", __dirname + "/css", __dirname + "/views"]);
