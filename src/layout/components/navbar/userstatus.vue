<template>
    <div>
        <el-col :span="2">
            
                <template>
                    <div class="user">
                        <svg-icon icon-class='user' class="usericon"></svg-icon>
                        <span>{{username}}</span>
                    </div>
                </template>
                
            
            
        </el-col>
        <el-col :span="2">
            <router-link to="/login" v-if="!token">
            <el-button style="text">
                <svg-icon icon-class='login' class="loginicon"></svg-icon>
                <span>login</span>
            </el-button>
            </router-link>
            <el-button v-else @click="logout">
                <svg-icon icon-class='logout' class="loginicon"></svg-icon>
                <span>logout</span>
            </el-button>
           

           
            
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
            // const { roles } = await this.$store.dispatch('user/getInfo')
            // const roles  = this.$store.getters.roles                  
            await this.$store.dispatch('asyncRoutes/generateRoutes', [])
            // console.log(roles)
            resetRouter()
        
            // this.$router.addRoutes(accessRoutes)
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
</style>