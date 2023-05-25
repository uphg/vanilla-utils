// 选择排序
function selectionSort(array) {
  let index = -1
  const length = array.length - 1
  while (++index < length) {
    const minIndex = findMinIndex(array.slice(index)) + index
    if (index !== minIndex) {
      const temp = array[index]
      array[index] = array[minIndex]
      array[minIndex] = temp
    }
  }

  return array
}

function findMinIndex(array) {
  let index = 0
  let minIndex = 0
  const length = array.length
  while (++index < length) {
    if (array[index] < array[minIndex]) {
      minIndex = index
    }
  }

  return minIndex
}