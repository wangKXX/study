# vue2.0

## 生命周期函数详细解释
1.beforeCreate  组件实例初始化完成，并且props数据解析完成之后立即调用，然后props被处理成响应式数据
接下来开始处理data，commputed等响应式数据
2.created  响应式数据已经创建完成（包括props，data，computed， watch）
3.beforeMount  模版解析完成，生成对应的render函数，这是还没有生成真实的dom
4.mounted  生成真实的dom，并且挂载到页面上
5.beforeUpdate  数据更新，dom更新前调用
6.updated  dom更新后调用
7.beforeDestroy  组件销毁前调用，组件实例依然完整存在，可以访问组件实例上的属性和方法，通常在这个
生命周期中，清除定时器，取消订阅等操作
8.destroyed  组件销毁后调用，组件实例已经销毁，无法访问组件实例上的属性和方法
9.activated  keep-alive 组件激活时调用
10.deactivated  keep-alive 组件停用时调用

## vue2中逻辑复用
1.mixin  混入，将多个组件的公共逻辑提取出来，通过mixin的方式，将公共逻辑提取出来，然后混入

## vue2中组件通信
1.父子组件通信  父组件通过props向子组件传递数据，子组件通过props接收父组件传递的数据
2.兄弟组件通信  通过父级组件采用props和emit，或者vuex,eventbus,provider/inject实现
3.跨级组件通信  vuex,eventbus,provider/inject

## vue2中组件的异步加载
动态import

## vue2为什么会有set和delete方法

因为Object.defineProperty()无法监听属性的新增和删除，所以vue2提供了这两个方法，通过set新增属性时
vue会对新加的属性进行劫持，从而实现依赖收集和派发更新，同样在删除属性的时候也会去清除依赖队列。

## vue中的commputed和watch区别

computed是会依赖其内部的响应式数据生成一个新的响应式数据，并且依赖的数据发生变化之后，在下一次获取的时候会重新计算，如果依赖没有发生变更则会返回缓存的值，而watch是监听的属性发生变化时重新出发回调函数的执行。
