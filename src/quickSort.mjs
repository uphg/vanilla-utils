// 快速排序
function quickSort(array) {
  if (array.length <= 1) return array

  let pivotIndex = Math.floor(array.length / 2)
  let pivot = array.splice(pivotIndex, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    if (item < pivot) {
      left.push(item)
    } else {
      right.push(item)
    }
  }

  return quickSort(left).concat([pivot], quickSort(right))
}