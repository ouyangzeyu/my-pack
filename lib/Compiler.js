const path = require('path')
const fs = require('fs')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default // traver内部是通过es6的语法导出的,所以需要.default才能拿到
const generator = require('@babel/generator').default

class Compliler {
  constructor(config) {
    this.config = config
    this.entry = config.entry
    this.root = process.cwd() // 获取执行指令的根目录
  }

  getSource (path) {
    return fs.readFileSync(path, 'utf-8')
  }

  depAnalyse (modulePath) {
    // 读取模块文件内容
    let source = this.getSource(modulePath)

    let ast = parser.parse(source) // 将suorce转换成抽象语法树
    traverse(ast, {
      CallExpression (p) {
        if (p.node.callee.name === 'require') {
          p.node.callee.name = '__webpack_require__'
          let oldValue = p.node.arguments[0].value
          oldValue = ('./' + path.join('src', oldValue))
          // 避免windows出现反斜杠
          p.node.arguments[0].value = oldValue.replace(/\\+/g, '/')
        }
      }
    })
    let sourceCode = generator(ast).code
  }

  start () {
    // 开始打包
    // 依赖的分析
    this.depAnalyse(path.resolve(this.root, this.entry.index))
  }
}

module.exports = Compliler