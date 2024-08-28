# packageJson

## main

用来定义程序的入口文件。通常在你将你的npm包发布打npm之后，别人在使用npm安装完成之后，会通过main字段去查找npm包中暴露出来的变量或者方法。
如果未设置 main，则默认为包根文件夹中的 index.js

## scripts

脚本。这个字段通常用于执行项目中的终端命令，配置为一个对象，key为命令的名称，value为命令的具体内容。定义之后可以通过npm run命令执行。

## dependencies

项目（构建后）的运行时依赖。这个字段通常表示当前项目中使用的要在构建之后运行时用到的依赖包。版本号通常由三组数字中间用小数点分割，第一个数字表示主要版本，第二个参数表示次要版本，最后一个数表示补丁版本。通常依赖包的版本会出现^,~,*等，^表示小于主要版本大于
当前版本的任何版本。~表示下一个次要版本。*表示任意版本。没有符号的话表示固定精确版本。npm install --production只会安装dependencies中的依赖包，不会安装devDependencies中的依赖包。

## devDependencies

项目的开发时依赖包。用于在工程化环境中本地开发和构建时依赖的包，不会在构建之后的代码中存在。

## files

你的npm包发布之后包含的文件，使文件在发布是包含在tarball中。

## bin

提供给外部的可执行行命令，通常一些cli工具，如webpack-cli，vue-cli。会对外暴露出如webpck, vue等命令就是通过该字段实现的

## type

当前项目才有何种模块机制，默认为commonjs，可选值为commonjs, module。不设置时表示项目中的.js默认为是以commonjs模块处理,
设置为module表示以es6模块处理。其中.mjs总是被当做ES模块处理。.cjs 总是被当做CommonJS模块处理。
