<template>
      <el-main>
            <Title title="192.168.128.32"></Title>
            <hr style="color:#6c6c6c;margin-bottom:0px;margin-top:0px;">
            <router-view/>
      </el-main>
</template>

<script>
import Title from './Title'
export default {

      name:'AppMain',
      components:{
            Title,
      }
}
</script>

<style lang="scss" scoped>

.el-main {
      padding: 0px;
      margin: 0px;
}
.el-header {
      padding: 0px;
}
</style>