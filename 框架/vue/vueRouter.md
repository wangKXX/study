# vue-router

## 路由守卫

1. 全局路由守卫 
beforeEach((to, from, next) => {})
afterEach((to, from) => {})
beforeResolve(to => {}) // beforeRouteEnter 之后调用
2. 路由独享守卫 beforeEnter((to, from) => {})

3. 组件内守卫
beforeRouteEnter(to, from, next) {} // 不能使用this
beforeRouteUpdate(to, from) {}
beforeRouteLeave(to, from) {} // 返回false 取消导航

## 路由的三种模式

1. history(vue3 createWebHistory)
2. hash(vue3 createWebHashHistory)
3. abstract（vue3 createMemoryHistory）// 非浏览器环境使用

## vue-router的实现原理

1. hash模式：监听window.onhashchange事件，将hash值作为路由的path，将hash值作为路由的query，将hash值作为路由的hash
2. history模式：监听window.onpopstate事件（监听浏览器的前进后退，history.back()方法触发事件），我们最终使用的push,replace则会对应触发history.pushState,history.replaceState方法

## 路由懒加载

动态导入import()

## vue2中使用this.$router.[push,replace,go,back,forward]

## vue3中使用
```js
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
```

## 内置组件

1. router-link 路由跳转

2. router-view 路由渲染

## 重定向

1. 配置文件中配置redirect