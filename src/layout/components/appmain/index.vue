<template>
      <el-main>
            <el-header>
            </el-header>
            <router-view/>
      </el-main>
</template>

<script>
export default {
      name:'AppMain'
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