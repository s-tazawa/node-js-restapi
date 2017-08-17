var express = require('express');
var ejs = require('ejs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.engine('ejs', ejs.renderFile);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 静的ファイルは無条件に公開
app.use('/public', express.static('public'));
// ルーティングを設定
app.use('/', require('./routes/index.js'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    console.log('--GET--');
    res.render('index', { title : 'title'});

});



app.post('/', function (req, res) {
    console.log('--POST--');
    console.log(req.body.name);
    console.log(req.body.age);
    var newUser = {
        name : req.body.name,
        age : req.body.age
    }
    res.render('add', newUser);
});


server = app.listen(1234, function () {
    console.log('サーバーを起動しました。')
});
