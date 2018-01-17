<template>
  <div id="app">
    <div class="top">
      <Header></Header>
      <router-view></router-view>
    </div>  
  </div>
</template>

<script>
import Header  from "./components/header/header"

export default {
  name:'app',
  components:{
    Header
  }
}
</script>

