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
    category_bar: true,
    layout: true
  } );
});
app.get('/pdlist', function(req, res){
  res.render( __dirname + '/pdlist', {
    title: "Taiwan Goods 台灣禮品館 | 商品列表",
    category_bar: true,
    layout: true
  } );
});
app.get('/pddetail', function(req, res){
  res.render( __dirname + '/pddetail', {
    title: "Taiwan Goods 台灣禮品館 | XXX商品",
    category_bar: true,
    layout: true
  } );
});
app.get('/membercenter', function(req, res){
  res.render( __dirname + '/membercenter', {
    title: "會員中心",
    category_bar: false,
    layout: true
  } );
});
app.get('/register', function(req, res){
  res.render( __dirname + '/register', {
    title: "會員註冊",
    category_bar: false,
    layout: true
  } );
});
app.get('/profile', function(req, res){
  res.render( __dirname + '/profile', {
    title: "會員中心 | 修改會員資料",
    category_bar: false,
    layout: true
  } );
});
app.get('/login', function(req, res){
  res.render( __dirname + '/login', {
    title: "會員登入",
    category_bar: false,
    layout: true
  } );
});
app.get('/forgot_password', function(req, res){
  res.render( __dirname + '/forgot_password', {
    title: "忘記密碼",
    category_bar: false,
    layout: true
  } );
});
app.get('/empty', function(req, res){
  res.render( __dirname + '/empty-page', {
    title: "無內容測試",
    category_bar: true,
    layout: true
  } );
});

app.get('/popout/:name', function(req, res){
  res.render( __dirname + '/views/popout/' + req.params.name + '.ejs', {
    layout: false
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
