import 'normalize-css'
import { default as resources } from './resources'
import * as PIXI from 'pixi.js'

const app = new PIXI.Application(800, 600)
document.body.appendChild(app.view)

const uniforms = {
  colorPalette: null,
  maxIteration: null
}
const filter = new PIXI.Filter(resources['mandelbrotVertex'], resources['mandelbrotFragment'], uniforms)

const square = new PIXI.mesh.Mesh(
  PIXI.Texture.WHITE,
  new Float32Array([
    1, 1, // x, y
    -1, 1, // x, y
    1, -1, // x, y
    -1, -1 // x, y
  ]),
  undefined,
  new Uint16Array([
    0, 1, 2,
    1, 2, 3
  ]),
  PIXI.mesh.Mesh.DRAW_MODES.TRIANGLE_MESH
)

square.position.set(app.screen.width / 2, app.screen.height / 2)
square.scale.set(20)

app.stage.addChild(square)

app.ticker.add(function (delta) {
  square.rotation += 0.01
})
