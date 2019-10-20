<template>
      <div>
            <navbar/>
            <sidebar/>
            <app-main/>
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