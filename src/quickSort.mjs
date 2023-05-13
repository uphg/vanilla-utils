// 快速排序
function quickSort(array) {
  if (array.length <= 1) return array

  let pivotIndex = Math.floor(array.length / 2)
  let pivot = array.splice(pivotIndex, 1)[0]
  let left = []
  let right = []
  let same = [pivot]
  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    if (item < pivot) {
      left.push(item)
    } else if (item > pivot) {
      right.push(item)
    } else {
      same.push(item)
    }
  }

  return quickSort(left).concat(same, quickSort(right))
}