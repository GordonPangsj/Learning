# 2017-02-15 js对象学习记录

1.创建对象最简单的方式：**Object构造函数** **创建一个Object的实例，然后为它添加属性和方法**。
var person = new Object();  //创建Object的实例

/* 添加name，age，job属性， 添加sayName方法 */
person.name = "Gordon";
person.age = 28;
person.job = "Software Engineer";

person.sayName = function(){
    alert(this.name); //this.name的值将被解析为person.name的值
};

2.之后流行了**对象字面量**成为创建对象的首选模式：
var person = {
    name: "Gordon",
    age: 28,
    job: "Software Engineer",
    
    sayName: function(){
        alert(this.name); 
    }
};

前2种方法都可以用来创建单个对象，但这些方式有个明显的缺点：使用同一个接口创建很多对象，会产生大量的重复代码。为了解决这个问题，开始使用工厂模式的一种变体。

**3.工厂模式创建**
function createPerson(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}

var person1 = createPerson("Gordon", 28, "Software Engineer");
var person2 = createPerson("Nicole", 28, "Pastry Cook");

工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎么知道一个对象的类型）

**4.构造函数模式（自定义的构造函数，从而自定义对象类型的属性和方法）**
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        alert(this.name);
    };
}

var person1 = new Person("Gordon", 28, "Software Engineer");
var person2 = new Person("Nicole", 28, "Pastry Cook");

Person()函数取代了createPerson函数
不同点: 没有显式地创建对象（var o = new Object()）
       直接将属性和方法赋给this对象（工厂模式是赋值给对象o）
       没有return语句（return o）

函数名Person使用的是大写字母P，构造函数始终都应该以一个大写字母开头，非构造函数则应该以一个小写字母开头。构造函数本身也是函数，只不过可以用来创建对象而已。
要创建Person的新实例，必须使用new操作符。步骤如下
1.创建一个新对象
2.将构造函数的作用域赋给新对象（所以this就指向了这个新对象）
3.执行构造函数中的代码（为这个新对象添加属性）
4.返回新对象

这两个对象都有一个constructor（构造函数）属性，该属性指向Person。
alert(person1.constructor == Person); //true
alert(person2.constructor == Person); //true

检测对象类型，还是instanceof操作符更可靠
person1 instanceof Object  //true
person1 instanceof Person  //true

任何函数，只要通过new操作符来调用，那它就可以作为构造函数；而任何函数，如果不通过new操作符来调用，那它跟普通函数也不会有什么区别。
//当作构造函数使用
var person = new Person("Gordon", 28, "Software Engineer");
person.sayName();  //"Gordon"

//作为普通函数调用(添加给了window对象)
Person("Gordon", 28, "Software Engineer");
window.sayName(); //"Gordon"

//在另一个作用域中调用
var o = new Object();
Person.call(o, "Nicole", 28, "Pastry Cook");
o.sayName(); //"Nicole"

缺点：就是每个方法都要在每个实例上重新创建一遍。不同实例上的同名函数不相等。
person1.sayName == person2.sayName  //false

解决方法：把函数定义转移到构造函数外部
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}

function sayName(){
    alert(this.name);
}

但问题来了，在全局作用域中定义的函数实际上只是被某个对象调用，让全局作用域优点名不副实。如果对象要很多方法，就要很多个全局函数，这样我们自定义的引用类型就丝毫没有封装性可言了。
我们通过新的模型方式来解决（原型模式）


**5.原型模式**
每个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以友特定类型的所有实例共享的属性和方法。
function Person(){
}
Person.prototype.name = "Gordon";
Person.prototype.age = 28;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};

var person1 = new Person();
person1.sayName();  //"Gordon"

var person2 = new Person();
person2.sayName(); //"Gordon"

alert(person1.sayName == person2.sayName); //true

我们将sayName()方法和所有属性直接添加到Person的prototype 属性中了，构造函数变成了空函数。

无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个constructor（构造函数）属性，这个属性包含一个指向prototype属性所在函数的指针。
eg. Person.prototype.constructor 指向 Person

创建了自定义的构造函数之后，其原型对象默认只会取得constructor属性；其他方法，都是从Object继承而来。当调用构造函数创建一个新实例后，该实例等内部将包含一个指针（内部属性），指向构造函数的原型对象。

![WX20170215-170646@2x](media/14871353191947/WX20170215-170646@2x.png)


在实例中添加一个属性，属性名和实例原型中的一个属性同名，该属性将会屏蔽原型中的那个属性。

**6.更简单的原型语法**
5的例子中每添加一个属性和方法就要敲一遍Person.prototype。为减少不必要的输入，也为了从视觉上更好地封装原型的功能，更常见的做法是用一个包含所有属性和方法等对象字面量来重写整个原型对象。
function Person(){}
Person.prototype = {
    name: "Gordon",
    age: 28,
    job: "Software Engineer",
    sayName: function(){
        alert(this.name);
    }
};

以上代码中，最终结果相同，但有个例外： constructor属性不再指向Person了。而我们这里使用的语法，本质上完全重写了默认的prototype对象，因此constructor属性也就变成了新对象的constructor属性（指向Object构造函数），不再指向Person函数。
function Person(){}
Person.prototype = {
    **constructor: Person,**
    name: "Gordon",
    age: 28,
    job: "Software Engineer",
    sayName: function(){
        alert(this.name);
    }
};

原型对象的问题：首先省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下取得相同的属性值。最大问题是由其共享的本性所导致的。
eg.
function Person(){}
Person.prototype = {
    constructor: Person,
    name: "Gordon",
    age: 28,
    job: "Software Engineer",
    frieds: ["aaa", "bbb"],
    sayName: function(){
        alert(this.name);
    }

var person1 = new Person();
var person2 = new Person();

person1.friends.push("ccc");

alert(person1.friends); // "aaa,bbb,ccc"
alert(person2.friends); // "aaa,bbb,ccc"
alert(person1.friends == person2.friends); //true

**7.组合使用构造函数模式和原型模式**
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["aaa", "bbbb"];
}

Person.prototype = {
    constructor: Person,
    sayName: function(){
        alert(this.name);
    }
}

var person1 = new Person("Gordon", 28, "Software Engineer");
var person2 = new Person("Nicole", 28. "Pastry Cook");

person1.friends.push("ccc");
alert(person1.friends === person2.friends); // false

**8.寄生构造函数模式**
除了使用new操作符并把使用的包装函数叫做构造函数之外，这个模式跟工厂模式其实是一模一样的。
function Person(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}

var person1 = new Person("Gordon", 28, "Software Engineer");

一般我们用来对一些已经存在又不能修改的构造函数创建额外方法。

**9.稳妥构造函数模式**
所谓稳妥对象，指的是没有公共属性，而且其方法也不引用this的对象。稳妥对象最适合在一些安全的环境中（这些环境中会禁止使用this和new），或者在防止数据被其他应用程序改动时使用。

