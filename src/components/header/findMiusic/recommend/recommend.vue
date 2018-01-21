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
                    <button>热门推荐</button>
                    <ul>
                        <li>
                            <a href="javascript:;">华语</a> 
                        </li>
                    </ul> 
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
                    <button>新碟上架</button>
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
                    <button>榜单</button>
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
        url(){return this.$store.state.songsUrl}
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
    }
}
</script>

