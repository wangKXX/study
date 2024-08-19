# vite原理

vite 是一个基于 esbuild 的开发服务器。提供了极为快速的冷启动. 在开发环境下，vite使用ESBuild + 浏览器原生的ESModule支持，无需额外的构建步骤，并且始终提供实时重载。

## vite为什么开发环境冷启动非常快

vite 将我们的代码分为依赖和源码，依赖是指一些第三方模块，代码进本不会变动。源码是我们自己编写的代码。
1. 基于浏览器默认支持的ESModule, 无需在启动时进行整个项目的编译构建
2. 按需编译. vite在浏览器获取当前需要文件是对，获取的文件进行编译（包括bable, scss， less, image， vue， react源文件转换）
3. 预构建。vite会对依赖模块进行预构建。预构建主要是指对依赖库进行ESModule转换，由于第三库中有些不支持ESModule，vite会对这些库进行ESM转换。还有一点是对依赖库进行单一依赖转换，主要是为了防止一个ESM中导出过多依赖而浏览器会自动请求这些依赖而造成的不必要的性能浪费。预构件完成后vite会将依赖构建结果存储在文件系统（node-modules/.vite）中，下次启动时直接从缓存中读取）,文件缓存失效原则. vite.config.js修改，lock文件修改，补丁文件修改时间，NODE_ENV
4. 缓存策略. 源码模块进行协商缓存，依赖模块进行强缓存。

```
vite启动之后会在_createServer方法中启动devserver, hmrwebsocket服务。在启动Devserver前会触发initServer方法，该方法内部会定义了一个IIFE函数调用initDepsOptimizer方法，判断如果没有构建结果的话则调用createDepsOptimizer方法，之后调用toDiscoveredDependencies-> extractExportsData使用esbuild的build方法将依赖构建为esm模块。
对于源码的按需编译。在devserver启动是vite会注入transformMiddleware中间件，该中间件用于拦截浏览器请求，对于源码中的静态资源vite调用transformRequest -> loadAndTransform 方法进行源码的编译(pluginContainer下的transform方法，内部会对请求文件的依赖进行分析，在使用对应的loader进行代码转换)。获取到编译结果之后会调用getDepsOptimizer方法进行ESM转换之后为该资源设置缓存策略（cacheControl：max-age=31536000,immutable, etag）。
```

## 热更新流程

1. devserver 启动时会通过chokidar.watch对文件进行监听
2. 文件变化之后会触发watcher.on('change')事件
3. 触发pluginContainer.watchChange事件对文件进行编译
4. 触发moduleGraph.onFileChange事件，更新模块依赖关系
5. 通过onHMRUpdate方法最终会调用hmt.ts下的updateModules（其中会对当前module的依赖项是否需要更新进行判断）
6. 通过webbsocket发送更新内容（updates）到客户端
7. 客户端在收到update消息之后会根据update内的path查找所有的link标签,找到之后将该标签调用cloneNode方法重新创建一个link标签，将标签插入到目标标签之后，然后在新的标签加载之后删除旧的标签

## 生产环境构建

vite在生产环境仍然是需要构建的（处理非js文件的转换）, 默认情况下构建的目标版本最低是到es6, 且构建的结果中是不包含polyfill的，构建结果仍然是ESM。
如果需要兼容低版本浏览器，需要使用 @vitejs/plugin-legacy 插件来支持，该插件内部使用babel对源码进行了转换。

```typescript
import legacy from '@vitejs/plugin-legacy'

export default {
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
}
```

其中targets为目标浏览器版本

@vitejs/plugin-legacy会在html文件中插入
```html
<script nomodule> 
```
经过babel转换之后的降级代码，但在支持esm的浏览器中，该脚本会被忽略。
