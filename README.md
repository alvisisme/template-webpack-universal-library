# 基于Webpack的通用库生成器

基于Webpack的用于生成库文件的模板（输入：ES6， 输出：通用库）

![Travis](https://travis-ci.org/alvisisme/template-webpack-universal-library.svg?branch=master)

## 特性

* 基于Webpack 4
* ES6语法编写
* 导出为 [umd](https://github.com/umdjs/umd) 格式，让你的库在任何环境下工作
* 使用 [Mocha](http://mochajs.org/) 和 [Chai](http://chaijs.com/) 进行ES6测试
* 使用 [ESLint](http://eslint.org/) 进行代码检测

## 过程

```
ES6 source files
       |
       |
    webpack
       |
       +--- babel, eslint
       |
  ready to use
     library
  in umd format
```

*注意你必须在库发布库前进行构建，在 `lib` 目录下的文件就是你应该分发的文件*

## 准备开始

1. 设置库的名字
  * 打开 `webpack.config.js` 文件，修改 `libraryName` 变量值
  * 打开 `package.json` 文件, 修改 `main` 属性以适配库的名字
2. 构建库
  * 运行 `yarn install` (推荐) 或 `npm install` 获得工程依赖
  * 运行 `yarn build` 或 `npm run build` 来生成库的压缩版
3. 开发模式
  * 安装完所有依赖后运行 `yarn dev` 或 `npm run dev`, 这个命令会生成未压缩版的库文件，并且运行一个监听器来获得文件变动后的编译结果
4. 运行测试
  * 运行 `yarn test` 或 `npm run test`

## 脚本说明

* `yarn build` 或 `npm run build` - 在 `lib` 目录下生成库的生产版本
* `yarn dev` 或 `npm run dev` - 生成库的开发版本并运行一个监听器
* `yarn test` 或 `npm run test` - 运行测试
* `yarn test:watch` 或 `npm run test:watch` - 同上，但是以监听模式运行

## 代码规范

基于 [JavaScript Standard Style ](https://standardjs.com/readme-zhcn.html)代码规范。

## 杂项

### 一个将依赖变为打包后结果的依赖而不是由webpack处理的依赖的例子 

在下面的例子里我们剔除了 React 和 Lodash:

```js
{
  devtool: 'source-map',
  output: {
    path: '...',
    libraryTarget: 'umd',
    library: '...'
  },
  entry: '...',
  ...
  externals: {
    react: 'react'
    // Use more complicated mapping for lodash.
    // We need to access it differently depending
    // on the environment.
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: '_',
      root: '_'
    }
  }
}
```

## 参考引用

* [Start your own JavaScript library using webpack and ES6](http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6)
* [krasimir/webpack-library-starter](https://github.com/krasimir/webpack-library-starter)
