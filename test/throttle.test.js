const chai = require('chai')
const assert = chai.assert
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const throttle = require('../src/throttle')
const delay = require('../src/delay')

chai.use(sinonChai)

describe('throttle', () => {
  it('是一个函数', () => {
    assert.isFunction(throttle)
  })

  it('节流可用', (done) => {
    const fn = sinon.fake()
    const throttledFn = throttle(fn, 32)

    throttledFn(); throttledFn()
    assert.strictEqual(fn.callCount, 1)
    setTimeout(() => {
      assert.strictEqual(fn.callCount, 2)
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

  it('节流调用1次', (done) => {
    const fn = sinon.fake.returns(20)
    const throttledFn = throttle(fn, 32)

    const result = throttledFn()
    setTimeout(() => {
      assert.strictEqual(fn.called, true, 'fn 函数被调用过1次')
      assert.strictEqual(result, 20, 'throttled 函数会返回原始函数的返回值')
      done()
    }, 64)
  })

  it('节流调用2次', (done) => {
    const fn = sinon.fake()
    const throttledFn = throttle(fn, 32)
    throttledFn(); throttledFn()
    setTimeout(() => {
      assert.strictEqual(fn.callCount, 2, 'fn 函数被调用过2次')
      done()
    }, 64)
  })

  it('节流调用3次', (done) => {
    const fn = sinon.fake()
    const throttledFn = throttle(fn, 32)
    throttledFn(); throttledFn(); throttledFn()
    setTimeout(() => {
      assert.strictEqual(fn.callCount, 2, 'fn 函数被调用过2次')
      done()
    }, 64)
  })

  it('多次节流', (done) => {
    const fn = sinon.fake()
    const throttledFn = throttle(fn, 32)
    throttledFn(); throttledFn()
    assert.strictEqual(fn.callCount, 1)
    setTimeout(() => {
      assert.strictEqual(fn.callCount, 2)
      throttledFn()
      assert.strictEqual(fn.callCount, 3)
      done()
    }, 96)
  })

  it('return 也会多次节流', () => {
    let counts = 0
    const fn = () => counts += 1
    const throttledFn = throttle(fn, 100)

    const results = []
    const addResult = () => { results.push(throttledFn()) }
    addResult(); addResult()
    delay(addResult, 50)
    delay(addResult, 150)
    delay(addResult, 170)
    delay(addResult, 230)
    delay(() => {
      assert.strictEqual(results[0], 1, '函数调用1次')
      assert.strictEqual(results[1], 1, '函数被节流')
      assert.strictEqual(results[2], 1, '函数被节流')
      assert.strictEqual(results[3], 2, '函数调用2次')
      assert.strictEqual(results[4], 2, '函数被节流')
      assert.strictEqual(results[5], 3, '函数调用3次')
    }, 300)
  })
})
