import { default as resources } from './resources'

/* global window, document, Float32Array */

export default function (webGL, userInterface) {
  var vertices = new Float32Array([
    1, 1,
    -1, 1,
    1, -1,
    -1, -1
  ])
  var textureCoords = new Float32Array([
    2.0, 2.0,
    -2.0, 2.0,
    2.0, -2.0,
    -2.0, -2.0
  ])
  var gl = webGL.GL
  var aspect = webGL.canvas.width / webGL.canvas.height
  var scale = 0.1
  var targetScale = 1
  var maxIteration = 64
  var colorTexture = null
  var uniform = {}
  const glColorPalette = function (name) {
    var resource = resources[name]
    if (resource) {
      if (colorTexture !== null) {
        gl.deleteTexture(colorTexture)
      }
      // Load an image to use. Returns a WebGLTexture object
      colorTexture = gl.createTexture()
      webGL.loadTexture2D(colorTexture, resource)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, colorTexture)
      gl.uniform1i(uniform.colorPalette, 0)
    }
  }
  const draw = function () {
    var translateX = 2 * (userInterface.translate.x + userInterface.dragOffset.x)
    var translateY = 2 * (userInterface.translate.y + userInterface.dragOffset.y)
    var aspectScale = scale * aspect
    var minX = (translateX * scale - 2.0) / scale
    var maxX = (translateX * scale + 2.0) / scale
    var minY = (translateY * scale - 2.0) / aspectScale
    var maxY = (translateY * scale + 2.0) / aspectScale
    textureCoords = new Float32Array([
      maxX, maxY,
      minX, maxY,
      maxX, minY,
      minX, minY
    ])
    webGL.setAttribFloatArray('aTexturePosition', textureCoords, 2)
    gl.uniform1i(uniform.maxIteration, maxIteration)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
  const animate = function () {
    scale += (targetScale - scale) / 2
    userInterface.update(maxIteration, scale)
  }
  var lastDraw = new Date()
  var that

  webGL.compileVertexShader(resources['mandelbrotVertex'])
  webGL.compileFragmentShader(resources['mandelbrotFragment'])
  webGL.linkShaders()
  uniform = {
    colorPalette: webGL.getUniformLocation('colorPalette'),
    maxIteration: webGL.getUniformLocation('maxIteration')
  }
  webGL.setAttribFloatArray('aVertexPosition', vertices, 2)
  glColorPalette('paletteRedYellow')
  that = {
    loop: function () {
      var now = new Date()
      while (now - lastDraw > 16) {
        animate()
        lastDraw += 16
      }
      lastDraw = now
      draw()
    },
    increaseIteration: function () {
      maxIteration += maxIteration * 0.1
      maxIteration = Math.min(maxIteration, 1024)
    },
    decreaseIteration: function () {
      maxIteration -= maxIteration * 0.1
      maxIteration = Math.max(maxIteration, 64)
    },
    increaseScale: function () {
      targetScale += targetScale * 0.1
      targetScale = Math.min(targetScale, 65535 * 2)
    },
    decreaseScale: function () {
      targetScale -= targetScale * 0.1
      targetScale = Math.max(targetScale, 0.5)
    },
    glColorPalette: glColorPalette
  }
  userInterface.registerModelComponent(that)
  return that
}
