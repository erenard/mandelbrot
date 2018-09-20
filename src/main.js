import Vue from 'vue'
import Application from 'components/application.vue'
import 'normalize-css'
import './main.css'

const vueApplication = new Vue({
  el: '#app',
  components: {
    Application
  }
})
