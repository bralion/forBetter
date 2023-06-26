//1:加载相关模块  http express mysql
const http = require("http");
const express = require("express");
const path = require('path');
//5:创建服务器
var app = express();

console.log("app start in localhost:8085");

app.use(express.static("./publicStatic"));
// 定义路由处理程序
app.get('/image', (req, res) => {
  // 延迟 5 秒发送静态文件
  setTimeout(() => {
    res.sendFile(path.resolve(__dirname, './publicStatic/logo1.png'));
  }, 5000);
});
var server = http.createServer(app);
server.listen(8085);
