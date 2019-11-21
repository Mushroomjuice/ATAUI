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
            <div slot="title">
                <h1 >{{click_cell_name}}</h1>
            </div>
            <el-table
                :data="detail_suite_config_info"
                v-loading="detail_suite_config_loading"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                row-key="id_for_index"
                :height="detailtableheight"
                :indent = 0
                default-expand-all 
            >
               <el-table-column prop="id" :label="$t('suite.test_sequence')">
                   <template slot-scope='scope'>
                        <strong v-if='scope.row._title' style="margin-top: 5px;margin-bottom: 5px; font-size:14px;">
                            {{scope.row.id}}
                        </strong>
                        <span
                            v-else
                            style="color:#111111;font-size:12px;margin-top: 2px;margin-bottom: 2px;"
                        >{{scope.row.id}}</span>
                   </template>

               </el-table-column>
               <el-table-column prop="name" :label="$t('suite.item')">

               </el-table-column>
                <el-table-column prop="description" :label="$t('suite.description')">
                    <template slot-scope="props">
                        <span
                        v-if="$storage.getstorage('PLAY_LANG', 'EN') === 'EN'"
                        style="margin-top: 5px;margin-bottom: 5px;"
                        >{{props.row.description.en}}</span>
                        <span
                        v-else
                        style="color:#111111;font-size:12px;margin-top: 2px;margin-bottom: 2px;"
                        >{{props.row.description.zh}}</span>
                    </template>

                </el-table-column>
            </el-table>
            <hr>
            <div slot="footer">
                <el-row>
                <el-col style="text-align:right">
                    <el-button
                        type="primary"
                        v-if="checkButtonPermission('suiteconfig','update') && show_confirm_page"
                        plain
                        class="closebutton"
                    >{{$t('suite.submit')}}
                    </el-button>
                    <el-button
                        type="primary"
                        v-if="checkButtonPermission('suiteconfig','update')"
                        plain
                        @click="showEditSuiteConfig(click_cell_name)"
                        class="closebutton"
                    >{{$t('suite.change')}}
                    </el-button>
                    <el-button
                        plain
                        v-if="checkButtonPermission('suiteconfig','update') && show_confirm_page"
                        class="closebutton"
                    >{{$t('suite.close')}}</el-button>
                    <el-button plain class="closebutton" v-if="checkButtonPermission('suiteconfig','update')" disabled>{{$t('suite.close')}}</el-button>
                </el-col>
                </el-row>
            </div>

        </el-dialog>

        <!-- 编辑页面 -->
        <el-dialog
            :visible.sync="show_edit_suite_config"
            width="90%"
            
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            top="5vh"
        >
            <div slot="title">
                <h1 v-if="click_cell_name==''">{{$t('suite.create')}}</h1>
                <h1 v-else>{{click_cell_name}}</h1>
            </div>

            <el-row>
                <el-col>
                    <el-form
                        :v-model="create_detail_suite_config_info"
                        ref="suite_config_info"
                        size='mini'
                    >   
                        <el-form-item :label="$t('suite.name')" >
                            <el-input v-model="create_detail_suite_config_info.name"></el-input>
                        </el-form-item>

                        <el-form-item :label="$t('suite.station')">
                            <el-select v-model="create_detail_suite_config_info.station">
                                <el-option v-for="item in suiteStation" :key="item" :label="item" :value="item">
                                    {{item}}
                                </el-option>
                            </el-select>
                        </el-form-item>

                    </el-form>
                </el-col>


            </el-row>

            <el-row>

            </el-row>




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
import {getSuiteTable, deleteSuiteItem,getDeatilSuiteConfig,getsuitestation} from '@/api/config'
import {TimeForFormatter} from '@/utils/filters'
import checkButtonPermission from '@/utils/button-permission'
export default {
    name:'SuiteConfig',
    data() {
        return {
            // 默认的分页数据
            suiteStation:[],
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

            detail_suite_config_info:[],
            
            //点击单元格是将id记录，用于查询详细信息,和进入编辑页面
            click_cell_name:'',

            show_edit_suite_config:false, //用于显示编辑页面
            create_detail_suite_config_info:{
                name:'',
                station:'',
                suite:[]
            },




            show_confirm_page:false, // 用于显示 确认提交的页面
            
            show_suite_config_delete:false,
            suite_config_selected:'', //选择的config,用于批量删除


            show_detail_suite_config:false,
            detail_suite_config_loading:false,
        }
    },
    created(){
        this.getSuiteConfigData()
        this.getSuiteStation()
    },
    methods:{

        getSuiteStation(){
            getsuitestation().then(response => {
                console.log(response.data.data)
                // 后端接口需要处理
                this.suiteStation = response.data.data

            })
        },
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
        
         // 获取详细的suite信息
        suite_table_cell_click(row){
           

            this.show_detail_suite_config =true
            this.detail_suite_config_loading =true

            this.click_cell_name = row.name,
            console.log(row.name)
            this.detail_suite_config_info = []

            getDeatilSuiteConfig(this.click_cell_name).then(response => {
                var temp = Object.assign({}, response.data.suite);
                // 将获取的数据整理一下放入detail table中， 引入children 实现子节点树形加载
                for(let item in temp){
                    const tmp  = {}
                    tmp['_title'] = item
                    tmp['id_for_index'] = item
                    tmp['id'] = item
                    tmp['name'] = ''
                    tmp['description'] = ''
                    tmp['children'] = []
                    for (let i = 0; i < temp[item].length; i++){
                        const childitem = {}
                        childitem['id_for_index'] = item + i
                        childitem['id'] = i + 1
                        childitem['name'] = temp[item][i].name
                        childitem['description'] = temp[item][i].description
                        tmp['children'].push(childitem)
                    }
                    this.detail_suite_config_info.push(tmp)
                }
                this.detail_suite_config_loading = false
                console.log(this.detail_suite_config_info)
            })
        },

        // 弹出更改config的页面
        showEditSuiteConfig(val){
            // 如果val 有值就是change,没有就是create
            this.show_edit_suite_config = true
            this.create_detail_suite_config_info['name'] = val
            this.create_detail_suite_config_info['station'] = this.suiteStation
            this.create_detail_suite_config_info['suite'] = this.
            console.log(val)
            

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
        detailtableheight: function(){
            return this.$store.getters.pageheight - 350 + 'px'
        },
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