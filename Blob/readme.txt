常用概念
Blob : 由构造函数Blob创建出来的Blob 对象   ,Binary Large Object 的缩写 二进制类型的大对象
File ：文件（File）接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。File 对象是特殊类型的 Blob。
FileReader :FileReader对象使Web应用程序可以使用File或Blob对象指定要读取的文件或数据，从而异步读取用户计算机上存储的文件（或原始数据缓冲区）的内容。
			文件对象可以从FileList由于用户使用<input>元素选择文件而返回的DataTransfer对象，拖放操作的对象或上的mozGetAsFile()API获得HTMLCanvasElement。
ArrayBuffer:对象用来表示通用的、固定长度的原始二进制数据缓冲区。它是一个字节数组，通常在其他语言中称为“byte array
ArrayBufferView  这是一种帮助程序类型，用于简化规范。它不是接口，也没有实现它的对象。
Buffer 对象: Buffer代表一个缓冲区，主要用于操作二进制数据流，其用法与数组非常相似.用于操作0101的二进制数据。
		打印出来显示是16进制 <Buffer 6d 69 61 6f>   相当于0110 1101 0110 1001 0110 0001 0110 1111  在unicode中表示’miao’;
		Buffer实例.write() 可以向缓冲区内写数据。
FormData:FormData 接口提供了一种表示表单数据的键值对的构造方式，经过它的数据可以使用了XMLHttpRequest.send() 方法送出，本接口和此方法都相当简单直接。如果送出时的编码类型被设为 "multipart/form-data"，它会使用和表单一样的格式。
XMLHttpRequest ：发起请求的浏览器自带对象
Canvas : H5里面提供了canvas标签  通过获取标签dom 来获取canvas对象
DataURL : 通过在url上写上dataUrl来展示图片 凡是能写url的地方都可以写dataUrl;
位：bit  0 1
字节：byte 一个字节8位 可以有256种表达   字母是8位 汉字是16位
Unicode：Unicode是一个编码方案，Unicode 是为了解决传统的字符编码方案的局限而产生的，它为每种语言中的每个字符设定了统一并且唯一的二进制编码，以满足跨语言、跨平台进行文本转换、处理的要求。
		Unicode 编码共有三种具体实现，分别为utf-8,utf-16,utf-32，其中utf-8占用一到四个字节，utf-16占用二或四个字节，utf-32占用四个字节。Unicode 码在全球范围的信息交换领域均有广泛的应用
ASCII码 ：美国信息交换标准代码）是基于拉丁字母的一套电脑编码系统，主要用于显示现代英语和其他西欧语言，一共定义了128个字符。

套接字：所谓套接字(Socket)，就是对网络中不同主机上的应用进程之间进行双向通信的端点的抽象。一个套接字就是网络上进程通信的一端，提供了应用层进程利用网络协议交换数据的机制。
		从所处的地位来讲，套接字上联应用进程，下联网络协议栈，是应用程序通过网络协议进行通信的接口，是应用程序与网络协议根进行交互的接口，套接字是通信的基石，是支持TCP/IP协议的路通信的基本操作单元
