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
            :data="uutlist"
            :height="tableheight"
            fit
            highlight-current-row
           
            >
            <el-table-column type='selection'>

            </el-table-column>
            <el-table-column label="register_time" prop="register_time" sortable="true">

            </el-table-column>
            <el-table-column label="order" prop="order">

            </el-table-column>
            <el-table-column label="PCID" prop="pcid"></el-table-column>
            <el-table-column label="MAC/SN" prop="mac"></el-table-column>
            <el-table-column label="Item" prop="current_item"></el-table-column>
            <el-table-column label="MES" prop="route_step"></el-table-column>
            <el-table-column label="Item" prop="current_item"></el-table-column>
            <el-table-column label="RESULT" prop="result"></el-table-column>
            <el-table-column label="LINK" prop="link"></el-table-column>
            <el-table-column label="elapsed_time" prop="elapsed_time"></el-table-column>
        </el-table>


        <el-row>
            <el-col :span="18">
                <el-pagination>

                </el-pagination>
            </el-col>
        </el-row>
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
                this.uut.list = response.data.results
                console.log(response)
                this.listloading = false
            }).catch(error => {
                console.log(error)
            })
        }
    },
    computed: {
        uutlist: function(){
            return this.uut.list

        },
        tableheight: function(){
            return this.$store.getters.pageheight-190 +'px'
        }
        

    },
    watch: {
        searchinput:function(){
            // alert('ok')
            this.uut.list = []
        },
        // tableheight: () => {
        //     this.tableheight =this.$store.getters.pageheight
        // }
    },
}
</script>