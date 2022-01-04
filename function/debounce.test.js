const { assert } = require('chai')
const debounce = require('./debounce')

describe('debounce', () => {
  it('是一个函数', () => {
    assert.isFunction(debounce)
  })
  it('防抖可用', (done) => {
    let counts = 0
    const fn = () => counts += 1

    const debounceFn = debounce(fn, 100)
    debounceFn(); debounceFn()

    setTimeout(debounceFn, 200)

    setTimeout(() => {
      assert.strictEqual(counts, 1)
      done()
    }, 300)
  })
})