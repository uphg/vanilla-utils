import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import nextTick from '../src/nextTick'

chai.use(sinonChai);

const assert = chai.assert

describe('nextTick', () => {
  it('是一个函数', () => {
    assert.isFunction(nextTick)
  })

  it('在当前代码执行完成后调用', () => {
    const fn = sinon.fake()
    nextTick(fn)
    assert.isFalse(fn.called)
    setTimeout(() => {
      assert(fn.called)
    })
  })
})

