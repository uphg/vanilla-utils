import now from './internal/now.mjs'

function throttle(func, wait) {
  let context, args, result, timerId
  let prev = 0

  const later = function () {
    clearTimeout(timerId)
    prev = now()
    timerId = null
    result = func.apply(context, args)
  }

  const throttled = function (..._args) {
    const _now = now()
    const remaining = wait - (_now - prev)
    context = this
    args = _args

    if (remaining <= 0) {
      prev = _now
      result = func.apply(context, args)
    } else if (!timerId) {
      timerId = setTimeout(later, remaining)
    }

    return result
  }

  return throttled
}

export default throttle
