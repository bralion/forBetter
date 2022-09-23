//1:加载相关模块  http express mysql
const http = require("http");
const express = require("express");

//5:创建服务器
var app = express();
var server = http.createServer(app);
server.listen(8085);
console.log("app start in localhost:8085");
//6.使用express自带中间件访问静态资源
app.use(express.static("./publicStatic"));
