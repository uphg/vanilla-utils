const { assert } = require('chai')
const throttle = require('./throttle')

describe('throttle', () => {
  it('是一个函数', () => {
    assert.isFunction(throttle)
  })
})
