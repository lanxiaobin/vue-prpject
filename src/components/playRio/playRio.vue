<template>
  <div class="midl">
    <div class="btns">
      <span @click="playPre">
        <Icon class="btn br-song" ref="a" type="arrow-left-b"></Icon>
      </span>
      <span @click.stop="tabPlay"> 
        <Icon class="btn player" ref="player" :type="type" ></Icon>
      </span>
      <span @click="playNext">
       <Icon class="btn ne-song" ref="b" type="arrow-right-b" ></Icon>
      </span> 
    </div>
    
    <div class="head">
      <a href="javascript:;">
        <img v-if="playlist[number]" :src="playlist[number].al.picUrl" alt="">
        <img v-else src="" alt="" style="background-color:rgba(0,0,0,.6)">
      </a>
    </div>
    <div class="Progress">
      <div class="s-name" style="color:#e8e8e8; line-height:28px">
        <span  v-if="playlist.length">{{playlist[number].name}}</span>
        <span v-else style="display:inline-block;height:28px;vertical-align: top; margin-right:10px; color:#666">歌曲：待播放</span>
        <span class="sing-name" v-if="playlist.length">{{playlist[number].ar[0].name}}</span>
        <span v-else style="display:inline-block;height:28px;vertical-align: top; margin-right:10px; color:#666">演唱：</span>
        <a href="javascript:;"><Icon class="link" v-if="playlist.length" type="link" :size="15" color="#AFA9A9"></Icon></a>
      </div>
      <div class="bar" style="width:440px; line-height:10px" ref="bar" @mousedown="setCurTime" @mouseup="removeAdd">
        <Progress class="bg-bar" :percent="w" :stroke-width="8" ref="progress" hide-info ></Progress>
      </div>
    </div>
    <div class="oper">
      <span style="color:#a1a1a1;">{{curMin +':' + curSeconds}}</span>
      <span style="color:#797979;">/ {{durationMin + ':' + durationSe}}</span>
    </div>
    <div class="flag"></div>
    
    <audio v-if="Surl" :src="Surl[number].url" autoplay ref="audio"></audio>
  </div>
</template>
<script>
import "../../style/playRio.css";
export default {
  data(){
    return {
      number:0,
      w:'' * 1,
      oof:false,
      autoTab:false,
      curMin:'00',
      curSeconds:'00',
      durationMin:'00',
      durationSe:'00'
    }
  },
  computed:{
    Surl(){
      if(this.$store.state.songsUrl.length){
        var url = [];
        if(this.$store.state.songsUrl.length > 1){
          for(let i=0;i<this.$store.state.songsUrl.length;i++){
            for(let j=0;j<this.$store.state.playList.length;j++){
              if(this.$store.state.songsUrl[j].id == this.$store.state.playList[i].id){
                url[i] = this.$store.state.songsUrl[j]
              }
            }
          }
        }
        else if(this.$store.state.songsUrl.length === 1){
          for(let i=0; i<this.$store.state.playList.length; i++){
            if(this.$store.state.playList[i].id === this.$store.state.songsUrl[0].id){
               url[0] =  this.$store.state.songsUrl[0]
               this.$store.state.playList[0] = this.$store.state.playList[i]
            }
          }
        }
        return url
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
        let time, time1;
        this.$store.state.playIcon = 'pause';
        this.$refs.audio ? this.$refs.audio.play() : '';
        //时间定时器
        this.$store.state.timer = setInterval(()=>{
          if(this.$refs.audio){
            this.durationMin = parseInt(this.$refs.audio.duration/60) > 9 ? parseInt(this.$refs.audio.duration/60) : '0'+ parseInt(this.$refs.audio.duration/60);
          
            time1 = (this.$refs.audio.duration/60 - this.durationMin) * 60;

            this.durationSe = parseInt(time1) > 9 ? parseInt(time1) : '0' + parseInt(time1);
            this.curMin ='0' + parseInt(this.$refs.audio.currentTime/60);
            time = parseInt((this.$refs.audio.currentTime/60 - this.curMin)*60);
            if(time < 10){
              this.curSeconds =  '0'+ time;
            }else{
              this.curSeconds = time;
            }
            this.w = this.$refs.audio.currentTime/this.$refs.audio.duration * 100;
            if(this.$refs.audio.currentTime == this.$refs.audio.duration){this.autoTab=true};
          }
        },100)//时间定时器结束
      }else{
        this.$store.state.playIcon = 'play';
        this.$refs.audio.pause()
        clearTimeout(this.$store.state.timer)
      }
    },
    playNext(){
      if(this.Surl.length > 1){
        this.number++
        this.playState()
      }
      return
    },
    playPre(){
      if(this.Surl.length > 1){
        this.number--
        this.playState()
      }
      return
    },
    playState(){//上一首和下一首时间状态 函数
      let time, time1, duration = this.$refs.audio.duration ;
      clearTimeout(this.$store.state.timer);
      this.$refs.audio.play();
      
      this.$store.state.timer = setInterval(()=>{
        this.durationMin = parseInt(duration/60) > 9 ? parseInt(duration/60) : '0'+ parseInt(duration/60);
        
        time1 = (duration/60 - this.durationMin) * 60;
      
        this.durationSe = parseInt(time1) > 9 ? parseInt(time1) : '0' + parseInt(time1);
        this.curMin ='0' + parseInt(this.$refs.audio.currentTime/60);
        time = parseInt((this.$refs.audio.currentTime/60 - this.curMin)*60);
        if(time < 10){
          this.curSeconds =  '0'+ time;
        }else{
          this.curSeconds = time;
        }
        this.w = this.$refs.audio.currentTime/duration *100
        
      },100)
      if(this.type ==='play'){this.$store.state.playIcon = 'pause'}
    },//上一首和下一首时间状态 函数 结束
    setCurTime(e){
      
      if(this.$refs.audio) {
        var duration = this.$refs.audio.duration , el = this.$refs.bar.getBoundingClientRect() ;
        this.$refs.bar.addEventListener('mousemove',(e)=>{
          this.$refs.audio.currentTime = duration *((e.pageX - el.left)/el.width)
        })
      }
    },
    removeAdd(){
      var duration = this.$refs.audio.duration , el = this.$refs.bar.getBoundingClientRect() ;
     console.log(this.$refs.bar.removeEventListener('mousemove',(e)=>{
          this.$refs.audio.currentTime = duration *((e.pageX - el.left)/el.width)
        })) 
    }
  },
  watch:{
    oof:function run(){
      // console.log(this.$refs)
      //   if(typeof this.$refs.audio == 'undefined'){
      //     return run()
      //   }
        this.tabPlay()
    },
    autoTab: () => {
      // if(typeof this.$refs.audio == 'undefined'){
      //     return
      //   }
      // if(this.Surl.length == 1){
      //   this.$store.state.playIcon = 'play'
      // }
    }
  }
}
</script>

