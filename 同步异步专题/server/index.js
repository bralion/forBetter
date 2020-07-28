/**
 * @file 入口文件
 *
 */
var http = require('http');
var enhancer = require('./enhancer');
var path = require('path');
var mockData = require('./mock');

var app = http.createServer(function (req, res) {
	res.setHeader("Access-Control-Allow-Origin","*");
	app.handle(req, res);
});

enhancer.decorateApp(app);
app.route('/yanshi5miao', function (req, res) {
	setTimeout(()=>{
		res.send(JSON.stringify(mockData));
	},5000);
});

app.static('.', path.resolve(__dirname, '../scriptTag/'));

app.listen(9001, '0.0.0.0');
