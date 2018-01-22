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
        <img v-if="playlist.length" :src="playlist[number].al.picUrl" alt="">
        <img v-else src="123" alt="" style="background-color:rgba(0,0,0,.6)">
      </a>
    </div>
    <div class="Progress">
      <div class="s-name" style="color:#fff; line-height:28px;">
        <span v-if="playlist.length" >{{playlist[number].name}}</span>
        <span v-else style="display:inline-block;height:28px;vertical-align: top; margin-right:10px; color:#666">歌曲：待播放</span>
        <span v-if="playlist.length">{{playlist[number].ar[0].name}}</span>
        <span v-else style="display:inline-block;height:28px;vertical-align: top; margin-right:10px; color:#666">演唱：</span>
        <Icon v-if="playlist.length" type="link" :size="12"></Icon>
      </div>
      <div class="bar" style="width:440px; line-height:10px">
        <Progress class="bg-bar" :percent="w" :stroke-width="9" ref="progress" hide-info></Progress>
      </div>
    </div>
    <div class="oper"></div>
    <div class="flag"></div>
    <audio :src="Surl[number].url" autoplay ref="audio"></audio>
  </div>
</template>
<script>
import "../../style/playRio.css";
export default {
  data(){
    return {
      number:0,
      w:'' * 1,
      oof:false
    }
  },
  computed:{
    Surl(){
      // console.log(this.$store.state.songsUrl)
      if(this.$store.state.songsUrl.length){
        return this.$store.state.songsUrl
      }else{
        return {
            0:{url:'http://m10.music.126.net/20180119015614/79118947d981f9a14bf639f6a70ddd65/ymusic/8414/49ef/4899/ea72c3f419be5bc0686788f1d30bab08.mp3'}
        }
      }
    },
    playlist(){
      this.oof = this.$store.state.off
      return this.$store.state.playList
    },
    type(){
      return this.$store.state.playIcon
    }
  },
  methods:{
    tabPlay:function(){
      if(this.type ==='play'){
        this.$store.state.playIcon = 'pause'
        this.$refs.audio.play()
        this.$store.state.timer = setInterval(()=>{
         this.w = this.$refs.audio.currentTime/this.$refs.audio.duration *100
         if(this.w == 100){this.number++}
        },100)
      }else{
        this.$store.state.playIcon = 'play';
        this.$refs.audio.pause()
        clearTimeout(this.$store.state.timer)
      }
    },
    playNext(){
      this.number++
    },
    playPre(){
      this.number--
    }
  },
  watch:{
    oof:function(){
      this.tabPlay()
    }
  }
}
</script>

