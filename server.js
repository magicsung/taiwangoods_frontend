var express = require('express');
var app = express();
var http = require('http').Server(app);
var partials = require('express-partials');
var favicon = require('serve-favicon');
livereload = require('livereload');

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/image', express.static(__dirname + '/image'));
app.use(favicon(__dirname + '/image/favicon.ico'));

app.set('view engine', 'ejs');
app.use(partials());

app.get('/', function(req, res){
  res.render( __dirname + '/views/index', {
    title: 'Taiwan Goods 台灣禮品館',
    category_bar: true,
    layout: true
  } );
});
app.get('/pdlist', function(req, res){
  res.render( __dirname + '/views/pdlist', {
    title: "Taiwan Goods 台灣禮品館 | 商品列表",
    category_bar: true,
    layout: true
  } );
});
app.get('/pddetail', function(req, res){
  res.render( __dirname + '/views/pddetail', {
    title: "Taiwan Goods 台灣禮品館 | XXX商品",
    category_bar: true,
    layout: true
  } );
});
app.get('/membercenter', function(req, res){
  res.render( __dirname + '/views/membercenter', {
    title: "會員中心",
    category_bar: false,
    layout: true
  } );
});
app.get('/supplier/add', function(req, res){
  res.render( __dirname + '/views/supplier/add', {
    title: "供應商後台 | 新增商品",
    category_bar: false,
    layout: true
  } );
});
app.get('/shoppingcart', function(req, res){
  res.render( __dirname + '/views/shoppingcart', {
    title: "購物車",
    category_bar: false,
    layout: true
  } );
});
app.get('/shipping', function(req, res){
  res.render( __dirname + '/views/shipping', {
    title: "付款及運送",
    category_bar: false,
    layout: true
  } );
});
app.get('/checkout', function(req, res){
  res.render( __dirname + '/views/checkout', {
    title: "訂單確認",
    category_bar: false,
    layout: true
  } );
});
app.get('/register', function(req, res){
  res.render( __dirname + '/views/register', {
    title: "會員註冊",
    category_bar: false,
    layout: true
  } );
});
app.get('/profile', function(req, res){
  res.render( __dirname + '/views/profile', {
    title: "會員中心 | 修改會員資料",
    category_bar: false,
    layout: true
  } );
});
app.get('/login', function(req, res){
  res.render( __dirname + '/views/login', {
    title: "會員登入",
    category_bar: false,
    layout: true
  } );
});
app.get('/forgot_password', function(req, res){
  res.render( __dirname + '/views/forgot_password', {
    title: "忘記密碼",
    category_bar: false,
    layout: true
  } );
});
app.get('/news', function(req, res){
  res.render( __dirname + '/views/news', {
    title: "最新消息",
    category_bar: false,
    layout: true
  } );
});
app.get('/location', function(req, res){
  res.render( __dirname + '/views/location', {
    title: "哪裡買",
    category_bar: false,
    layout: true
  } );
});
app.get('/search', function(req, res){
  res.render( __dirname + '/views/search', {
    title: "搜尋結果：xxx",
    category_bar: false,
    layout: true
  } );
});
app.get('/custom', function(req, res){
  res.render( __dirname + '/views/custom', {
    title: "自訂內容頁面",
    category_bar: false,
    layout: true
  } );
});
app.get('/video', function(req, res){
  res.render( __dirname + '/views/video', {
    title: "影音專區",
    category_bar: false,
    layout: true
  } );
});
app.get('/empty', function(req, res){
  res.render( __dirname + '/views/empty-page', {
    title: "無內容測試",
    category_bar: false,
    layout: true
  } );
});

app.get('/popout/:name', function(req, res){
  res.render( __dirname + '/partials/popout/' + req.params.name + '.ejs', {
    layout: false
  } );
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});

server = livereload.createServer({
  exts: ['ejs']
});

server.watch([__dirname + "/views", __dirname + "/js", __dirname + "/css", __dirname + "/partials"]);
