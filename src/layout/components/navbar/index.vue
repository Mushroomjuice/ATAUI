<template>
      
      
      <el-header class="app-header">
           <el-row>
                 <el-col :span="4">
                        <router-link to="/uutlist/">
                              <img src="@/assets/logo.png" class="logo">
                        </router-link>     
                 </el-col>
                 <UserStatus/>

           </el-row>
      </el-header>
</template>

<script>
import UserStatus from './userstatus'
export default {
      name: 'Navbar',
      components:{
            UserStatus
      }
}
</script>

<style lang="scss" scoped>
// .app-header {
//       // line-height: 0px !important;
//       }
.el-col {
      height: 60px;
      text-align: center;
}
.logo {
    height: 30px;
    margin: 15px;
  }



</style>
