<template>
    <div>
        <viewport
            :max-iterations="maxIteration"
            :color-palette="colorPalette[0]" />
        <controls
            :max-iteration="maxIteration"
            @increaseIteration="handleIncreaseIteration"
            @decreaseIteration="handleDecreaseIteration"
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
            maxIteration: 64,
            colorPalette: Resources.defaultPalette()
        }
    },
    components: {
        viewport: ViewportVue,
        controls: ControlsVue
    },
    methods: {
        handleIncreaseIteration(value) {
			if(this.maxIteration < 1024) {
                this.maxIteration *= 2
			}
        },
        handleDecreaseIteration(value) {
			if(this.maxIteration > 1) {
                this.maxIteration /= 2
			}
        },
        handleColorPalette(selectedColorPalette) {
			this.colorPalette = selectedColorPalette
        }
    }
}
</script>

<style>

</style>
