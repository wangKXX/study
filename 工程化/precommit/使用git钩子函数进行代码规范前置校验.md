# 使用git钩子函数进行前置校验

通常在公司项目中会指定个中的git提交代码标准和规范, 比如规范的git提交文案，代码的eslint规范，
tslint规范等等。统一的代码格式等，
如果只是靠人力去自觉遵守显然是不太现实的，所以需要去使用一些工程化的强制约束，来对开发过程进行合规约束。
具体步骤如下：

* 安装husky：npm install husky --save-dev

* 启用git hooks：npx husky 执行完场之后会在项目目录生成一个.husky文件夹
  + _文件下会生成对应支持的githooks文件，如pre-commit、pre-push等，对应的是git hooks的钩子函数，可以在其中做对应的事情
  + commit-msg 文件是用来对commit message进行校验的

* 在package.json中添加prepare脚本： prepare: "husky install"
* 之后就可以使用之前在.husky文件夹下添加的pre-commit钩子中执行命令，如：npm run test

* 使用lint-staged: lint-staged的出现主要是为了解决在执行lint时只校验本次缓存区的文件，对于一些历史项目添加的eslint规则的代码，
，在没有lint-staged的情况下，每次提交会对之前的代码进行校验，导致无法提交，所以需要lint-staged只对本次缓存区内的内容进行校验。

```
lint-staged: 接收一个对象作为配置，key表示一个通配符(包含的文件)，value表示一个命令，如：eslint， stylelint等
```

* 使用commitlint 进行代码提交信息校验
  + 安装：npm install @commitlint/config-conventional @commitlint/cli --save-dev
  + 添加配置文件：commitlint.config.js 配置参考根目录下的commitlint.config.js 文件
  + 生成commit-msg文件：npx husky add .husky/commit-msg 'npx --no-install commitlint --edit ${1}'
之后在下次提交的时候就会对commit message进行校验了
* 使用prettier 对代码进行格式化
  + 安装：npm install prettier --save-dev
