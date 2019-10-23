<template>
      <div class="app-wrapper">
            <navbar/>
            <el-container class="app-container">
                  <sidebar class="sidebar-container"/>
                  <app-main/>
            </el-container>
            
      </div>
</template>


<script>
import { AppMain, Navbar, Sidebar, } from './components'
// import {mapGetters} from 'vuex'
export default {
      name :'Layout',
      components:{
            AppMain,
            Navbar,
            Sidebar
      },
      
}
</script>