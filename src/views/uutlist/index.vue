<template>
    <div>
        <el-row>
            <el-col :span="2">
                <el-input v-model="searchinput"></el-input>
            </el-col>
        </el-row>
        <el-table
            v-loading="listloading"
            :key='tablekey'
            :data="uutlist">
            <el-table-column type='selection'>

            </el-table-column>
            <el-table-column label="register_time" prop="register_time">

            </el-table-column>
            <el-table-column label="order" prop="order">

            </el-table-column>
            <el-table-column label="PCID" prop="pcid"></el-table-column>
            <el-table-column label="MAC/SN" prop="mac"></el-table-column>
            <el-table-column label="Item" prop="item"></el-table-column>
        </el-table>
    </div>
</template>
<script>
import {getuutlist} from '@/api/uut'
export default {
    name :'UutList',
    data() {
        return {
            uut:{
                list:[]
            },
            searchinput:'',
            tablekey:0,
            listloading:true,
        }
    },
    created() {
        //提前请求数据，提升用户体验
        this.getuutlist()

    },
    methods: {
        getuutlist() {
            this.listloading = true
            getuutlist().then(response => {
                this.uut.list = response.data.uutlist
                console.log(response)
                this.listloading = false
            })
        }
    },
    computed: {
        uutlist: function(){
            return this.uut.list

        }
    },
    watch: {
        searchinput:function(){
            // alert('ok')
            this.uut.list = []
        }
    },
}
</script>