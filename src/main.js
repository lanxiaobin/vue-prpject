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
    personalized:[],//推荐歌单
    songsUrl:[],
    playList:[],
    playIcon:'play',
    timer:'',
    off:false
  },
  mutations:{
    changeBanner(state, payload){
      state.banner = payload.banner.data.banners;
    },
    changPersonalized(state, pd) {
      state.personalized = pd.personalized.data.result
    },
    changeSongsUrl(state,url){
      state.songsUrl = url.songsUrl.data.data;
      state.playList = url.playList.data.playlist.tracks
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
    },
    getSongs({ commit },songsId,songsUrl){
      axios.get('/playlist/detail?id='+songsId)
      .then(function(playList){
        var songId =[];
        playList.data.playlist.tracks.forEach(function(item,index) {
          songId.push(item.id)
        });
        axios.get('/music/url?id='+songId).then(function(res){
          commit({
            type:'changeSongsUrl',
            songsUrl:res,
            playList
          })
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