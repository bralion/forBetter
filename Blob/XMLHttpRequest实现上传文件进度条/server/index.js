const http = require('http');

const server = http.createServer((req, res) => {
	// req 是一个 http.IncomingMessage 实例，它是可读流。
	// res 是一个 http.ServerResponse 实例，它是可写流。
	res.setHeader("Access-Control-Allow-Origin","*");
	let body = '';
	// 接收数据为 utf8 字符串，
	// 如果没有设置字符编码，则会接收到 Buffer 对象。
	req.setEncoding('utf8');
	
	// 如果添加了监听器，则可读流会触发 'data' 事件。
	var count=0;
	req.on('data', (chunk) => {
		console.log('shoudao',chunk.toString('utf8'));
		body += chunk;
		count++
		if(count===30){
			debugger
		}
	});
	
	// 'end' 事件表明整个请求体已被接收。
	req.on('end', () => {
		console.log(count,'count');
		try {
			console.log('end')
			const data = body;
			console.log(data,'data')
			// 响应信息给用户。
			res.write(typeof body);
			res.end();
		} catch (er) {
			// json 解析失败。
			res.statusCode = 400;
			return res.end(`错误: ${er.message}`);
		}
	});
});

server.listen(1338);

// $ curl localhost:1337 -d "{}"
// object
// $ curl localhost:1337 -d "\"foo\""
// string
// $ curl localhost:1337 -d "not json"
// 错误: Unexpected token o in JSON at position 1
