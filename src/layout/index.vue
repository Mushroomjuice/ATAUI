<template>
      <div>
            <navbar/>
            <el-container>
                  <sidebar/>
                  <app-main/>
            </el-container>
            
      </div>
</template>


<script>
import { AppMain, Navbar, Sidebar, } from './components'
export default {
      name :'Layout',
      components:{
            AppMain,
            Navbar,
            Sidebar
      }
}
</script>