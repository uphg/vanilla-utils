class Promise2 {
  successd = null
  fail = null
  constructor(func) {
    if (typeof func !== 'function') {
      throw new Error('只接受函数')
    }
    func(this.resolve.bind(this), this.reject.bind(this))
  }
  resolve() {
    setTimeout(() => {
      this.successd()
    })
  }
  reject() {
    setTimeout(() => {
      this.fail()
    })
  }
  then(successd, fail) {
    this.successd = successd
    this.fail = fail
  }
}

module.exports = Promise2