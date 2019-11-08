<template>
      <el-header class="app-header">
           <el-row>
                 <el-col :span="4">
                        <router-link to="/uutlist/">
                              <img src="@/assets/logo.png" class="logo">
                        </router-link>
                 </el-col>
                 <UserStatus/>
                  <el-col :span="2">
                        <span>
                              <el-button type="text" @click="changelanguage">
                                    <svg-icon icon-class='translate' style="margin-right: 10px;"></svg-icon>
                                    <span>{{language}}</span>
                              </el-button>
                        </span>
                        
                  </el-col>
                  <el-col :span="2">
                        <span>
                              <el-button type="text">
                                    {{$t('header.bell')}}
                              </el-button>
                        </span>
                  </el-col>

           </el-row>
      </el-header>
</template>

<script>
import UserStatus from './userstatus'
export default {
      name: 'Navbar',
      data() {
            return {
                  lang:'',
                  language: this.$storage.getstorage('PLAY_LANG', 'EN') == 'EN' ? '中' : 'EN',
            }
      },
      
      
      components:{
            UserStatus
      },
      methods:{
            changelanguage(){
                  this.lang === 'EN' ? this.lang = 'ZH' : this.lang = 'EN'
                  this.lang==='EN'? this.language='中': this.language='EN'
                  this.$i18n.locale = this.lang;
                  this.$storage.setstorage('PLAY_LANG', this.lang)

            }
      }
}
</script>

<style lang="scss" scoped>
 
.el-row{
      height: 60px
 }
.el-col {
      height: 60px;
      text-align: center;
      margin: 0px !important;
      padding: 0px;
}
.logo {
    height: 30px;
    margin: 15px;
  }

.el-button {
    color: #ffffff;
  }



</style>
