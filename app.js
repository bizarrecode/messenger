var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/messenger')
	.then(() =>  console.log('connection mongodb succesful'))
	.catch((err) => console.error(err));

var app = express();
var port = 8080;
 
var server = app.listen(port, function() {
    console.log('Listening on port: ' + port);
});

var io = require('socket.io').listen(server);
var registry = require('./routes/registry');
var login = require('./routes/login');
var message = require('./routes/message');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 
app.use(express.static('public'));
 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', login);
app.use('/registry', registry);
app.use('/messages', message);


io.on('connection', function(socket) { 
    socket.on('chat', function(data) {
		console.log(data);
        io.emit('chat', data);
    });
});


