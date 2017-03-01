//回调函数嵌套在fs.readFile的参数列表中

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