import 'normalize-css'
import { default as Resources } from './resources'
import * as PIXI from 'pixi.js'

new Promise(resolve => {
  const app = new PIXI.Application(640, 640)
  document.body.appendChild(app.view)
  Resources.addTexturesToLoader(app.loader)
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
    .addAttribute('aUvs', // the attribute name
      [
        -2, -2,
        2, -2,
        2, 2,
        -2, 2
      ],
      2) // the size of the attribute
    .addIndex([0, 1, 2, 0, 2, 3])
    .interleave()

  const shader = PIXI.Shader.from(
    `
    precision mediump float;

    attribute vec2 aVertexPosition;
    attribute vec2 aUvs;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    varying vec2 v_TextureCoord;

    void main() {
      v_TextureCoord = aUvs;
      gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    }
    `,
    `
    uniform int maxIteration;
    uniform sampler2D colorPalette;

    varying vec2 v_TextureCoord;

    const int loopLimit = 1024;

    void main() {
      vec2 c = v_TextureCoord;
      vec2 z = v_TextureCoord;
      int iteration = 0;
      for(int i = 0; i < loopLimit; i++) {
        float x = (z.x * z.x - z.y * z.y) + c.x;
        float y = (z.y * z.x + z.x * z.y) + c.y;
        if((x * x + y * y) > 4.0 || iteration == maxIteration) break;
        z.x = x;
        z.y = y;
        iteration++;
      }
      gl_FragColor = (iteration == maxIteration ? vec4(0.0, 0.0, 0.0, 1.0) : texture2D(colorPalette, vec2(float(iteration)) / float(maxIteration), 0.0));
    }
    `,
    {
      colorPalette: texture,
      maxIteration: 64
    })

  const square = new PIXI.Mesh(geometry, shader)
  square.position.set(app.screen.width / 2, app.screen.height / 2)
  app.stage.addChild(square)
  square.scale.set(3)
  /*
  app.ticker.add(function (delta) {
    square.rotation += 0.01
  })
  */
})
