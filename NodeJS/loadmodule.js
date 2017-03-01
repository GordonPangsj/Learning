//加载模块2

var hello1 = require("./module");
hello1.setName("Gordon");

var hello2 = require("./module");
hello2.setName("Nicole");

hello1.sayHello();