class Promise2 {
  successd = null
  fail = null

  constructor(func: Function) {
    if (typeof func !== 'function') {
      throw new Error('只接受函数')
    }
    func(this.resolve.bind(this), this.reject.bind(this))
  }

  resolve() {
    setTimeout(() => {
      const fn = this.successd
      if (typeof fn === 'function') fn()
    }, 0)
  }

  reject() {
    setTimeout(() => {
      console.log('this.fail')
      console.log(this.fail)
      const fn = this.fail
      if (typeof fn === 'function') {
        fn()
      }
    }, 0)
  }

  then(successd?, fail?) {
    if (typeof successd === 'function') this.successd = successd
    console.log('.then fail')
    console.log(fail)
    if (typeof fail === 'function') this.fail = fail
  }
}

export default Promise2
