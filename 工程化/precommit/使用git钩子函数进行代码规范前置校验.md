# 使用git钩子函数进行前置校验
通常在公司项目中会指定个中的git提交代码标准和规范,比如规范的git提交文案，代码的eslint规范，tslint规范等等。统一的代码格式等，如果只是靠人力去自觉遵守显然是不太现实的，所以需要去使用一些工程化的强制约束，来对开发过程进行合规约束。
具体步骤如下：

- 安装husky：npm install husky --save-dev

- 启用git hooks：npx husky install 执行完场之后会在项目目录生成一个.husky文件夹
  * _文件下回生成对应支持的githooks文件，如pre-commit、pre-push等，对应的是git hooks的钩子函数，可以在其中做对应的事情
  * commit-msg 文件是用来对commit message进行校验的

- 在package.json中添加prepare脚本： prepare: "husky install"
