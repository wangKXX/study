# webpack 构建优化

## 通用优化

1. 为loader设置合理的include。多数情况下，只需要对src下的源代码进行处理，应避免使用.js类似的通配处理
2. 使用DllPlugin。使用DllPlugin为一些不会发生变更的文件生成单独的构建结果(首次还是会慢，之后启动会变快)
3. 使用SplitChunksPlugin. SpliitChunksPlugin可以帮助我们进行合理的分包，减小chunk体积。合理的分包可以提升构建速度和首屏加载速度，一般建议设置为async（对动态引入的模块进行拆分）
4. 对js文件使用thread-loader. thread-loader可以开启多线程编译，可以提升构建速度，一般采用nodejs的os模块，os.cpus().length来设置workers数量
5. 使用持久化缓存。通过设置webpack5 的cache配置，可以缓存构建结果，避免每次构建都需要重新编译。将cache的值配置为filesystem，可以缓存到文件系统，这样在打包时，会先检查缓存是否存在，如果存在，则直接使用缓存，否则重新编译。通过设置cache.buildDependencies，可以设置哪些文件变更后需要需要重新编译。在webpack4中也有类似的能力，比如在watch模式下babel插件的cacheDirectory配置（并非是持久化缓存，而是将编译结果存储在内存中，会随着进程的释放而销毁）,对应的cache-loader可以实现持久化缓存。
6. TypeScript. 使用 ts-loader 时，设置 happyPackMode: true 或 transpileOnly: true(仅编译),然后通过fork-ts-checker-webpack-plugin使用单独的进程进行类型检查。

## 开发时优化

由于在开发时webpack任然需要打包，这就导致在项目体积变大和依赖变大是导致启动编译速度变慢。可以采用如下方式来是启动速度加快。
1. 优先使用webbpack-dev-server. webpack-dev-server会把编译后的资源存储在内存当中，而非在build时写入文件系统，这样能有更快的操作速度。
2. 使用webpack的watch模式. watch模式会监听文件的变化，当文件发生变化时，会进行增量编译。
3. 使用合理的devtool配置. 使用 eval-source-map 变体配置进行增量编译
4. 避免在开发环境使用一些生成环境的插件或者工具。如压缩混淆插件

## 生产时优化

生产环境的打包速度在除去通用优化手段之外，最大的差别实在对于souce-map的处理上.
在大厂环境中通常会对前端项目进行错误日志收集，在日志解析中source-map的配置对于异常的定位显得尤为重要。一下是devtool的常见配置。

1. 包含evel时（evel, eval-cheap-source-map, eval-cheap-module-source-map, eval-source-map） 默认配置，通常在开发环境使用，编译速度相对较快. 但是产物中会直接包含souce-map信息
2. 包含source-map时（cheap-source-map, cheap-module-source-map, source-map）会生成单独的.map文件
3. 包含cheap时（cheap-source-map, cheap-module-source-map）会生成单独的.map文件，但是不会包含souce-map的列信息，只有行信息
4. 包含module时（cheap-module-source-map, source-map）是包含是行列错误信息是基于源代码的，不会受到中间类似bable的转换的影响
5. 包含nosources时，sourcemap信息不包含源码，即信息是基于babel处理之后的代码给出的
5. 包含inline时（inline-source-map, inline-cheap-source-map, inline-cheap-module-source-map）会生成内联的souce-map信息(base64 DataURl)，但是会增加打包体积
6. 包含hidden时，打包的soucemap信息不会再构建产物中添加 //# sourceMappingURL= 这样浏览器将不会自动打开相应的源码。在你需要使用soucemap信息，但是又不想浏览器自动加载时可以使用带hidden的配置,事实上当我们进行生产环境日志上报时用的也是hidden配置。

对于一些不需要生产环境日志处理的项目可以选择在生产环境关闭devtool配置。
