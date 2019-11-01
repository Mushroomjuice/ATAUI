<template>
    <div class="ata-title">
        <h1>{{title}}</h1>
        <hr>
    </div>
</template>

<script>
export default {
    name:'Title',
    props:["title"]
}
</script>

<style lang="scss" scoped>
    .ata-title{
        font-size: 22px;
    }
</style>