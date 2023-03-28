import now from './internal/now.mjs'

function debounce(func, wait) {
  let timerId, context, prev, result, args

  const later = function () {
    clearTimeout(timerId)
    const passed = now() - prev

    if (wait > passed) {
      timerId = setTimeout(later, wait - passed)
    } else {
      timerId = null
      result = func.apply(context, args)
    }
  }

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

export default debounce
