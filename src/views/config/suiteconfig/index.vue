<template>
    <div>
        <el-row>
            <el-col :span="8">
                <el-button icon="el-icon-edit" type="primary" v-if="checkButtonPermission('suiteconfig','add')">{{$t('suite.create')}}</el-button>
                <el-button 
                    icon="el-icon-delete" 
                    type="danger" 
                    v-if="show_suite_config_delete && checkButtonPermission('suiteconfig','delete')"
                    @click="deleteSuiteItem('more')"
                >
                    {{$t('suite.delete')}}
                </el-button>
            </el-col>
            <!-- test suite 搜索开始 -->
            <el-col :span="4" :offset="12">
                <el-input clearable>
                    <el-button slot="append" icon="el-icon-search">{{$t('uut.search')}}</el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-table
            :data="suite_table_data"
            v-loading="suite_table_loading"
            :height='tableheight'
            highlight-current-row
            @cell-click="suite_table_cell_click"
            @selection-change="suite_table_selected_change"
        >
            <el-table-column type="selection" align="center">

            </el-table-column>
            <el-table-column :label="$t('suite.name')" prop="name" :min-width="suite_table_layout[2]">

            </el-table-column>
            <el-table-column 
                :label="$t('suite.create_date')" 
                prop="date" 
                :min-width="suite_table_layout[2]"
                :formatter="TimeForFormatter"
                
            >

            </el-table-column>
            <el-table-column :label="$t('suite.create_user')" prop="user" :min-width="suite_table_layout[2]">

            </el-table-column>
            <el-table-column :label="$t('suite.delete')" :min-width="suite_table_layout[1]" v-if="checkButtonPermission('suiteconfig','delete')">
                <template slot-scope="scope">
                    <el-button @click.stop="deleteSuiteItem(scope.row.id)" type="text">
                        <svg-icon icon-class='delete'></svg-icon>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            :visible.sync="show_detail_suite_config"
            width="70%"
        >

        </el-dialog>
        <el-row style="text-align: center;">
            <el-col :span='24'>
                <el-pagination>

                </el-pagination>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
import {getSuiteTable, deleteSuiteItem} from '@/api/config'
import {TimeForFormatter} from '@/utils/filters'
import checkButtonPermission from '@/utils/button-permission'
export default {
    name:'SuiteConfig',
    data() {
        return {
            // 默认的分页数据
            limit:10,
            offset:0,

            suite_table_data:null,
            suite_table_loading: true,
            suite_table_layout:['10%','5%','25%'],
            
            show_suite_config_delete:false,
            suite_config_selected:'', //选择的config,用于批量删除


            show_detail_suite_config:false,
            detail_suite_config_loading:false,
        }
    },
    created(){
        this.getSuiteConfigData()
    },
    methods:{
        //获取suiteconfig的基本信息
        getSuiteConfigData(){
            this.suite_table_loading = true
            getSuiteTable({limit:10,offset:0}).then(response => {
                this.suite_table_data = response.data.results
                this.suite_table_loading = false
            })
        },
        // 将时间转化成日期
        TimeForFormatter,
        checkButtonPermission,
        
        suite_table_cell_click(){
            this.show_detail_suite_config =true
            this.detail_suite_config_loading =true



        },

        //suite table选择改变了
        suite_table_selected_change(val){
            this.suite_config_selected = ''
            if(val.length != 0){
                
                for (var i = 0; i < val.length; i++) {
                    if (i == val.length - 1) {
                        this.suite_config_selected += val[i].id;
                    } else {
                        this.suite_config_selected += val[i].id + "&id=";
                    }
                }
                console.log(this.suite_config_selected)
                this.show_suite_config_delete = true // 显示删除按钮

            }else{
                this.suite_config_selected = ''
                this.show_suite_config_delete = false
            }

        },

        // 行末删除按钮 
        deleteSuiteItem(val){
            let delete_item = ''
            if(val == 'more'){
                // 批量删除数据来自suite_config_selected
                delete_item = this.suite_config_selected
            }else {
                delete_item = val
            }
            this.$confirm(this.$t("suite.confirm_delete"), this.$t("suite.delete"), {
                confirmButtonText: this.$t("suite.sure"),
                cancelButtonText: this.$t("suite.cancel"),
                type: "warning"
            }).then(() => {
                    // 发送删除item的请求
                    deleteSuiteItem(delete_item).then(() =>{
                        // console.log(response)
                        this.$message({
                            type: "success",
                            message: this.$t("suite.delete_success")
                        });
                        // 清除选择的数据残留
                        this.suite_config_selected = '',
                        this.getSuiteConfigData()  
                    })
                    console.log(delete_item)
            }).catch(() => {
              this.$message({ type: "info", message: this.$t("suite.cancel") });
            });
        },
        

    },
    computed: {
        tableheight: function(){
            return this.$store.getters.pageheight-190 +'px'
        },
    },
}
</script>


<style lang="scss" scoped>

::v-deep .el-table td{
     padding: 0px;
}
::v-deep .el-table .cell{
    padding:0px;
}


</style>