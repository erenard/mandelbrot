<template>
    <div>
        <viewport
            :max-iterations="maxIterations"
            :color-palette="colorPalette" />
        <controls
            :max-iterations="maxIterations"
            @maxIterations="handleMaxIterations"
            :color-palette="colorPalette"
            @colorPalette="handleColorPalette" />
    </div>
</template>

<script>
import ControlsVue from './controls.vue'
import ViewportVue from './viewport.vue'
import Resources from '../resources'

export default {
    data() {
        return {
            maxIterations: 64,
            colorPalette: 'paletteHue'
        }
    },
    components: {
        viewport: ViewportVue,
        controls: ControlsVue
    },
    methods: {
        handleMaxIterations(value) {
            this.maxIterations = value
        },
        handleColorPalette(value) {
            this.colorPalette = value
        }
    }
}
</script>

<style>

</style>
