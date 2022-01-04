const now = Date.now

function debounce(func, wait) {
  let timerId = null,
    context,
    prev,
    result,
    args

  // 延迟执行函数
  const later = function () {
    clearTimeout(timerId)
    const passed = now() - prev
    if (wait > passed) {
      timerId = setTimeout(later, wait - passed)
    } else {
      result = func.apply(context, args)
    }
  }

  // 去抖动函数
  const debounced = function (..._args) {
    context = this
    args = _args
    prev = now()
    if (!timerId) {
      timerId = setTimeout(later, wait)
    }

    return result
  }

  return debounced
}

module.exports = debounce