```
本质上，webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具
```

## 生产环境构建全过程
1. 通过以配置entry点为入口，通过执行compiler.run(), 方法，生成一个依赖图(moduleGraph)---依赖收集，不做代码编译转换
2. 生成mudleGraph之后，调用compiler.compile()通过compilation.seal()方法生成chunkGraph ---通过mudleGraph对代码进行chunk分组之后通过connectChunkGroupParentAndChild生成chunkGroup(关联图)，之后再optimizeChunks钩子使用SplitChunksPlugin插件进行分包和触发其他插件,之后触发optimizeChunkModules钩子执行代码生成和文件写入磁盘
3. 生成assets(最终产物)。执行完上步操作之后则会进入到codeGeneration方法，在codeGeneration方法中使用createHash方法生成每个mudle都算一个job,之后交给_runCodeGenerationJobs方法逐个转化为描述源代码信息的对象（webpack source对象）之后调用createChunkAssets方法，生成runTime 代码，最终回调到compiler.emitAssets方法，将代码写入磁盘。
至此完成了build的全过程，其中webpack配置的loader是在第三阶段生成runTime代码是调用

## 开发环境构建全过程
当我们通过执行npm run dev命令的时候其实是在package.json的scripts配置中找到dev命令,执行webpack server --config webpack.dev.js。
webpack-cli 下的package.json文件内配置的bin：./bin/cli.js，在webpack-cli中会调用bin/cli.js -> lib/webpack-cli.js，通过触发webpackCli.run -> mackCommand方法注册server命令

1. webpack server命令执行后会调用webpack-cli/server下的index.js内的ServeCommand下之前注册的server命令
2. 触犯server命令之后会触发对应的回调函数，回调函数内会生成对应的webpcak.compiler实例，之后通过获取webpack-dev-server依赖包将compiler实例当做构造参数生成server实例。
3. 之后调用server的start方法，启动一个websocket服务，通过server.setupHooks,开启compiler.done钩子的监听，同时启动一个express服务。
4. 之后调用initialize方法，通过webpack的compiler实例使用providePlugin插件将socket客户端相关代码注入页面。
5. 之后通过compiler实例注册HotModuleReplacementPlugin插件对页面注入相关Hmr代码（主要是manifest对象相关），同时开启文件监听
6. 当compiler的done钩子触发之后，会调用server的send方法，触发message为ok type的回调。
7. 之后调用注入客户端的reloadApp防范，通过触发hmr的hotEmitter。emit('webpackHotUpdate', currentHash)触发hmr监听的webpackHotUpdate的回调
8. 回调函数中触发module.hot.check(HotModuleReplacement.runtime.js)方法，拉取新模块信息(XXX.hot-update.json)
9. 检查需要更新后会触发module.hot.apply方法最终会执行internalApply方法
10. 最终会走到JsonpChunkLoadingRuntimeModule中通过JSOP的方式获取最新的chunk文件，每次下发新的chunk文件都会生成一个对应的applyHandler，只要包含两个方法一个dispose方法，一个apply方法,dispose方法主要是删除旧的模块，apply方法会执行下发的chunk内容（IIFE函数）同时，触发module.hot.accepte时HMR会重新require在accept的模块依赖和执行回调函数
以上流程只是webpack本身实现的hmr流程，对于vue，react自己实现了hmr的逻辑.

## webpack如何实现文件变更监听

webpack通过使用 watchpack库来进行文件系统监听，watchpack是对node的fs.watch进行了平台差异屏蔽的库。


## webpack是如何更新页面的
在收到webpack的ok消息之后会触发hot的event webpackHotUpdate,之后会触发hmr注入的webpackHotUpdate的回调，回调中会调用module.hot.check方法，会拉取xxx.hot-update.json文件，这个文件里面会包含需要更新以及需要卸载的chunks文件，拿到hot-update.json文件之后会触发apply方法对需要更新的chunks文件进行下载执行（jsonp），执行完成之后会触发hot.accept方法，触发组件更新，调用hot.dispose方法根据hot-update.json中返回的需要删除的模块列表来删除旧的模块释放内存。