import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import Promise2 from '../object/promise'

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
  })

  it('Promise 传入一个函数后会生成一个对象，对象有 .then() 方法', () => {
    const promise = new Promise2(() => void 0)
    assert.isFunction(promise.then)
  })

  it('Promise 传入的函数会立即执行', () => {
    const fn = sinon.fake()
    new Promise2(fn)
    assert.isTrue(fn.called)
  })

  it('Func 函数执行时接受 resolve 和 reject 两个函数', (done) => {
    new Promise2((resolve, reject) => {
      assert.isFunction(resolve)
      assert.isFunction(reject)
      done()
    })
  })

  it('promise.then(success) 中的 success 函数会在 resolve 被调用的时候执行', (done) => {
    const success = sinon.fake()
    const promise = new Promise2((resolve, reject) => {
      assert.isFalse(success.called)
      resolve()
      setTimeout(() => {
        assert.isTrue(success.called)
        done()
      }, 0)
    })

    promise.then(success)
  })

  it('promise.then(null, fail) 中的 fail 函数会在 reject 被调用的时候执行', (done) => {
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

  // it("2.2.1 onFulfilled 和 onRejected 都是可选的参数：", () => {
  //   const promise = new Promise(resolve => {
  //     resolve();
  //   });
  //   promise.then(false, null);
  //   assert(1 === 1);
  // });
})
