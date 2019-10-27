<template>
    <el-form ref="loginform" :model="loginform">

        <el-form-item prop="username">
            <span>
                <svg-icon icon-class="user" />
            </span>
            <el-input
            ref="username"
            v-model="loginform.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
            />
        </el-form-item>
        <el-form-item prop="password">
          <span>
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="password"
            v-model="loginform.password"
            
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
          />

        </el-form-item>

        <el-button type="primary" @click="handlelogin()">login</el-button>
    </el-form>
</template>

<script>

export default {
    name:'Login',
    data(){
        return {
            loginform:{
                username:'',
                password:'',
            }
        }
    },
    
    methods:{
        handlelogin(){
            this.$store.dispatch('user/login',this.loginform).then(() => {
                // this.$store.dispatch('user/getInfo') //页面最开始加载以后就要去获取info 后期放到全局去
                // this.$store.dispatch('asyncRoutes/generateRoutes',1)
                this.$router.push({path:'/'})
                
            })
        }
    }
}
</script>