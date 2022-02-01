class Promise2 {
  private state: 'pending' | 'fulfilled' | 'rejected' = 'pending'
  private callbacks: [Function | null, Function | null][] = []

  constructor(func: Function) {
    if (typeof func !== 'function') {
      throw new Error('只接受函数')
    }
    func(this.resolve.bind(this), this.reject.bind(this))
  }

  resolve(result) {
    if (this.state !== 'pending') return
    this.state = 'fulfilled'
    setTimeout(() => {
      this.callbacks.forEach((handle) => {
        const func = handle[0]
        if (typeof func === 'function') {
          func.call(void 0, result)
        }
      })
    }, 0)
  }

  reject(reason) {
    if (this.state !== 'pending') return
    this.state = 'rejected'
    setTimeout(() => {
      this.callbacks.forEach((handle) => {
        const func = handle[1]
        if (typeof func === 'function') {
          func.call(void 0, reason)
        }
      })
    }, 0)
  }

  then(successd?, fail?) {
    const handle: [Function, Function] = [null, null]
    if (typeof successd === 'function') {
      handle[0] = successd
    }
    if (typeof fail === 'function') {
      handle[1] = fail
    }
    this.callbacks.push(handle)
  }
}

export default Promise2
