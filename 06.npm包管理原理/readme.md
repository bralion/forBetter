#前端npm包管理探究
Npm是常见的包管理工具 我们常用的包关系错综复杂 webpack打包时会引用各种包， 每个包又会有多个版本，不同的包有可能同一个包的不同版本，所以现在就其原理做一个总结。

`npm config set registry http://172.31.4.51:8081/repository/npm-hosted/`

新建目录如下文件夹：

![img.png](img.png)

将每个包发不到前端nexus仓库进行托管。

###总结
1.每一次发相同版本的包会覆盖掉原来的包
2.在没有版本冲突的情况下所有的包会被下载到同一个包下
3.存在lock文件情况下 按照package.json下载，lock文件中没有的包会记录上。
4.循环引用在版本没有冲突的情况下 会下载所有包一次 放在node_modules下。
5.多个包相互引用不会出现异常，会把包统一下载
6.存在多版本的依赖引入的情况 会将该版本的包下载到对应的依赖库中，实现node_modules内安装node_modules
7.npm i xxx@latest  h会更新package.json和lock文件
8.package.json文件中定义的依赖大于某个版本会下载离该版本最近的稳定版本不会下载最新版本。

