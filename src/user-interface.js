
const maxIterationElement = document.getElementById('maxIteration')
const scaleElement = document.getElementById('scale')
const increaseIterationButton = document.getElementById('increaseIteration')
const decreaseIterationButton = document.getElementById('decreaseIteration')
const selectedPaletteButton = document.getElementById('selectedPalette')
const selectionPaletteElement = document.getElementById('selectionPalette')

export default function (setup) {
  var dragStart = {x: null, y: null}
  var dragOffset = {x: 0, y: 0}
  var translate = {x: 0, y: 0}
  var scale = 0.1
  var canvasElement = document.getElementById(setup.canvasId)
  var modelComponent = null
  const chooseColor = function (event) {
    const resourceName = event.target.getAttribute('id')
    selectionPaletteElement.style.display = 'none'
    selectedPaletteButton.style.backgroundImage = event.target.style.backgroundImage
    if (modelComponent !== null) {
      modelComponent.glColorPalette(resourceName)
    }
  }
  const mouseWheelHandler = function (event) {
    var wheel
    event.stopPropagation()
    // event.preventDefault();
    if (modelComponent !== null) {
      wheel = event.detail ? -1 * event.detail : event.wheelDelta / 40
      if (wheel > 0) {
        modelComponent.increaseScale()
      } else {
        modelComponent.decreaseScale()
      }
    }
    return false
  }
  // Color palette selection initialisation
  selectionPaletteElement.style.display = 'none'
  // Color palette selection event handlers
  selectedPaletteButton.addEventListener('click', function () {
    if (selectionPaletteElement.style.display === 'none') {
      selectionPaletteElement.style.display = ''
    } else {
      selectionPaletteElement.style.display = 'none'
    }
  })
  selectionPaletteElement.childNodes.forEach(childNode => {
    if (childNode.nodeType === 1 && childNode.className === 'colorPalette') {
      childNode.addEventListener('click', chooseColor)
    }
  })
  // Increase/decrease maximum iteration event handlers
  increaseIterationButton.addEventListener('click', function () {
    if (modelComponent !== null) {
      modelComponent.increaseIteration()
    }
  })
  decreaseIterationButton.addEventListener('click', function () {
    if (modelComponent !== null) {
      modelComponent.decreaseIteration()
    }
  })
  // Mouse events handlers
  canvasElement.addEventListener('DOMMouseScroll', mouseWheelHandler)
  canvasElement.addEventListener('mousewheel', mouseWheelHandler)

  canvasElement.addEventListener('mousedown', function (event) {
    event.stopPropagation()
    dragStart.x = event.clientX
    dragStart.y = event.clientY
    dragOffset.x = 0.0
    dragOffset.y = 0.0
  })
  canvasElement.addEventListener('mouseup', function (event) {
    event.stopPropagation()
    dragStart.x = null
    dragStart.y = null
    translate.x += dragOffset.x
    translate.y += dragOffset.y
    dragOffset.x = 0
    dragOffset.y = 0
  })
  canvasElement.addEventListener('mousemove', function (event) {
    var moveX, moveY
    event.stopPropagation()
    if (dragStart.x !== null) {
      moveX = dragStart.x - event.clientX
      moveY = dragStart.y - event.clientY
      dragOffset.x = (2 / scale) * (moveX / canvasElement.width)
      dragOffset.y = (-2 / scale) * (moveY / canvasElement.height)
    }
  })
  return {
    registerModelComponent: function (value) {
      modelComponent = value
    },
    update: function (maxIteration, modelScale) {
      scale = modelScale
      maxIterationElement.innerHTML = Math.floor(maxIteration)
      scaleElement.innerHTML = scale >= 10 ? Math.floor(scale) : Math.round(scale * 100) / 100
    },
    dragOffset: dragOffset,
    translate: translate
  }
}
