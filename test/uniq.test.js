import { assert, expect } from "chai"
import uniq from '../src/uniq.mjs'

describe('uniq', () => {
  it('是一个函数', () => {
    assert.isFunction(uniq)
  })

  it('数字去重', () => {
    const a1 = [1, 2, 2, 3, 3, 3, 4, 5, 4, 4]
    const a2 = uniq(a1)
    assert.deepEqual(a2, [1, 2, 3, 4, 5])
  })

  it('其他类型', () => {
    const a1 = [1, 1, '2', '2', void 0, null, NaN, void 0, null, NaN]
    const a2 = uniq(a1)
    assert.deepEqual(a2, [1, '2', void 0, null, NaN])
  })
})
