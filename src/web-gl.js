export default function (setup) {
  const canvas = document.getElementById(setup.canvasId)
  var gl // Graphical Library

  if (canvas !== null) {
    try {
      gl = canvas.getContext('webgl')
    } catch (ex) {}
    if (gl === null) {
      try {
        gl = canvas.getContext('experimental-webgl')
      } catch (ex) {}
    }
  }
  if (gl === null) {
    alert("Your browser doesn't support WebGL.")
    return null
  }
  // Vertex Shader
  const vs = gl.createShader(gl.VERTEX_SHADER)
  // Fragment Shader
  const fs = gl.createShader(gl.FRAGMENT_SHADER)
  // OpenGL Program
  const program = gl.createProgram()
  // OpenGL Texture Configuration
  const TEXTURE_FILTER = gl.LINEAR
  const createBuffer = function (array) {
    var buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW)
    return buffer
  }
  const getAttribLocation = function (attrib) {
    return gl.getAttribLocation(program, attrib)
  }

  gl.viewport(0, 0, canvas.width, canvas.height)
  gl.clearColor(0, 0, 0, 1)

  return {
    GL: gl,
    canvas: {
      width: canvas.width,
      height: canvas.height
    },
    compileVertexShader: function (sourceCode) {
      gl.shaderSource(vs, sourceCode)
      gl.compileShader(vs)
      if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        window.console.error(gl.getShaderInfoLog(vs))
      }
    },
    compileFragmentShader: function (sourceCode) {
      gl.shaderSource(fs, sourceCode)
      gl.compileShader(fs)
      if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        window.console.error(gl.getShaderInfoLog(fs))
      }
    },
    linkShaders: function () {
      gl.attachShader(program, vs)
      gl.attachShader(program, fs)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        window.console.error(gl.getProgramInfoLog(program))
      } else {
        gl.useProgram(program)
      }
    },
    getUniformLocation: function (uniform) {
      var location = gl.getUniformLocation(program, uniform)
      if (location && location !== -1) {
        return location
      } else {
        throw new Error(`UniformLocation of ${uniform} not found`)
      }
    },
    setAttribFloatArray: function (attrib, array, itemSize) {
      createBuffer(array)
      var location = getAttribLocation(attrib)
      if (location !== -1) {
        gl.enableVertexAttribArray(location)
        gl.vertexAttribPointer(location, itemSize, gl.FLOAT, false, 0, 0)
      } else {
        throw new Error(`AttribLocation of ${attrib} not found`)
      }
    },
    loadTexture2D: function (texture, imageBase64) {
      const image = new Image()
      image.src = imageBase64
      console.log(image, imageBase64)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, TEXTURE_FILTER)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, TEXTURE_FILTER)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
    }
  }
}
