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
    B_Bill: [],
    Y_Bill: [],
    N_Bill: [],
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
    },
    changeB_Bill(state, B_Bill){
      state.B_Bill = B_Bill.B_Bill.data.playlist
    },
    changeY_Bill(state, Y_Bill) {
      state.Y_Bill = Y_Bill.Y_Bill.data.playlist
    },
    changeN_Bill(state, N_Bill) {
      state.N_Bill = N_Bill.N_Bill.data.playlist
    }
  },
  actions:{
    //获取banner
    getBannerAction({commit},payload){
      axios.get('/banner')
      .then(function(res){
        commit({
          type:'changeBanner',
          banner:res
        })
       }) 
    },
    //获取 歌单
    getPersonalized({ commit }, pd) {
      axios.get('/personalized')
      .then(function (res) {
        commit({
          type: 'changPersonalized',
          personalized: res
        })
      })
    },
    //获取歌曲url
    getSongs({ commit }, songsId, songsUrl){
      let { id, subId } = songsId;
      if (typeof subId == 'undefined'){
          //通过歌单ID获取歌曲列表
        axios.get('/playlist/detail?id=' + id).then(function(playList){
          var songId = [];
          playList.data.playlist.tracks.forEach((item,index) => {
            songId[index]= item.id;
          });
          //获取到歌曲的列表后 在通过 歌曲id 获取歌曲地址
          axios.get('/music/url?id='+ songId).then(function(res){
            commit({
              type:'changeSongsUrl',
              songsUrl:res,
              playList
            })
          })
        })
      }
      else{
        axios.get('/playlist/detail?id=' + id).then(function (playList) {
          //获取到歌曲的列表后 在通过 歌曲id 获取歌曲地址
          axios.get('/music/url?id=' + subId).then(function (res) {
            // console.log(playList, res)
            commit({
              type: 'changeSongsUrl',
              songsUrl: res,
              playList
            })
          })
        })
      }
    },
    //获取榜单列表
    getB_Bill({commit},B_Bill){
      axios.get('/top/list?idx=3').then(function (res) {
        commit({
          type:'changeB_Bill',
          B_Bill:res
        })
      })
    },
    getY_Bill({ commit }, Y_Bill) {
      axios.get('/top/list?idx=0').then(function (res) {
        commit({
          type: 'changeY_Bill',
          Y_Bill: res
        })
      })
    },
    getN_Bill({ commit }, N_Bill) {
      axios.get('/top/list?idx=2').then(function (res) {
        commit({
          type: 'changeN_Bill',
          N_Bill: res
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

