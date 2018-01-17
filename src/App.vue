<template>
  <div id="app">
    <div class="top">
      <Header></Header>
      <router-view></router-view>
    </div>
    <div class="bottom">
      <PlayRio></PlayRio>
    </div>  
  </div>
</template>

<script>
import Header  from "./components/header/header"
import PlayRio from "./components/playRio/playRio"
export default {
  name:'app',
  components:{
    Header,
    PlayRio
  }
}
</script>

