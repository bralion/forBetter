常用概念
Blob : 由构造函数Blob创建出来的Blob 对象   ,Binary Large Object 的缩写 二进制类型的大对象
File ：文件（File）接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。File 对象是特殊类型的 Blob。
FileReader :FileReader对象使Web应用程序可以使用File或Blob对象指定要读取的文件或数据，从而异步读取用户计算机上存储的文件（或原始数据缓冲区）的内容。
			文件对象可以从FileList由于用户使用<input>元素选择文件而返回的DataTransfer对象，拖放操作的对象或上的mozGetAsFile()API获得HTMLCanvasElement。
ArrayBuffer:对象用来表示通用的、固定长度的原始二进制数据缓冲区。它是一个字节数组，通常在其他语言中称为“byte array
ArrayBufferView  这是一种帮助程序类型，用于简化规范。它不是接口，也没有实现它的对象。
FormData:FormData 接口提供了一种表示表单数据的键值对的构造方式，经过它的数据可以使用了XMLHttpRequest.send() 方法送出，本接口和此方法都相当简单直接。如果送出时的编码类型被设为 "multipart/form-data"，它会使用和表单一样的格式。
XMLHttpRequest ：发起请求的浏览器自带对象
Canvas : H5里面提供了canvas标签  通过获取标签dom 来获取canvas对象
DataURL : 通过在url上写上dataUrl来展示图片 凡是能写url的地方都可以写dataUrl;

