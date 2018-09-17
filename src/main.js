import 'normalize-css'
import { default as Resources } from './resources'
import * as PIXI from 'pixi.js'

new Promise(resolve => {
  const app = new PIXI.Application(640, 640)
  document.body.appendChild(app.view)
  Resources.addResourcesToLoader(app.loader)
  app.loader.load(resolve(app))
}).then(app => {
  const texture = PIXI.Texture.from(app.loader.resources.paletteHue.data)
  const geometry = new PIXI.Geometry()
    .addAttribute('aVertexPosition', // the attribute name
      [
        -100, -100, // x, y
        100, -100, // x, y
        100, 100,
        -100, 100 // x, y
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

  const shader = PIXI.Shader
    .from(
      Resources.shaders.mandelbrotVertex,
      Resources.shaders.mandelbrotFragment,
      {
        colorPalette: texture,
        maxIteration: 64
      })

  const square = new PIXI.Mesh(geometry, shader)
  square.position.set(app.screen.width / 2, app.screen.height / 2)
  app.stage.addChild(square)
  square.scale.set(2)
  app.ticker.add(function (delta) {
    //    square.rotation += 0.01
  })
})
