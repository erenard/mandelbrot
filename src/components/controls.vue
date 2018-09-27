<template>
    <div id="controls">
		Iterations limit:
		<button @click="decreaseIteration">-</button>
		<span style="font-weight: bold">{{ maxIteration }}</span>
		<button @click="increaseIteration">+</button>
		<br/>
		Actual zoom: <strong>x<span>{{ zoom | precisionDigits }}</span></strong><br/>
		<img class="colorPalette"
			ref="selectedColorPalette"
			@click="openSelectionPalette"
			:src="colorPalette[1]"
			style="border: solid 2px white;" />
		<div ref="selectionPalette" style="display: none;">
			<img class="colorPalette"
				v-for="palette in palettes"
				:key="palette[0]"
				@click="selectColorPalette(palette)"
				:src="palette[1]" />
		</div>
	</div>
</template>

<script>
import Resources from '../resources'

export default {
	props: {
		maxIteration: {
			type: Number,
			default: 1
		},
		colorPalette: {
			type: Array,
			default: Resources.defaultPalette
		},
		zoom: {
			type: Number,
			default: 1
		}
	},
	computed: {
		palettes: () => Object.entries(Resources.palettes)
	},
	filters: {
		precisionDigits(value) {
			return Math.round(value * 1000) / 1000
		}
	},
	methods: {
		decreaseIteration() {
			this.$emit('decreaseIteration')
		},
		increaseIteration() {
			this.$emit('increaseIteration')
		},
		openSelectionPalette() {
			this.$refs.selectionPalette.style.display = ''
		},
		selectColorPalette(selectedColorPalette) {
			this.$refs.selectionPalette.style.display = 'none'
			this.$emit('colorPalette', selectedColorPalette)
		}
	}
}
</script>

<style>
#controls {
    position: absolute;
    top: 15px;
	left: 15px;
	color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
	border: solid 1px white;
	width: 260px;
}

.colorPalette {
    width: 256px;
    height: 16px;
    cursor: pointer;
}

#selectionPalette {
    position: absolute;
}
</style>
