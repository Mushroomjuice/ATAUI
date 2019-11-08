<template>
    <div>
        <el-col :span="2" :offset="12">
                <template>
                    <div class="user">
                        <svg-icon icon-class='user' class="usericon"></svg-icon>
                        <span>{{username}}</span>
                    </div>
                </template>
        </el-col>
        <el-col :span="2">
            <router-link to="/login" v-if="!token">
                <span>
                    <svg-icon icon-class='login' class="loginicon"></svg-icon>
                    <span>login</span>
                </span>
            </router-link>
            <span v-else @click="logout">
                <el-button type="text">
                    <svg-icon icon-class='logout' class="loginicon"></svg-icon>
                    <span>logout</span>
                </el-button>
                
            </span>
        </el-col>
    </div>
        
    
        
    
</template>

<script>
import { mapGetters } from 'vuex'
import { resetRouter } from '@/router'
// import store from '@/store'
// import router from '@/router'
export default {
    name:'UserStatus',

    computed: {
        ...mapGetters([
            'username',
            'token',
        ])
    },
    methods: {
        async logout(){
            await this.$store.dispatch('user/logout')
            await this.$store.dispatch('asyncRoutes/generateRoutes', [])
            resetRouter()
            this.$router.push({path:'/home'})
        }
    },

    //去vuex中获取用户的状态
}
</script>


<style lang="scss" scoped>
.usericon{
    margin-right: 10px;

}
.loginicon {
    margin-right: 10px;
}
// .el-col{
//     margin: 0px;
// }

.el-button {
    color: #ffffff;
  }

</style>