# 内网环境运行流水线

背景：客户现场没有网络，但是需要运行流水线，前端根据package.json获取npm包 上传到nexus上
此程序主要目的 根据package.json获取全量工具包

1，将项目的package.json 拷贝到根目录 命名为 old.json
2.切换到node 16  运行npm start
3.将程序打包好的res.zip包给到后端上传

第三步 也可以自己上传 通过nexusapi 将import_npm.sh 拷贝到res目录运行  
![img.png](img.png)
