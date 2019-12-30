const path = require('path')
const fs = require('fs')

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
    let result = this.getSource(modulePath)
    console.log(result)
  }

  start () {
    // 开始打包
    // 依赖的分析
    this.depAnalyse(path.resolve(this.root, this.entry.index))
  }
}

module.exports = Compliler