# 2017-02-20 js函数表达式

定义函数的方式有两种：

一、函数声明： 
function functionName(arg0, arg1, arg2){
    //函数体
}

重要特征：函数声明提升，意思是在执行代码之前会先读取函数声明。这就意味着可以把函数声明放在调用它的语句后面。

sayHi();
function sayHi(){
    alert("Hi!");
}

这样是不会抛出错误的，因为在代码执行之前会先读取函数声明。

二、函数表达式。
最常见的：
var functionName = function(arg0, arg1, arg2){
    //函数体
};

看起来好像是常规的变量赋值语句，即创建一个函数并将它赋值给变量functionName。这种情况下创建的函数叫做匿名函数。（匿名函数有时候也叫拉姆达函数）

sayHi();        //报错：函数还不存在
var sayHi = function(){
    alert("Hi!");
};

三、递归
递归函数是在一个函数通过名字调用自身的情况下构成的。
function factorial(num){
    if(num <= 1){
        return 1;
    }else{
        return num * factorial(num-1);
    }
}

优化此函数，使之不和自己的函数名有耦合
function factorial(num){
    if(num <= 1){
        return 1;
    }else{
        return num * arguments.callee(num-1);
    }
}
但在严格模式下，不能通过脚本防问arguments.callee。我们可以改用命名函数表达式来达到相同的结果
var factorial = (function f(num){
    if(num <= 1){
        return 1;
    }else{
        return num * f(num-1);
    }
});

四、闭包
闭包是指有权访问另一个函数作用域中的变量的函数。
常见方式：就是在一个函数内部创建另一个函数
function abc(name){
    return function(object1, object2){
        **var value1 = object1[name];
        var value2 = object2[name];**
        
        //函数体逻辑
    }
}

//创建函数
var compareNames = createComparisonFunction("name");

//调用函数
var result = compareNames({name: "Nicholas"}, {name: "Greg"});

//解除对匿名函数的引用（以便释放内存）
compareNames = null;

五、关于this对象



