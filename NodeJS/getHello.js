var Hello = require("./hello");

hello = new Hello();
hello.setName("Gordon");
hello.sayHello();

var HelloObject = require("./singleobject").Hello;
helloObject = new HelloObject();
helloObject.setName("Nicole");
helloObject.sayHello();