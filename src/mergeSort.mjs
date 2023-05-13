// 归并排序
function mergeSort(array) {
  let length = array.length
  if (length <= 1) return array
  const middleIndex = Math.floor(length / 2)
  let left = array.slice(0, middleIndex)
  let right = array.slice(middleIndex)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(a, b) {
  if (a.length === 0) return b
  if (b.length === 0) return a
  return a[0] > b[0] ? [b[0], ...merge(a, b.slice(1))] : [a[0], ...merge(a.slice(1), b)]
}