<template>
    <div>
        <component v-bind:is='is' v-bind:to="pathtogo">
            <slot/>
        </component>
    </div>
    
    
</template>

<script>
// import { is } from '@babel/types'
// 用作侧边栏的点击，将点击的侧边栏item对应的路由添加到，appmian组件显示对应的item页面

export default {
    name:'AppLink',
    props:{
        pathtogo:{
            type:String,
            required:true
        }
    },
    data(){
        return{
            is:'router-link',
            // to: this.to
        }
        

    }
    

}
</script>