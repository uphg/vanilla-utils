import nextTick from "./nextTick.mjs"
import isObject from "./isObject.mjs"
import isFunction from "./internal/isFunction.mjs"

class Promise2 {
  state = 'pending' // 'pending' | 'fulfilled' | 'rejected'
  callbacks = []    // [successd, fail, new Promise2()]

  constructor(func) {
    if (typeof func !== 'function') {
      throw new Error('只接受函数')
    }
    func(this.resolve.bind(this), this.reject.bind(this))
  }

  resolve(result) {
    this.resolveOrReject('fulfilled', result, 0)
  }

  reject(reason) {
    this.resolveOrReject('rejected', reason, 1)
  }

  then(successd, fail) {
    const handle = [null, null, null]
    if (isFunction(successd)) {
      handle[0] = successd
    }
    if (isFunction(fail)) {
      handle[1] = fail
    }
    handle[2] = new Promise2(() => {})
    this.callbacks.push(handle)

    return handle[2]
  }

  /**
   * 处理解决/拒绝
   * @param {'fulfilled' | 'rejected'} state
   * @param {*} result 
   * @param {0 | 1} index
   * @returns 
   */
  resolveOrReject(state, result, index) {
    if (this.state !== 'pending') return
    this.state = state
    nextTick(() => {
      this.callbacks.forEach((handle) => {
        const func = handle[index]
        if (isFunction(func)) {
          let returnValue
          try {
            returnValue = func.call(void 0, result)
          } catch(error) {
            return handle[2].reject(error)
          }
          handle[2].resolveWith(returnValue)
        }
      })
    })
  }

  resolveWith(value) {
    if (this === value) {
      this.resolveWithSelf(value)
    }
    if (value instanceof Promise2) {
      this.resolveWithPromise(value)
    }
    if (isObject(value) || isFunction(value)) {
      this.resolveWithObject(value)
    } else {
      this.resolve(value)
    }
  }

  resolveWithSelf(value) {
    this.reject(new TypeError(`${value} and Promise2 are not allowed to be the same reference object`))
  }

  resolveWithPromise(value) {
    value.then(this.resolve.bind(this), this.reject.bind(this))
  }

  getThen(value) {
    let then
    try {
      then = value.then
    } catch(error) {
      return this.reject(error)
    }
    return then
  }

  resolveWithObject(value) {
    const then = this.getThen(value)
    if (isFunction(then)) {
      try {
        value.then((y) => {
          this.resolveWith(y)
        }, (error) => {
          this.reject(error)
        })
      } catch(error) {
        this.reject(error)
      }
    } else {
      this.resolve(value)
    }
  }
}

export default Promise2
