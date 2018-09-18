import 'normalize-css'
import Resources from './resources'
import * as PIXI from 'pixi.js'
import Viewport from 'pixi-viewport'

const viewportSideDimension = 640

function createMandelbrotQuad (min, max) {
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
}

new Promise(resolve => {
  const app = new PIXI.Application(viewportSideDimension, viewportSideDimension)
  document.body.appendChild(app.view)
  Resources.addResourcesToLoader(app.loader)
  app.loader.load(resolve(app))
}).then(app => {
  const viewport = new Viewport({
    screenWidth: app.screen.width,
    screenHeight: app.screen.height,
    worldWidth: viewportSideDimension,
    worldHeight: viewportSideDimension
  })
  viewport.drag().pinch()
    .wheel()
    .decelerate()

  app.stage.addChild(viewport)

  const geometry = createMandelbrotQuad(0, viewportSideDimension)
  const texture = PIXI.Texture.from(app.loader.resources.paletteHue.data)
  const shader = PIXI.Shader
    .from(
      Resources.shaders.mandelbrotVertex,
      Resources.shaders.mandelbrotFragment,
      {
        colorPalette: texture,
        maxIteration: 64
      })
  const square = new PIXI.Mesh(geometry, shader)
  viewport.addChild(square)
})
