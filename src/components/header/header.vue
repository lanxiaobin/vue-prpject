<template>
    <header class="header">
      <div class="h-top clearFix">
        <div class="logo">
          <h1>
            <a href="">
            </a>
          </h1>
        </div>
        <Menu class="h-list" mode="horizontal" active-name="1" @on-select="route">
            <MenuItem class="bor-btm" name="1">
                发现音乐
                <span></span>
            </MenuItem>
            <MenuItem id="li" class="bor-btm" name="2" >
                我的音乐
                <span></span>
            </MenuItem>
            <MenuItem class="bor-btm" name="3">
                朋友
                <span></span>
            </MenuItem>
            <MenuItem class="bor-btm" name="4">
                商城
                <span></span>
            </MenuItem>
            <MenuItem class="bor-btm" name="5">
                音乐人
                <span></span>
            </MenuItem>
            <MenuItem class="bor-btm" name="6">
                <i></i>
                下载客户端
                <span></span>
            </MenuItem>
        </Menu>
        <div class="login">
            <Dropdown>
                <a href="javascript:void(0)">
                    登陆
                    <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu class="drpDonMu" slot="list">
                    <DropdownItem class="dropdownItem">
                        <Icon type="iphone" size="20"/>
                        手机登陆
                    </DropdownItem>
                    <DropdownItem class="dropdownItem">
                        <Icon type="chatbubbles"></Icon>
                        微信登陆
                        </DropdownItem>
                    <DropdownItem class="dropdownItem">
                        <Icon type="chatboxes"></Icon>
                        QQ登陆
                        </DropdownItem>
                    <DropdownItem class="dropdownItem">
                        <Icon type="social-rss"></Icon>
                        新浪微博登陆
                        </DropdownItem>
                    <DropdownItem class="dropdownItem">
                        <Icon type="email"></Icon>
                        网易邮箱登陆
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div class="blog">
            <a href="javascript:;">视频投稿</a>
        </div>
        <div class="inp">
            <Input v-model="value1" icon="ios-search-strong" placeholder="音乐/视频/电台/用户" size="default"></Input>
        </div>
      </div>
    </header>
</template>
<script>
import '../../style/header.css'
import Vue from "vue";
export default {
    data () {
        return {
            theme1: 'dark',
            value1:''
        }
    },
    methods:{
        route:function(name){
            if(name == 1){
                this.$router.push({
                    path:'/findmiusic'
                });
            }
            if(name == 2){
                this.$router.push({
                    path:'/mymiusic'
                })
            }
            if(name == 3){
                this.$router.push({
                    path:'/friend'
                })
            }
            if(name == 6){
                this.$router.push({
                    path:'/donwLoad'
                })
            }
        }
    },
    mounted:function(){
        
    }

}
</script>






