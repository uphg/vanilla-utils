const { assert } = require('chai')
const bind = require('../src/bind')

describe('bind', () => {
  before(() => {
    // 在原型链上添加一个 bind2 用于测试
    Function.prototype.bind2 = bind
  })

  after(() => {
    // 测试完成后删除该函数
    delete Function.prototype.bind2
  })

  it('是一个函数', () => {
    assert.isFunction(Function.prototype.bind2)
  })

  it('绑定 this', () => {
    const obj = {
      a: 1
    }
    const fn = function () {
      return this
    }
    const newFn = fn.bind2(obj)
    assert.strictEqual(newFn(), obj)
  })

  it('绑定 this 和多个参数', () => {
    const obj = {
      a: 1
    }

    const fn = function (p1, p2) {
      return [this, p1, p2]
    }

    const newFn = fn.bind2(obj, 1, 2)
    assert.deepEqual(newFn(), [obj, 1, 2])
  })

  it('绑定 this 和多个参数后可以在调用时继续传入参数', () => {
    const obj = {
      a: 1
    }

    const fn = function (p1, p2, p3, p4) {
      return [this, p1, p2, p3, p4]
    }

    const newFn = fn.bind2(obj, 1, 2)
    const result = newFn(3, 4)
    assert.deepEqual(result, [obj, 1, 2, 3, 4])
  })

  it('bind 后可以使用 new 运算符创建构造函数', () => {
    const fn = function (a, b) {
      this.a = a;
      this.b = b;
    }
    fn.prototype.run = () => { }
    const fn2 = fn.bind2(undefined, 1, 2);
    const obj = new fn2()

    assert.strictEqual(obj.a, 1)
    assert.strictEqual(obj.b, 2)
    assert.isFunction(obj.run)
  })

  it('bind 后可以使用 new 运算符创建构造函数，并且传入参数', () => {
    const fn = function (a, b, c, d) {
      this.a = a
      this.b = b
      this.c = c
      this.d = d
    }
    fn.prototype.run = () => { }

    const fn2 = fn.bind2(undefined, 1, 2)
    const obj = new fn2(3, 4)

    assert.strictEqual(obj.a, 1)
    assert.strictEqual(obj.b, 2)
    assert.strictEqual(obj.c, 3)
    assert.strictEqual(obj.d, 4)
    assert.isFunction(obj.run)
  })

  it('...', () => {
    const fn = function (a, b) {
      this.a = a
      this.b = b
    }
    fn.prototype.run = () => { }
    const obj1 = new fn(1, 2)
    const fn2 = fn.bind2(obj1, 3, 4)
    const obj2 = fn2()

    assert.isUndefined(obj2)
    assert.strictEqual(obj1.a, 3)
    assert.strictEqual(obj1.b, 4)
    assert.isFunction(obj1.run)
  })
})
