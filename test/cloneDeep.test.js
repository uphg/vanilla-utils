import { assert } from "chai"
import cloneDeep from "../src/cloneDeep.mjs"

describe('cloneDeep', () => {
  it('是一个函数', () => {
    assert.isFunction(cloneDeep)
  })

  it('拷贝普通值', () => {
    const a = 'hi'
    const b = cloneDeep('hi')
    assert.strictEqual(a, b)
  })

  it('拷贝对象', () => {
    const a = {
      number: 1,
      boolean: false,
      string: 'hi',
      empty1: undefined,
      empty2: null,
      array: [
        { name: 'Jacky', age: 18 },
        { name: 'Tom', age: 16 }
      ],
      date: new Date(2000, 0, 1, 20, 30, 0),
      regex: /\.(j|t)sx/i,
      obj: { name: 'Tom', age: 18 },
      f1: (a, b) => a + b,
      f2(a, b) {
        return a + b
      } 
    }
    const b = cloneDeep(a)

    assert.strictEqual(b.number, 1)
    assert.strictEqual(b.boolean, false)
    assert.strictEqual(b.string, 'hi')
    assert.strictEqual(b.empty1, void 0)
    assert.strictEqual(b.empty2, null)
    assert.strictEqual(b.array[0].name, 'Jacky')
    assert.strictEqual(b.array[1].name, 'Tom')
    assert.strictEqual(b.date - 0, new Date(2000, 0, 1, 20, 30, 0).getTime())
    assert.strictEqual(b.regex.source, a.regex.source)
    assert.notStrictEqual(b.obj, a.obj)
    assert.strictEqual(b.obj.name, a.obj.name)
    assert.strictEqual(b.obj.age, a.obj.age)
    assert.isFunction(b.f1)
    assert.isFunction(b.f2)
    assert.isUndefined(b.f2.prototype)
    assert.notStrictEqual(a, b)
  })

  it('引用自身', () => {
    
  })
})
