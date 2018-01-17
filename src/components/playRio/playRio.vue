<template>
  <div class="midl">
    <div class="btns">
      <Icon class="btn" type="arrow-left-b"></Icon>
      <Icon class="btn" type="play"></Icon>
      <Icon class="btn" type="arrow-right-b"></Icon>
    </div>
    <div class="head">
      <a href="javascript:;">
        <img src="" alt="">
      </a>
    </div>
    <div class="play">
      <div class="s-name"></div>
      <div class="bar" style="width:440px">
        <Progress class="bg-bar" :percent="100" :stroke-width="9" hide-info></Progress>
      </div>
    </div>
    <div class="oper"></div>
    <div class="flag"></div>
  </div>
</template>
<script>
import "../../style/playRio.css";
export default {
  
}
</script>

