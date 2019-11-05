<template>
    <div class="ata-title">
        <h1 class="title-font">{{title}}</h1>
        <hr style="margin-bottom:0px;margin-top:0px;">
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
        .title-font {
            margin: 0px;
            padding-left: 10px;
            padding-bottom:5px;
            padding-top:5px;
            text-align: left;
           
            

        }
    }

</style>