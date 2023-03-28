function nextTick(fn) {
  let textNode = document.createTextNode('')
  const observer = new MutationObserver(() => {
    fn()
    observer.disconnect()
    textNode = null
  })
  observer.observe(textNode, {
    characterData: true
  })
  textNode.data = '0'
}

export default process ? process.nextTick : nextTick
