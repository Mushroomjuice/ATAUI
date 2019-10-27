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
            <router-link to="/login/">
                <svg-icon icon-class='login' class="loginicon"></svg-icon>
                <span>login</span>
            </router-link>
           
            
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
            'userroles',
        ])
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