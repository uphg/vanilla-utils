const { assert } = require('chai')
const throttle = require('./throttle')

describe('throttle', () => {
  it('是一个函数', () => {
    assert.isFunction(throttle)
  })

  it('节流可用', (done) => {
    let counts = 0
    const fn = () => { counts += 1 }
    const throttleFn = throttle(fn, 32)

    throttleFn(); throttleFn()
    assert.strictEqual(counts, 1)
    setTimeout(() => {
      assert.strictEqual(counts, 2)
      done()
    }, 64)
  })
})
