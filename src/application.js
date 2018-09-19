import Resources from './resources'
import * as PIXI from 'pixi.js'

let application

export function initializeApplication (dimension) {
  application = new PIXI.Application(dimension, dimension)
  document.body.appendChild(application.view)
  Resources.addResourcesToLoader(application.loader)
  return new Promise(resolve => {
    application.loader.load(resolve(application))
  })
}

export default application
