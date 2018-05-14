import './main.css'
import { default as Animation } from './animation'
import { default as Mandelbrot } from './mandelbrot'
import { default as UserInterface } from './user-interface'
import { default as WebGL } from './web-gl'

/* global window, document, Float32Array */
function init (setup) {
  try {
    var userInterface = UserInterface(setup)
    var webGL = WebGL(setup)
    var model = Mandelbrot(webGL, userInterface)
    var animation = Animation(model.loop)
    animation.start()
  } catch (exception) {
    if (window.console) {
      window.console.error(exception)
    }
    window.alert('Your browser doesn\'t support WebGL.')
  }
}

init({canvasId: 'mycanvas'})
