<template>
    <div class="ata-title">
        <h1 v-if="pagetitle=='uutlist'" class="title-font">{{this.$storage.getstorage('PRODUCTION','0.0.0.0')}}</h1>
        <!-- 从storage获取ip在uut页面显示 -->
        <h1 v-else class="title-font">{{pagetitle}}</h1>
        <hr style="margin-bottom:0px;margin-top:0px;">
    </div>
</template>

<script>
import getpagetitle from '@/utils/page-title'


export default {
    name:'Title',
    props:["title"],
   
    methods:{
        getpagetitle,
        
    },
    
    computed: {
        pagetitle: function(){
            return this.getpagetitle(this.$route.meta.title)
        }
    },

}
</script>

<style lang="scss" scoped>
    .ata-title{
        font-size: 22px;
        .title-font {
            margin: 0px;
            padding-left: 10px;
            padding-bottom:5px;
            padding-top:5px;
            text-align: left;
           
            

        }
    }

</style>