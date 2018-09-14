import 'normalize-css'
import { default as Resources } from './resources'
import * as PIXI from 'pixi.js'

const app = new PIXI.Application(640, 480)
document.body.appendChild(app.view)

var geometry = new PIXI.Geometry()
  .addAttribute('aVertexPosition', // the attribute name
    [
      -100, -100, // x, y
      100, -100, // x, y
      100, 100,
      -100, 100 // x, y
    ],
    2) // the size of the attribute
  .addAttribute('aUvs', // the attribute name
    [
      0, 0, // u, v
      1, 0, // u, v
      1, 1,
      0, 1
    ], // u, v
    2) // the size of the attribute
  .addIndex([0, 1, 2, 0, 2, 3])
  .interleave()

var shader = PIXI.Shader.from(`

    precision mediump float;

    attribute vec2 aVertexPosition;
    attribute vec2 aUvs;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    varying vec2 vUvs;

    void main() {

        vUvs = aUvs;
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    }`,

`precision mediump float;

    varying vec2 vUvs;

    uniform sampler2D uSampler2;

    void main() {

        gl_FragColor = texture2D(uSampler2, vUvs );
    }

`,
{
  uSampler2: PIXI.Texture.from(Resources['paletteHue'])
})

const square = new PIXI.Mesh(geometry, shader)

square.position.set(app.screen.width / 2, app.screen.height / 2)
square.scale.set(2)

app.stage.addChild(square)

app.ticker.add(function (delta) {
  square.rotation += 0.01
})
