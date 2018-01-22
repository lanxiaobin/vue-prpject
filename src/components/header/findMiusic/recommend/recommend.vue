<template>
<div>
    <div>
        <div class="banner" style="width:980px;height:336px; margin:0 auto;">
            <Carousel style="width:730px; float:left" class="b-height" v-model="value1" :autoplay="true" :autoplay-speed="3000" :loop="true" :height="336" @on-change="tabBg">
                <CarouselItem id="recomed" v-for="(item,index) in items" :key="index">
                    <div class="demo-carousel" style="height:100%">
                        <a href="javascript:;">
                            <img :src="item.pic">
                        </a>
                    </div>
                </CarouselItem>
            </Carousel>
            <div class="download">
                <a href="javascript:;"></a>
            </div>
        </div>
    </div>
    <div class="content clearFix">
        <div class="c-left">
            <div class="hot">
                <div class="title">
                    <Icon class="icon" type="android-radio-button-on"></Icon>
                    <button>热门推荐</button>
                    <ul>
                        <li>
                            <a href="javascript:;">华语</a> 
                        </li>
                    </ul>
                    <Icon class="max-icon" type="arrow-right-c"></Icon>
                    <a href="javascript:;" class="max">更多</a>
                </div>
                <div class="clearFix">
                    <ul class="m-lists">
                        <li :id="item.id" v-for="(item,index) in personalized" v-if="index < 8" :key="index" ref="obtain">
                            <div class="img">
                                <a href="">
                                    <img :src="item.picUrl" alt="">
                                </a>
                                <dfn class="dfn">
                                    <Icon type="headphone" :size='18' color='#999' style="margin:4px;margin-right:6px; float:left"></Icon>
                                    <span style="color:#fff; float:left">{{item.playCount}}</span>
                                    <span @click="obtain(item.id)">
                                        <Icon class="play" type="ios-play" :size='14' color='#fff'></Icon>
                                    </span>
                                </dfn>
                            </div>
                            <p>{{item.name}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="new">
                <div class="title">
                    <Icon class="icon" type="android-radio-button-on"></Icon>
                    <button>新碟上架</button>
                    <Icon class="max-icon" type="arrow-right-c"></Icon>
                    <a href="javascript:;" class="max">更多</a>
                </div>
                <div class="n-new">
                    <div class="n-newList">
                         <Carousel v-model="value2" style="width:100%;height:100%" :loop="true" dots="none">
                             <CarouselItem>
                                 <ul style="display:flex">
                                    <li v-if="index > 5 && index < 11" v-for="(item,index) in personalized"  :key="index"  style="flex:1;">
                                        <div>
                                            <img :src="item.picUrl" alt="">
                                        </div>
                                        <p>
                                            <a href=""></a>
                                        </p>
                                    </li>
                                </ul>
                             </CarouselItem>
                             <CarouselItem>
                                 <ul style="display:flex">
                                    <li v-if="index > 5 && index < 11" v-for="(item,index) in personalized"  :key="index"  style="flex:1;">
                                        <div>
                                            <img :src="item.picUrl" alt="">
                                        </div>
                                        <p>
                                            <a href=""></a>
                                        </p>
                                    </li>
                                </ul>
                             </CarouselItem>
                        </Carousel> 
                    </div>
                </div>
            </div>
            <div class="bill">
                <div class="title">
                    <Icon class="icon" type="android-radio-button-on"></Icon>
                    <button>榜单</button>
                    <Icon class="max-icon" type="arrow-right-c"></Icon>
                    <a href="javascript:;" class="max">更多</a>
                </div>
                <div class="bi-list">
                    <div class="bi-border" v-for="(item,index) in bill">
                        <ul>
                            <li class="bi-top">
                                <div class="t-img">
                                    <img :src="item.coverImgUrl" :alt="item.name">
                                </div>
                                <div class="t-title">
                                    <h3>{{item.name}}</h3>
                                    <div class="icons">
                                        <button title="播放"><Icon :size="22" class="icon" type="play"></Icon></button>
                                        <button title="收藏"><Icon :size="22" class="icon" type="android-add-circle"></Icon></button>
                                    </div>
                                </div>
                            </li>
                            <li :id="subItem.id" class="list" v-for="(subItem,subIndex) in item.tracks"  v-if="subIndex < 10">
                                <span style="width:20px;color:red; font-size:16px;display:inline-block;vertical-align:top;text-align:center">{{subIndex + 1}}</span>
                                <button>
                                   <span class="name">{{subItem.name}}</span> 
                                </button>
                                <dfn class="dfn">
                                    <button @click="obtain(item.id)" title="播放"><Icon :size="20" color="#777" class="icon" type="play"></Icon></button>
                                    <button title="添加到播放列表"><Icon :size="20" color="#777" class="icon" type="android-add"></Icon></button>
                                    <button title="收藏"><Icon :size="20" class="icon" color="#777" type="android-add-circle"></Icon></button>
                                </dfn>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="right"></div>
    </div>
</div>
</template>

<script>
import '@/style/recomed.css'

export default {
    data () {
        return {
            value1: 0,
            value2:0
        }
    },
    computed:{
        items(){return this.$store.state.banner},
        personalized(){return this.$store.state.personalized},
        url(){
            // console.log(this.$store.state.songsUrl)
            return this.$store.state.songsUrl
        },
        bill(){
            return {
                0:this.$store.state.B_Bill,
                1:this.$store.state.Y_Bill,
                2:this.$store.state.N_Bill
            }
        }
    },
    methods:{
        tabBg(oldValue,value){
            this.$el.children[0].style.backgroundImage = `url(${this.items[value].pic})`;
            this.$el.children[0].style.backgroundSize = '1px 100%';
            this.$el.children[0].style.backgroundPosition = '-1px 0';
            this.$el.children[0].style.backgroundRepeat = 'repeatX'
        },
        obtain(id){
            this.$store.dispatch('getSongs',id)
            this.$store.state.off = true
        }
    },
    beforeCreate:function (params) {
        this.$store.dispatch('getBannerAction')
        this.$store.dispatch('getPersonalized')
        this.$store.dispatch('getB_Bill')
        this.$store.dispatch('getY_Bill')
        this.$store.dispatch('getN_Bill')
    }
}
</script>

