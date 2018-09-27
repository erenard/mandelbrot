<template>
  <div>
    <viewport
      :max-iterations="maxIteration"
      :color-palette="colorPalette[0]"
      @zoomed="handleZoomed"/>
    <controls
      :max-iteration="maxIteration"
      :color-palette="colorPalette"
      :zoom="zoom"
      @increaseIteration="handleIncreaseIteration"
      @decreaseIteration="handleDecreaseIteration"
      @colorPalette="handleColorPalette" />
  </div>
</template>

<script>
import ControlsVue from './controls.vue'
import ViewportVue from './viewport.vue'
import Resources from '../resources'

export default {
  components: {
    viewport: ViewportVue,
    controls: ControlsVue
  },
  data () {
    return {
      maxIteration: 64,
      colorPalette: Resources.defaultPalette(),
      zoom: 1
    }
  },
  methods: {
    handleIncreaseIteration (value) {
      if (this.maxIteration < 1024) {
        this.maxIteration *= 2
      }
    },
    handleDecreaseIteration (value) {
      if (this.maxIteration > 1) {
        this.maxIteration /= 2
      }
    },
    handleColorPalette (selectedColorPalette) {
      this.colorPalette = selectedColorPalette
    },
    handleZoomed (value) {
      this.zoom = value
    }
  }
}
</script>

<style>
html, body {
    background-color: black;
    color: white;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>
