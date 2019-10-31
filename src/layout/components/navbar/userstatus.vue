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
                <svg-icon icon-class='loginin' class="loginicon"></svg-icon>
                <span>login in</span>
            </router-link>
            <div v-else @click="loginout"> 
                <svg-icon icon-class='loginout' class="loginicon"></svg-icon>
                <span>login out</span>
            </div>

           
            
        </el-col>
    </div>
        
    
        
    
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name:'UserStatus',

    computed: {
        ...mapGetters([
            'username',
            'token',
        ])
    },
    methods: {
        async loginout(){
            await this.$store.dispatch('user/loginout')
            // this.$router.push('/')
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