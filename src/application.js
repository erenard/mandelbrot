import Vue from 'vue'
import ApplicationComponent from 'components/application.vue'
import 'normalize-css'

import Resources from './resources'
import * as PIXI from 'pixi.js'

let vueVM

const application = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  autoResize: true,
  resolution: devicePixelRatio
})

Resources.addResourcesToLoader(application.loader)

application.loader.load(() => {
  vueVM = new Vue({
    el: '#app',
    components: {
      'application': ApplicationComponent
    }
  })
})

export default application
