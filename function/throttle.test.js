const { assert } = require('chai')
const throttle = require('./throttle')

describe('throttle', () => {
  it('是一个函数', () => {
    assert.isFunction(throttle)
  })

  it('节流可用', (done) => {
    let counts = 0
    const fn = () => { counts += 1 }
    const throttledFn = throttle(fn, 32)

    throttledFn(); throttledFn()
    assert.strictEqual(counts, 1)
    setTimeout(() => {
      assert.strictEqual(counts, 2)
      done()
    }, 64)
  })

  it('可传入参数', (done) => {
    let value = null

    const fn = (val) => { value = val }

    const throttledFn = throttle(fn, 32)
    throttledFn(1); throttledFn(2)

    assert.strictEqual(value, 1)

    setTimeout(() => {
      assert.strictEqual(value, 2)
      done()
    }, 64)
  })

  it('调用一次', (done) => {
    let counts = 0
    const fn = () => counts += 1

    const throttledFn = throttle(fn, 32)

    const result = throttledFn()
    setTimeout(() => {
      assert.strictEqual(counts, 1, 'fn 函数被调用过一次')
      assert.strictEqual(result, 1, 'throttled 函数会返回原始函数的返回值')
      done()
    }, 64)
  })
})
