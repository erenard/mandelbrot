<template>
  <div ref="viewport"></div>
</template>

<script>
import * as PIXI from 'pixi.js'
import Viewport from 'pixi-viewport'
import debounce from 'tiny-debounce'

import application from '../application'
import Mandelbrot from '../mandelbrot'
import Resources from '../resources'

const worldSide = 500
var shader, viewport

export default {
  props: {
    maxIterations: {
      type: Number,
      default: 1
    },
    colorPalette: {
      type: String,
      default: Resources.defaultPalette()[0]
    }
  },
  watch: {
    maxIterations (value) {
      shader.uniforms.maxIteration = value
    },
    colorPalette (value) {
      const texture = PIXI.Texture.from(application.loader.resources[value].data)
      shader.uniforms.colorPalette = texture
    }
  },
  methods: {
    handleZoomed () {
      this.$emit('zoomed', viewport.screenWorldHeight / viewport.worldHeight)
    },
    handleResize (event) {
      const center = viewport.center
      application.renderer.resize(window.innerWidth, window.innerHeight)
      viewport.screenWidth = application.screen.width
      viewport.screenHeight = application.screen.height
      viewport.center = center
      this.handleZoomed()
      // viewport.fit(true, window.innerWidth, window.innerHeight)
      // You can use the 'screen' property as the renderer visible
      // area, this is more useful than view.width/height because
      // it handles resolution
      // rect.position.set(pixiApplication.screen.width, pixiApplication.screen.height)
    }
  },
  mounted () {
    this.$refs.viewport.appendChild(application.view)
    window.addEventListener('resize', debounce(this.handleResize, 20))
    viewport = new Viewport({
      screenWidth: application.screen.width,
      screenHeight: application.screen.height,
      worldWidth: worldSide,
      worldHeight: worldSide
    })
    viewport
      .drag()
      .pinch()
      .wheel()
      .decelerate()

    viewport.on('zoomed', this.handleZoomed)

    application.stage.addChild(viewport)

    shader = Mandelbrot.shader(PIXI.Texture.from(application.loader.resources.paletteHue.data))
    viewport.addChild(
      new PIXI.Mesh(
        Mandelbrot.geometry(worldSide / -2, worldSide / 2),
        shader
      )
    )

    viewport.center = new PIXI.Point(0, 0)
    viewport.fitWorld(true)

    this.handleZoomed()
  }
}
</script>

<style>
canvas {
    display:block;
}

div#viewport {
    width: 100%;
    height: 100%;
}
</style>
