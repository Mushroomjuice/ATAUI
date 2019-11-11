<template>
    <div class="login-container" v-if="loginpage">
        <el-form ref="loginform" :model="loginform" class="login-form" label-position="left" :style="{marginTop:(pageheight-500)/2+'px'}" :rules="login_rules">
        <div class="title-container">
            <h3 class="title">ATA Login</h3>
        </div>    
        <el-form-item prop="username">
            <span class="svg-container">
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
          <span class="svg-container">
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


        <el-button type="primary"  @click="Toregister">Register</el-button>
        <el-button type="primary"  @click="BackToHome">Back</el-button>
        <el-button type="primary"  @click="handlelogin"> login </el-button>
        
    </el-form>
    </div>
    <div class="login-container" v-else>
        <el-form ref="registerform" :model="registerform" class="login-form" label-position="left" :style="{marginTop:(pageheight-500)/2+'px'}" :rules="regist_rules">
        <div class="title-container">
            <h3 class="title">ATA Register</h3>
        </div>    
        <el-form-item prop="username">
            <span class="svg-container">
                <svg-icon icon-class="user" />
            </span>
            <el-input
            ref="username"
            v-model="registerform.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
            />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="password"
            v-model="registerform.password"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
          />

        </el-form-item>
        <el-form-item prop="confirmpassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="password"
            v-model="registerform.confirmpassword"
            placeholder="Password Confirmation !"
            name="confirmpassword"
            tabindex="3"
            
          />

        </el-form-item>

        <el-button type="primary"  @click="handleregister"> Submit </el-button>
        <el-button type="primary"  @click="BackToLogin">Back</el-button>
        
    </el-form>
    </div>
    
</template>

<script>
import {regist} from '@/api/user'
export default {
    
    name:'Login',
    data(){
        var checkPass = (rule, value, callback) => {
            if (value != this.registerform.password) {
                callback(new Error("The two password fields didn't match!"));
            } else {
                callback();
            }
        };
        return {
            loginform:{
                username:'',
                password:'',
            },
            login_rules: {
                username: [{ required: true, message: "User Name is Required" }],
                password: [{ required: true, message: "Password is Required" }]
            },
            registerform:{
                username:'',
                password:'',
                confirmpassword:''
            },
            regist_rules: {
                username: [{ required: true, message: "User Name is Required" }],
                password: [{ required: true, message: "Password is Required" }],
                check_pass: [
                { required: true, message: "Please input password again!" },
                { validator: checkPass }
                ]
            },
            pageheight:null,
            pagewidth:null,
            loginpage:true,

        }
    },
    mounted(){
        this.pageheight = this.$store.getters.pageheight;
        this.pagewidth = this.$store.getters.pagewidth
    },
    methods:{
        handlelogin(){
            this.$refs['loginform'].validate(vaild =>{
                if(vaild){
                    this.$store.dispatch('user/login',this.loginform)
                        .then(() => {
                            this.$router.push({path:'/Home',name:'Home'})
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }else{
                    return false
                }
            })
            
        },
        handleregister(){
            this.$refs['registerform'].validate(vaild => {
                if(vaild){
                    var post_data = {
                        username: this.registerform.username,
                        password: this.registerform.password
                    };
                    regist(post_data).then(response =>{
                        if(response.status =='404'){
                            this.$alert(this.$t("login.register_error"), "Error", {
                              type: "error"
                              });
                        }else{
                            this.$router.push({ path: "/Home" });
                        }
                    })


                }
            })

        },
        BackToHome(){
            this.$router.push({path:'/Home'})
        },
        Toregister(){
            this.loginpage=false

        },
        BackToLogin(){
            this.loginpage=true
        }
    }
}
</script>


<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;


.login-container{
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;



    .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    //   caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        // -webkit-text-fill-color: $cursor !important;
        }
    }
    }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    }

    .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 10px;
    margin: auto;
    overflow: hidden;
    background-color: #4d8ab3;
    height:400px;
    }
    .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    }



    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
    
    .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    }
}



</style>