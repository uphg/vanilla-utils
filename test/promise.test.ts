import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import Promise2 from '../src/promise'

chai.use(sinonChai);

const assert = chai.assert

describe('Promise', () => {
  it('是一个类', () => {
    assert.isFunction(Promise2)
    assert.isObject(Promise2.prototype)
  })

  it('new Promise() 必须接受一个函数', () => {
    assert.throw(() => {
      // @ts-ignore
      new Promise2()
    })

    assert.throw(() => {
      // @ts-ignore
      new Promise2(1)
    })

    assert.throw(() => {
      // @ts-ignore
      new Promise2(false)
    })

    assert(new Promise2(() => {}))
  })

  it('生成一个对象，对象有 .then() 方法', () => {
    const promise = new Promise2(() => void 0)
    assert.isFunction(promise.then)
  })

  it('传入的函数会立即执行', () => {
    const fn = sinon.fake()
    new Promise2(fn)
    assert.isTrue(fn.called)
  })

  it('函数执行时接受 resolve 和 reject 两个函数', (done) => {
    new Promise2((resolve, reject) => {
      assert.isFunction(resolve)
      assert.isFunction(reject)
      done()
    })
  })

  it('resolve 执行', (done) => {
    const fn = sinon.fake()
    const promise = new Promise2((resolve, reject) => {
      assert.isFalse(fn.called)
      resolve()
      setTimeout(() => {
        assert.isTrue(fn.called)
        done()
      }, 0)
    })

    promise.then(fn)
  })

  it('reject 执行', (done) => {
    const fn = sinon.fake()
    const promise = new Promise2((resolve, reject) => {
      assert.isFalse(fn.called)
      reject()
      setTimeout(() => {
        assert.isTrue(fn.called)
        done()
      }, 0)
    })

    promise.then(null, fn)
  })

  it("2.2.1 如果 resolve 和 reject 不是函数，必须忽略", () => {
    const promise = new Promise2(resolve => {
      resolve();
    });
    promise.then(false, null);
    assert(1 === 1);
  })

  it('2.2.2 如果 onFulfilled 是函数', (done) => {
    const fn = sinon.fake()
    const promise = new Promise2(resolve => {
      assert.isFalse(fn.called)
      resolve(1)
      resolve(2)
      setTimeout(() => {
        assert.isTrue(fn.calledOnce)
        assert(fn.calledWith(1))
        done()
      }, 0)
    })
    promise.then(fn)
  })

  it('2.2.3 如果 onRejected 是函数', (done) => {
    const fn = sinon.fake()
    const promise = new Promise2((resolve, reject) => {
      assert.isFalse(fn.called)
      reject(1)
      reject(2)
      setTimeout(() => {
        assert.isTrue(fn.calledOnce)
        assert(fn.calledWith(1))
        done()
      }, 0)
    })
    promise.then(null, fn)
  })

  it('2.2.4.1 在当前代码执行完成之前，不得调用 then 中的 resolve 函数', (done) => {
    const fn = sinon.fake()
    const promise = new Promise2((resolve) => {
      resolve()
    })
    promise.then(fn)
    assert.isFalse(fn.called)
    setTimeout(() => {
      assert.isTrue(fn.called)
      done()
    }, 0)
  })

  it('2.2.4.2 在当前代码执行完成之前，不得调用 then 中的 reject 函数', (done) => {
    const fn = sinon.fake()
    const promise = new Promise2((resolve, reject) => {
      reject()
    })
    promise.then(null, fn)
    assert.isFalse(fn.called)
    setTimeout(() => {
      assert.isTrue(fn.called)
      done()
    }, 0)
  })

  it('2.2.5 then 中的函数没有 this 值', () => {
    const promise = new Promise2((resolve) => {
      resolve()
    })
    promise.then(function() {
      'use strict'
      assert(this === void 0)
    })

    const promise2 = new Promise2((resolve, reject) => {
      reject()
    })
    promise2.then(function() {
      'use strict'
      assert(this === void 0)
    })
  })

  it('2.2.6.1 then 可以在同一个 promise 对象中被多次调用，并且按照调用顺序执行（成功）', done => {
    const callbacks = [
      sinon.fake(),
      sinon.fake(),
      sinon.fake()
    ]
    const promise = new Promise2((resolve) => {
      resolve()
    })
    promise.then(callbacks[0])
    promise.then(callbacks[1])
    promise.then(callbacks[2])
    setTimeout(() => {
      assert(callbacks[0].called)
      assert(callbacks[1].called)
      assert(callbacks[2].called)
      assert(callbacks[1].calledAfter(callbacks[0]))
      assert(callbacks[2].calledAfter(callbacks[1]))
      done()
    }, 0)
  })

  it('2.2.6.2 then 可以在同一个 promise 对象中被多次调用，并且按照调用顺序执行（失败）', done => {
    const callbacks = [
      sinon.fake(),
      sinon.fake(),
      sinon.fake()
    ]
    const promise = new Promise2((resolve, reject) => {
      reject()
    })
    promise.then(null, callbacks[0])
    promise.then(null, callbacks[1])
    promise.then(null, callbacks[2])
    setTimeout(() => {
      assert(callbacks[0].called)
      assert(callbacks[1].called)
      assert(callbacks[2].called)
      assert(callbacks[1].calledAfter(callbacks[0]))
      assert(callbacks[2].calledAfter(callbacks[1]))
      done()
    }, 0)
  })
})
