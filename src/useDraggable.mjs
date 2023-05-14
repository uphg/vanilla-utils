function useDraggable(el) {
  let pressedDelta = null

  el.addEventListener('pointerdown', (e) => {
    const rect = el.getBoundingClientRect()
    pressedDelta = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  })

  document.addEventListener('pointermove', (e) => {
    if (!pressedDelta) return

    el.style.top = `${e.clientY - pressedDelta.y}px`
    el.style.left = `${e.clientX - pressedDelta.x}px`
  })

  document.addEventListener('pointerup', () => {
    pressedDelta = null
  })
}

export default useDraggable