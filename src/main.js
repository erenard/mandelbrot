import 'normalize-css'
import './main.css'
import { default as Animation } from './animation'
import { default as Mandelbrot } from './mandelbrot'
import { default as UserInterface } from './user-interface'
import { default as WebGL } from './web-gl'

/* global window, document, Float32Array */
function init (setup) {
  try {
    const webGL = WebGL(setup)
    const userInterface = UserInterface(setup)
    const model = Mandelbrot(webGL, userInterface)
    const animation = Animation(model.loop)
    userInterface.registerModelComponent(model)
    userInterface.choosePalette('paletteRedYellow')
    animation.start()
  } catch (exception) {
    if (window.console) {
      window.console.error(exception)
    }
    window.alert('Your browser doesn\'t support WebGL.')
  }
}

init({canvasId: 'mycanvas'})
