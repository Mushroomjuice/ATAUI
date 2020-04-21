<template>
      <div class="app-wrapper">
            <navbar/>
            <el-container class="app-container" :style="{height:pageheight-60+'px'}">
                  <sidebar class="sidebar-container"/>
                  <app-main/>
            </el-container>
            
      </div>
</template>


<script>
import { AppMain, Navbar, Sidebar, } from './components'
import {mapGetters} from 'vuex'
export default {
      name :'Layout',
      components:{
            AppMain,
            Navbar,
            Sidebar
      },
      // data() {
      //       return {
      //             pagesize:window.onresize = ()=> {
      //                   return
      //             }
      //       }
      // },

      computed: {
            ...mapGetters([
                  'pageheight',
                  'pagewidth'
            ])
      },
      created() {
            window.onresize = () => {
                  this.$store.dispatch('fitscreensize/setheight',document.documentElement.clientHeight)
                  this.$store.dispatch('fitscreensize/setwidth',document.documentElement.clientWidth)
            }
      }

      // watch:{
      //       pagesize:{
      //             handler:function(pagesize){
      //                   console.log(pagesize)
      //             }
      //       }
      // }
      
}
</script>
<style lang="scss" scoped>
      
</style>