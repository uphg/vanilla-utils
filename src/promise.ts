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
    if (this.state !== 'pending') return
    this.state = 'fulfilled'
    nextTick(() => {
      this.callbacks.forEach((handle) => {
        const func = handle[0]
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

  reject(reason) {
    if (this.state !== 'pending') return
    this.state = 'rejected'
    nextTick(() => {
      this.callbacks.forEach((handle) => {
        const func = handle[1]
        if (typeof func === 'function') {
          let returnValue
          try {
            returnValue = func.call(void 0, reason)
          } catch(error) {
            return handle[2].reject(error)
          }
          handle[2].resolveWith(returnValue)
        }
      })
    })
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

  resolveWith(param) {
    // 如果当前 Promise (this) 等于 param，则抛出一个 TypeError 错误
    if (this === param) {
      // ...
      this.reject(new TypeError(`${param} and Promise2 are not allowed to be the same reference object`))
    }
    // 如果 param 是一个 Promise ，采用 Promise 的状态
    // 1. 如果是请求状态(pending)，必须保持 pending 直到状态改变
    // 2. 如果是完成态(fulfilled)，就使用相同的值(result)来 fufill Promise
    // 2. 如果是拒绝态(rejected)，就用相同的原因(reason)来 reject Promise
    if (param instanceof Promise2) {
      // 在 then 中传入的 resolve 和 reject 会默认消除 this，所以需要重新绑定
      param.then(this.resolve.bind(this), this.reject.bind(this))
    }

    // 如果 param 是一个对象或方法
    if (isObject(param) || isFunction(param)) {
      let then
      try {
        then = param.then
      } catch(error) {
        this.reject(error)
      }
      // 如果 param 是一个方法
      if (isFunction(then)) {
        try {
          param.then((y) => {
            this.resolveWith(y)
          }, (r) => {
            this.reject(r)
          })
        } catch(error) {
          this.reject(error)
        }
      } else {
        // 如果 param 不是方法 则使用 resolve 处理 param
        this.resolve(param)
      }
    } else {
      // 如果 param 不是对象或方法 则使用 resolve 处理 param
      this.resolve(param)
    }
  }
}

export default Promise2
