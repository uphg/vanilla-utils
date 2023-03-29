import { assert } from "chai"
import debounce from '../src/debounce.mjs'

describe('debounce', () => {
  it('是一个函数', () => {
    assert.isFunction(debounce)
  })

  it('防抖可用', (done) => {
    let counts = 0
    const fn = () => counts += 1

    const debounceFn = debounce(fn, 200)
    debounceFn(); debounceFn()

    setTimeout(debounceFn, 150)
    setTimeout(debounceFn, 250)

    setTimeout(() => {
      assert.strictEqual(counts, 1)
      done()
    }, 500)
  })
})
