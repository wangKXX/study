
interface Parent {
  name: string;
}

interface Child extends Parent {
  age: number;
}

type FuncParamsType = (params: Child) => void;
/**
 * @param params 
 * @description 逆变 父类型可以赋值给子类型 params在类型定义的时候是Child类型（大类型）,但是在堆定义的
 * func赋值的时候定义的params类型是parent类型（小类型）
 * 这是ts的类型校验并不会报错，应为定义的函数中Parent中访问的属性和变量在Child中都有，所以在TS
 * 检查中总是能通过的
 */
const func: FuncParamsType = (params: Parent) => {
  console.log(params.name);
};

type FuncRetType = () => Parent;

/**
 * 
 * @returns 
 * @description 协变 子类型可以赋值给父类型 类型定义中的返回值类型是Parent类型（小类型），但是在funcRet中定义的函数的返回值类型是
 * Child大类型,这种兼容性变化属于协变 也就是大类型赋值给小类型能够兼容。对于函数返回值来说定义的类型为小类型
 * 在之后都与函数返回值的访问中ts类型系统中圈定的那些属性和变量在Child中都有所以不会报错
 */
const funcRet: FuncRetType = (): Child => {
  return {
    name: '张三',
    age: 18
  };
};

const childData: Child = {
  name: '张三',
  age: 18
}
// 协变
const parentData: Parent = childData

const strArr: string[] = ['1', '2', '3']
// 协变
const objArr: Object[] = strArr


// 双变 子 -> 父 父 -> 子

// 抗变 不变


