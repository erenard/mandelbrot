import paletteBlueYellow from './paletteBlueYellow.png'
import paletteFrequency from './paletteFrequency.png'
import paletteHue from './paletteHue.png'
import paletteRedGreen from './paletteRedGreen.png'
import paletteRedYellow from './paletteRedYellow.png'
import paletteWavelength from './paletteWavelength.png'
import mandelbrotVertex from './mandelbrotVertex.glsl'
import mandelbrotFragment from './mandelbrotFragment.glsl'

const datas = {
  paletteBlueYellow,
  paletteFrequency,
  paletteHue,
  paletteRedGreen,
  paletteRedYellow,
  paletteWavelength,
  mandelbrotVertex,
  mandelbrotFragment,
  addTexturesToLoader: loader => {
    Object.entries(datas).forEach(entry => {
      if (typeof entry[1] !== 'function') {
        loader.add(entry[0], entry[1])
      }
    })
  }
}

export default datas
