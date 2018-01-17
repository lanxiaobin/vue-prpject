// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import router from './router/index'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import Vuex from 'vuex'
Vue.prototype.$axios = axios;

Vue.use(Vuex)
Vue.use(iView)
Vue.config.productionTip = false

/* eslint-disable no-new */
let store = new Vuex.Store({
  state:{
    banner:[],
    personalized:[]//推荐歌单
  },
  mutations:{
    changeBanner(state, payload){
      state.banner = payload.banner.data.banners;
    },
    changPersonalized(state, pd) {
      state.personalized = pd.personalized.data.result
    }
  },
  actions:{
    getBannerAction({commit},payload){
      axios.get('/banner')
      .then(function(res){
        commit({
          type:'changeBanner',
          banner:res
        })
       }) 
    },
    getPersonalized({ commit }, pd) {
      axios.get('/personalized')
        .then(function (res) {
          commit({
            type: 'changPersonalized',
            personalized: res
          })
        })
    }
  }
})
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  router,
  components: { App }
})
export default store;