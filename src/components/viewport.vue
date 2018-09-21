<template>
  	<div ref="viewport"></div>
</template>

<script>
import * as PIXI from 'pixi.js'
import Viewport from 'pixi-viewport'

import { application, initializeApplication } from '../application'
import mandelbrot from '../mandelbrot'
import Resources from '../resources'

const viewportSideDimension = 500

export default {
    data() {
        return {
            app: {},
            shader: {}
        }
    },
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
        maxIterations(value) {
            this.shader.uniforms.maxIteration = value
        },
        colorPalette(value) {
            const texture = PIXI.Texture.from(this.app.loader.resources[value].data)
            this.shader.uniforms.colorPalette = texture
        },
    },
    mounted() {
        initializeApplication(viewportSideDimension, this.$refs.viewport).then(app => {
        this.app = app
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

        const geometry = mandelbrot.geometry(0, viewportSideDimension)
        const texture = PIXI.Texture.from(app.loader.resources.paletteHue.data)
        this.shader = mandelbrot.shader(texture)
        const square = new PIXI.Mesh(geometry, this.shader)
        viewport.addChild(square)
        })
    }
}
</script>

<style scoped>
div {
    width: 100%;
    height: 100%;
}
</style>
