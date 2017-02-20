# 2017-02-16 js继承

ECMAScript只支持实现继承，而且其实现继承主要是依靠原型链来实现的。
**1.原型链**
基本思想：是利用原型让一个引用类型继承另一个引用类型的属性和方法。

**每个构造函数都有一个原型对象**
**原型对象都包含一个指向构造函数的指针**
**实例都包含一个指向原型对象的内部指针**

原型链的基本概念：
那么，假如我们让原型对象等于另一个类型的实例，显然，此时的原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实例与原型的链条。


实现原型链有一种基本模式：
function SuperType(){
    this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
};

function SubType(){
    this.subproperty = false;
}

//继承了SuperType
SubType.prototype = new SuperType();

SubType，prototype.getSubValue = function(){
    return this.subproperty;
};

var instance = new SubType();
alert(instance.getSuperValue()); // true

![WX20170216-145341@2x](media/14872262403729/WX20170216-145341@2x.png)

原型链的问题：
1.还是因为引用类型值的原型属性会被所有实例共享。
2.不能向超类型的构造函数中传递参数。

解决问题1:
借用构造函数的技术（有时候也叫伪造对象或经典继承）
基本思想：即在子类型构造函数的内部调用超类型狗仔函数。

function SuperType(){
    this.colors = {"red", "yellow", "blue"};
}

function SubType(){
    //继承了SuperType
    SuperType.call(this);
}

var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,yellow,blue,black"

var instance2 = new SubType();
alert(instance2.colors); //"red,yellow,blue "

缺点：仅仅是借用构造函数，那么也将无法避免构造函数模式存在的问题——方法都在构造函数中定义，因此函数复用就无从谈起。

组合继承



