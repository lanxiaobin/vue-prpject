<template>
<div>
    <nav id="nav" class="nav">
        <div style="max-width:1100px; margin:0 auto">
            <Menu class="h-list" mode="horizontal" active-name="1" @on-select="route">
                <MenuItem class="bor-btm" v-for="(text,index) in items" :name="index+1" :key="index">
                    <em>{{text.text}}</em>    
                </MenuItem>
            </Menu>
        </div>
    </nav>
    <router-view></router-view>
</div>
</template>
<script>
export default{
    data(){
        return{
            items:[
                {text:'推荐'},
                {text:'排行榜'},
                {text:'歌单'},
                {text:'主播电台'},
                {text:'歌手'},
                {text:'新碟上架'}
            ]
        }
    },
    methods:{
        route:function(name){
            if(name == 1){
                this.$router.push({
                    path:'/findmiusic/recommend'
                })
            }
        }
    },
    mounted:function (){
        this.$router.push('/findmiusic/recommend')
        this.$children[0].$children[0].$el.className = 'bor-btm ivu-menu-item ivu-menu-item-active ivu-menu-item-selected'
    }
}
</script>
