import nextTick from "./nextTick"
import isObject from "./isObject"
import isFunction from "./isFunction"

class Promise2 {
  private state: 'pending' | 'fulfilled' | 'rejected' = 'pending'
  private callbacks: [Function | null, Function | null, Promise2 | null][] = []

  constructor(func: Function) {
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

  then(successd?, fail?) {
    const handle: [Function, Function, Promise2] = [null, null, null]
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

  private resolveOrReject(state: 'fulfilled' | 'rejected', result, index: 0 | 1) {
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

  private resolveWith(value) {
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

  private resolveWithSelf(value) {
    this.reject(new TypeError(`${value} and Promise2 are not allowed to be the same reference object`))
  }

  private resolveWithPromise(value) {
    value.then(this.resolve.bind(this), this.reject.bind(this))
  }

  private getThen(value) {
    let then
    try {
      then = value.then
    } catch(error) {
      return this.reject(error)
    }
    return then
  }

  private resolveWithObject(value) {
    const then = this.getThen(value)
    if (isFunction(then)) {
      try {
        value.then((y) => {
          this.resolveWith(y)
        }, (r) => {
          this.reject(r)
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
