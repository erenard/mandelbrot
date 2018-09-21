import paletteBlueYellow from './paletteBlueYellow.png'
import paletteFrequency from './paletteFrequency.png'
import paletteHue from './paletteHue.png'
import paletteRedGreen from './paletteRedGreen.png'
import paletteRedYellow from './paletteRedYellow.png'
import paletteWavelength from './paletteWavelength.png'
import mandelbrotVertex from './mandelbrotVertex.glsl'
import mandelbrotFragment from './mandelbrotFragment.glsl'

const datas = {
  palettes: {
    paletteBlueYellow,
    paletteFrequency,
    paletteHue,
    paletteRedGreen,
    paletteRedYellow,
    paletteWavelength
  },
  shaders: {
    mandelbrotVertex,
    mandelbrotFragment
  },
  addResourcesToLoader: loader => {
    Object.entries(datas.palettes).forEach(entry => {
      loader.add(entry[0], entry[1])
    })
  },
  defaultPalette: () => ['paletteHue', paletteHue]
}

export default datas
