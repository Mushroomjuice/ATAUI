<template>
      <el-main>
            <Title title="192.168.128.32"></Title>
            
            <router-view/>
      </el-main>
</template>

<script>
import Title from './Title'
export default {

      name:'AppMain',
      components:{
            Title,
      },
      computed: {
            
      },
}
</script>

<style lang="scss" scoped>

.el-main {
      padding: 0px;
      margin: 0px;
      height: 100%;
      
      
}
.el-header {
      padding: 0px;
}
</style>