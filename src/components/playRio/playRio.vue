<template>
  <div class="midl">
    <div class="btns">
      <span @click="playPre">
        <Icon class="btn br-song" ref="a" type="arrow-left-b"></Icon>
      </span>
      <span @click.prevent="tabPlay"> 
        <Icon class="btn player" ref="player" :type="type" ></Icon>
      </span>
      <span @click="playNext">
       <Icon class="btn ne-song" ref="b" type="arrow-right-b" ></Icon>
      </span> 
    </div>
    
    <div class="head">
      <a href="javascript:;">
        <img :src="playlist[number].al.picUrl" alt="">
      </a>
    </div>
    <div class="Progress">
      <div class="s-name" style="color:#fff; line-height:28px;">
        <span style="display:inline-block;height:28px;vertical-align: top">{{playlist[number].name}}</span>
        <span>{{playlist[number].ar[0].name}}</span>
        <Icon v-if="playlist.length" type="link" :size="12"></Icon>
      </div>
      <div class="bar" style="width:440px; line-height:10px">
        <Progress class="bg-bar" :percent="w" :stroke-width="9" ref="progress" hide-info></Progress>
      </div>
    </div>
    <div class="oper"></div>
    <div class="flag"></div>
    <audio :src="Surl[number].url" ref="audio"></audio>
  </div>
</template>
<script>
import "../../style/playRio.css";
export default {
  data(){
    return {
      number:0,
      timer:'',
      w:'' * 1
    }
  },
  computed:{
    Surl(){
      if(this.$store.state.songsUrl.length){
        return this.$store.state.songsUrl
      }else{
        return {
            0:{url:'http://m10.music.126.net/20180119015614/79118947d981f9a14bf639f6a70ddd65/ymusic/8414/49ef/4899/ea72c3f419be5bc0686788f1d30bab08.mp3'}
        }
      }
    },
    playlist(){
      if(this.$store.state.playList.length){
        return this.$store.state.playList
      }else{
        return {
          0:{
            al:{picUrl:''},
            name:'',
            ar:{
              0:{name:''}
            }
          }
        }
      }
    },
    type(){
      return this.$store.state.playIcon
    }
  },
  methods:{
    tabPlay:function(){
      let proWith;
      if(this.type ==='play'){
        this.$store.state.playIcon = 'pause'
        this.$refs.audio.play()
        this.timer = setInterval(()=>{
         proWith = this.$refs.audio.currentTime/this.$refs.audio.duration *100
         //this.$refs.progress.percent
         this.w = proWith
         if(this.w == 100){this.number++}
        },100)
      }else{
        this.$store.state.playIcon = 'play';
        this.$refs.audio.pause()
        clearTimeout(this.timer)
      }
    },
    playNext(){
      this.number++
    },
    playPre(){
      this.number--
    }
  },
  created(){
    this.$store.dispatch('getSongs',880743872)
  }
}
</script>

