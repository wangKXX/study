# typescript

## type和interface的区别

1. type是类型别名，interface是接口
2. type可以声明基本类型别名，联合类型，元组等类型，interface只能声明对象类型
3. type声明的类型不可重复，interface可以重复声明，会合并成一个类型(后续声明的同一个key的类型必须和之前保持一致)
4. type可以被interface继承，interface通过extends继承实现扩展，type只能通过&实现扩展
5. type 不能被extends, implements
6. 都可以使用泛型


## any
任意类型，可以赋值给任意类型,可以访问任意属性，可以调用任意方法

## object

非原始类型，可以访问其上的属性，但不能调用其上的方法

# unknow
安全的任意类型，可以赋值给任何类型，但是反过来不行，不能访问其上的属性，不能调用其上的方法。经过类型断言之后才能访问属性和方法
## naver

表示永远不可能存在的类型比如string & number

## void

void表示没有任何类型，一般用于函数的返回值，定义一个变量的类型为void,则只能给它赋值为undefined和null


## 类型断言

1. 尖括号语法<type>obj
2. as语法 obj as type

## infer

inter 通常和extends结合使用,用来返回一个推断的类型

## 逆变与协变？
入参类型的兼容(逆变) 返回值类型的兼容(协变)