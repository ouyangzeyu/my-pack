此项目是对webpack实现打包的一个简单模拟，帮助理解webpack的原理

* 开始的基础配置

1 在项目的根目录新建bin文件夹，在里面新建核心的js文件
```javascript
// 指定该文件的运行环境为node，这是必须配置的
#!/usr/bin/env node

console.log('我要开始打包了,这是我们自己的打包工具')

const path = require('path')

// 1 读取需要打包项目的配置文件
let config = require(path.resolve('webpack.config.js'))
console.log(config)

// 2 通过面向对象的方式来进行项目推进
const Compiler = require('../lib/Compiler.js')
new Compiler(config).start()
```

2 在package.json文件中配置：
```json
"bin": {
    "mypack": "./bin/mypack.js"
  },
```
键名就是指令名，值是需要执行的js文件

3 通过npm link命令将我们自己的命令链接到全局node命令包，这样我们在终端输入mypack命令就可以运行了，否则直接报错