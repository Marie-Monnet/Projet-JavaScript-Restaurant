import Vue from 'vue'
import App from './App.vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'

import Accueil from './components/Accueil.vue'
import ListeDesRestaurants from './components/ListeDesRestaurants.vue'
import Restaurant from './components/Restaurant.vue'
import nouveauRestaurant from './components/nouveauRestaurant.vue'

import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import * as VueGoogleMaps from 'vue2-google-maps'
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBEUUdKJvaKidqjJRS2RpTeB74EQf2dEsI',
    libraries: 'places', 
  }
})

Vue.config.productionTip = false
Vue.use(VueMaterial) 
Vue.use(VueRouter)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)

//on définit des routes
const router = new VueRouter ({
  routes: [
    {
      path: '/',
      component: Accueil
    },
    {
      path: '/restaurant/:r',
      component: Restaurant
    },
    {
      path: '/nouveauRestaurant',
      component: nouveauRestaurant
    },
    {
      path: '/ListeDesRestaurants',
      component: ListeDesRestaurants
    },
  ],
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
