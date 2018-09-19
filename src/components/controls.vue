<template>
    	<div id="controls">
		Iterations limit:
		<button id="decreaseIteration">-</button>
		<span id="maxIteration" style="font-weight: bold">{{maxIterations}}</span>
		<button id="increaseIteration">+</button>
		<br/>
		Actual zoom: <strong>x<span id="scale">1</span></strong><br/>
		<div id="selectionPalette" style="display: none;">
			<div class="colorPalette" id="paletteBlueYellow"></div>
			<div class="colorPalette" id="paletteFrequency"></div>
			<div class="colorPalette" id="paletteHue"></div>
			<div class="colorPalette" id="paletteRedGreen"></div>
			<div class="colorPalette" id="paletteRedYellow"></div>
			<div class="colorPalette" id="paletteWavelength"></div>
		</div>
		<img class="colorPalette"
			id="selectedPalette"
			style="border: solid 2px white;" />
	</div>

</template>

<script>
export default {
	data() {
		return {
			maxIterations: {
				type: Number,
				default: 64
			},
			colorPalette: {
				type: String,
				default: ''
			}
		}
	}

}
</script>

<style>

</style>
