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
            <el-table-column label="RESULT" prop="result">
                <template slot-scope="scope">
                    <div slot="reference" v-if="scope.row.result==='inprocessing'" >
                        
                            <svg-icon icon-class='inprocessing' class="inprocessing" style="display:inline-block" ></svg-icon>
                            <!-- <i class="el-icon-loading"></i> -->
                            <!-- <i style="color:#007f00" class="fa fa-cog fa-spin fa-fw"></i> -->
                    </div>
                    <div v-else-if="scope.row.result==='pass'">
                        <svg-icon icon-class='pass' class="pass"></svg-icon>
                    </div>
                    <div v-else-if="scope.row.result==='fail'">
                        <svg-icon icon-class='fail' class="fail"></svg-icon>
                    </div>
                    <div v-else-if="scope.row.result==='failing'">
                        <svg-icon icon-class='failing' class="failing"></svg-icon>
                    </div>
                    <div v-else>
                        <svg-icon icon-class='pause' class="pause"></svg-icon>
                    </div>
                </template>

            </el-table-column>
            <el-table-column label="LINK" prop="link">
                <template slot-scope="scope">
                    <el-dropdown placement="right">
                        <el-button type='text'>
                            <svg-icon icon-class='circle' class="circle"></svg-icon>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-button
                                type="text"
                                style="width:100px;"
                                @click="console.log(scope.row.id)"
                                >Poweroff</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button
                                type="text"
                                style="width:100px;"
                                >Reboot</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button
                                type="text"
                                style="width:100px;"
                                >Delete</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button
                                type="text"
                                style="width:100px;"
                                >Continue</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button
                                type="text"
                                style="width:100px;"
                                >Retest</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button
                                type="text"
                                style="width:100px;"
                                >Monitor</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button
                                type="text"
                                style="width:100px;"
                                >Terminal</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button
                                type="text"
                                style="width:100px;"
                                >Log</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>

            </el-table-column>
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
        },
        ShowTestResult() {
            console.log('sucess')
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