<template>
    <div>
        <viewport />
        <controls />
    </div>
</template>

<script>
import ControlsVue from './controls.vue'
import ViewportVue from "./viewport.vue";

import * as PIXI from 'pixi.js'
import Viewport from 'pixi-viewport'

import { application, initializeApplication } from '../application'
import mandelbrot from '../mandelbrot'

const viewportSideDimension = 500

export default {
    components: {
        viewport: ViewportVue,
        controls: ControlsVue
    },
    mounted() {
        initializeApplication(viewportSideDimension).then(app => {
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
        const shader = mandelbrot.shader(texture)
        const square = new PIXI.Mesh(geometry, shader)
        viewport.addChild(square)
        })
    }
}
</script>

<style>

</style>
