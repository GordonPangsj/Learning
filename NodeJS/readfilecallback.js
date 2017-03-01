//回调函数嵌套在fs.readFile的参数列表中
//fs.readFile调用时所做动工作只是将异步式I/O请求发送给了操作系统，然后立即返回并执行后面的语句，
//执行完以后进入事件循环监听事件。当fs接受到I/O请求完成的事件时，事件循环会主动调用回调函数以完成
//后续工作
function readFileCallBack(err, data){
    if(err){
        console.error(err);
    }else{
        console.log(data);
    }
}

var fs = require("fs");
fs.readFile("file.txt", "utf-8", readFileCallBack);
console.log("end.");