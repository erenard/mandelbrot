<template>
    <div id="controls">
		Iterations limit:
		<button @click="decreaseIteration">-</button>
		<span id="maxIteration" style="font-weight: bold">{{ maxIterations }}</span>
		<button @click="increaseIteration">+</button>
		<br/>
		Actual zoom: <strong>x<span id="scale">1</span></strong><br/>
		<img class="colorPalette"
			ref="selectedColorPalette"
			@click="openSelectionPalette"
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
		maxIterations: {
			type: Number,
			default: 1
		},
		colorPalette: {
			type: String,
			default: ''
		}
	},
	computed: {
		palettes: () => Object.entries(Resources.palettes)
	},
	methods: {
		decreaseIteration() {
			this.$emit('maxIterations', this.maxIterations / 2)
		},
		increaseIteration() {
			this.$emit('maxIterations', this.maxIterations * 2)
		},
		openSelectionPalette() {
			this.$refs.selectionPalette.style.display = ''
		},
		selectColorPalette(selectedColorPalette) {
			this.$refs.selectionPalette.style.display = 'none'
			this.$refs.selectedColorPalette.src = '/' + selectedColorPalette[1]
			this.$emit('colorPalette', selectedColorPalette[0])
		}
	},
	mounted() {
		this.$refs.selectedColorPalette.src = Resources.palettes[this.colorPalette]
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
