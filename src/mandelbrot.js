import * as PIXI from 'pixi.js'
import Resources from './resources'

export default {
  geometry (min, max) {
    const geometry = new PIXI.Geometry()
      .addAttribute('aVertexPosition', // the attribute name
        [
          min, min, // x, y
          max, min, // x, y
          max, max,
          min, max // x, y
        ],
        2) // the size of the attribute
      .addAttribute('aTexturePosition', // the attribute name
        [
          -2, -2,
          2, -2,
          2, 2,
          -2, 2
        ],
        2) // the size of the attribute
      .addIndex([0, 1, 2, 0, 2, 3])
      .interleave()

    return geometry
  },
  shader (texture) {
    return PIXI.Shader
      .from(
        Resources.shaders.mandelbrotVertex,
        Resources.shaders.mandelbrotFragment,
        {
          colorPalette: texture,
          maxIteration: 64
        })
  }
}
