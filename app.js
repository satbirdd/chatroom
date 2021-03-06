
/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, user = require('./routes/user')
	, http = require('http')
	, path = require('path')
	, util = require('util')
	, app = express()

// all environments
app.set('port', process.env.PORT || 1234);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on("connection", function(socket) {
	socket.on("subscribe", function(data) {
		socket.join(data.room);
		io.sockets.in(data.room).emit("chart", {email: "系统消息：", content: "===有新的访客进入==="});
	});
	socket.on("unsubscribe", function(data) {
		socket.leave(data.room);
	});
	socket.on("chart", function(data) {
		io.sockets.in(data.room).emit("chart", data.message);
	});
});

