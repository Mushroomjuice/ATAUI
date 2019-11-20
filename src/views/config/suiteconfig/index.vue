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
            <el-col :span="2" :offset="9">
                <el-select 
                    v-model="search_condition.key"
                    placeholder="Search Type"
                    clearable 
                >
                    <el-option 
                        v-for="item in search_condition_from_server"
                        :key="item"
                        :label="item"
                        :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="2" >
                <el-input clearable v-model="search_condition.value" placeholder="Value Of Type">
                </el-input>
            </el-col>
            <el-col :span="1" >
                <el-button  type="primary" icon="el-icon-search"  @click="searchclick">{{$t('uut.search')}}</el-button>
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
                <el-pagination
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="suite_config_count"
                    @size-change="handleSizeChange"
                    @current-change='handleCurrentChange'
                >

                </el-pagination>
            </el-col>
        </el-row>
        
    </div>
</template>

<script>
import {getSuiteTable, deleteSuiteItem,getDeatilSuiteConfig} from '@/api/config'
import {TimeForFormatter} from '@/utils/filters'
import checkButtonPermission from '@/utils/button-permission'
export default {
    name:'SuiteConfig',
    data() {
        return {
            // 默认的分页数据
            limit:10,
            offset:0,
            suite_config_count: 0,

            // 搜索用的条件
            search_condition:{
                key:'',
                value:''
            },
            search_condition_from_server:[
                'name','id','user'
            ],
            // 主页面上显示的信息
            suite_table_data:null,
            suite_table_loading: true,
            suite_table_layout:['10%','5%','25%'],

            //用于显示suite_config的详细信息
            detail_suite_config_info:null,
            //点击单元格是将id记录，用于查询详细信息
            click_cell_name:'',
            
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
        // 分页每页数量改变
        handleSizeChange(val){
            this.limit = val
            this.getSuiteConfigData()


        },
        // 分页 页码改变
        handleCurrentChange(val){
            this.offset = (val-1) * this.limit
            this.getSuiteConfigData()
        },

        // 搜索按钮事件
        searchclick(){
            this.getSuiteConfigData()
        },

        //获取suiteconfig的基本信息
        getSuiteConfigData(){
            this.suite_table_loading = true
            let params = {
                limit:this.limit,
                offset:this.offset,
            }
            // 将输入的条件加入到查询字符串中
            if(this.search_condition.key.length > 0 && this.search_condition.value.length > 0){
                params[this.search_condition.key] = this.search_condition.value
            }
            getSuiteTable(params).then(response => {
                this.suite_table_data = response.data.results
                this.suite_table_loading = false
                this.suite_config_count = response.data.count
            })
        },
        

        // 将时间转化成日期
        TimeForFormatter,
        checkButtonPermission,
        
        
        suite_table_cell_click(row){
            // 获取详细的suite信息
            this.show_detail_suite_config =true
            this.detail_suite_config_loading =true

            this.click_cell_name = row.name,
            console.log(row.name)

            getDeatilSuiteConfig(this.click_cell_name).then(response => {
                let res_result = response.data.suite
                console.log(res_result)
            })





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