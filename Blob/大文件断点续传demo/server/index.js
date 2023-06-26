const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const upload = multer({ dest: 'uploads/' });
// 指定静态文件目录
app.use(express.static('../client'));
// 处理文件上传的路由
// 合并文件分片
const mergeChunks = (chunks, destination) => {
  const writableStream = fs.createWriteStream(destination);
  chunks.forEach(chunkPath => {
    const readableStream = fs.createReadStream(chunkPath);
    readableStream.pipe(writableStream, { end: false });
    readableStream.on('end', () => {
      fs.unlink(chunkPath, err => {
        if (err) {
          console.error(`Error deleting chunk file ${chunkPath}:`, err);
        }
      });
    });
  });
  writableStream.on('finish', () => {
    console.log('File merged successfully.');
  });
};

// 处理文件上传的路由
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const { originalname, size, destination, filename } = req.file;
  const chunkPath = path.join(destination, filename);

  fs.renameSync(req.file.path, chunkPath);

  if (req.body.dztotalchunkcount && Number(req.body.dztotalchunkcount) === Number(req.body.dzchunkindex) + 1) {
    // 如果是最后一个分片，进行文件合并
    const destinationPath = path.join('uploads/', originalname);
    mergeChunks(
      Array.from({ length: Number(req.body.totalChunks) }, (_, i) =>
        path.join(destination, `${filename}.part${i}`)
      ),
      destinationPath
    );
  }

  res.send('File uploaded successfully.');
});

// 启动服务器
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
