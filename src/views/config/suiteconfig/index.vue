<template>
    <div>
        <el-row>
            <el-col :span="8">
                <el-button icon="el-icon-edit" type="primary" v-if="checkButtonPermission('suiteconfig','add')" @click="showEditSuiteConfig(click_cell_name)">{{$t('suite.create')}}</el-button>
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
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
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
                    <el-button plain class="closebutton" @click="clearDetailInfo">{{$t('suite.close')}}</el-button>
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
            :show-close="false"
            top="5vh"
            
        >
            <div slot="title">
                <h1 v-if="click_cell_name==''">{{$t('suite.create')}}</h1>
                <h1 v-else>{{click_cell_name}}</h1>
            </div>

            <el-row class="form-row">
                <el-col :span="16" :offset="4">
                    <el-form
                        :v-model="create_detail_suite_config_info"
                        ref="suite_config_info"
                        size='mini'
                        label-width="15%"
                    >   
                        <el-form-item :label="$t('suite.name')" prop="name" >
                            <el-input v-model="create_detail_suite_config_info.name" class="suiteinput"></el-input>
                        </el-form-item>

                        <el-form-item :label="$t('suite.station')" prop="station">
                            <el-select v-model="create_detail_suite_config_info.station" class="suiteinput" @change="stationChange">
                                <el-option v-for="item in suiteStation" :key="item" :label="item" :value="item">
                                    <span style="float: left">{{ item }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  :label="$t('suite.copysuite')">
                            <el-autocomplete 
                                class="suiteinput"
                                v-model="chioceForCopySuite"
                                :fetch-suggestions="querySearch"
                            >
                            </el-autocomplete>
                            <el-button class="copybutton" @click="copySuite" type="primary">{{$t('suite.copysuite')}}</el-button>
                        </el-form-item>
                    </el-form>
                    
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="9" :offset="1">
                    <el-card>
                        <div slot="header">
                            <el-input size="mini" v-model="leftInputSearch">
                                <template slot="prepend">{{$t('suite.testitem')}}</template>
                            </el-input>
                        </div>
                        <el-table
                            :data="FilterAllTestItems"
                            height="420px"
                            highlight-current-row
                            @row-dblclick='leftTableRowDBclick'
                            @selection-change="leftSelectionChange"
                            ref="AllTestTable" 
                        >
                            <el-table-column
                                type="selection"
                                align="center"
                                min-width="10%"
                            >
                            </el-table-column>
                            <el-table-column
                                property="name"
                                min-width='80%'
                            >
                            </el-table-column>
                            <el-table-column
                                
                                min-width="10%"
                            >
                                <template slot-scope="scope">
                                    <el-popover
                                        placement="top-start"
                                        :title="$t('suite.help')"
                                        width="200"
                                        trigger="click"
                                    >
                                        <p v-if="$storage.getstorage('PLAY_LANG','EN')==='EN'">{{scope.row.description.en}}</p>
                                        <p v-else>{{scope.row.description.zh}}</p>
                                        <el-button
                                            type="text"
                                            icon="el-icon-question"
                                            style="padding:0px;"
                                            slot="reference"
                                        >
                                        </el-button>
                                    </el-popover>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-col>
                <el-col :span="2" style="text-align:center;padding-top:150px;">
                    <el-button circle type="primary" @click="leftToRight">
                        <i class="el-icon-d-arrow-right"></i>
                    </el-button>
                </el-col>
                <el-col :span="9">
                    <el-card>
                        <div slot="header">
                            <el-input size="mini" v-model="rightInputSearch">
                                <template slot="prepend">{{$t('suite.testitem')}}</template>
                            </el-input>
                        </div>
                            <el-table
                                :data="FliterSelectionItems"
                                height="380px"
                                @row-dblclick="rightTableRowDBclick"
                                class="tablesortable"
                                row-key="index"
                                @selection-change="rightTableSelectionChange"
                            >
                                <el-table-column
                                    type="selection"
                                    align="center"
                                    min-width="10%"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="name"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="index"
                                    min-width="10%"
                                >
                                    <template slot-scope="scope">
                                        <span>{{scope.row.index +1}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-row >
                                <el-col >
                                    <el-button class="select-suite-button" circle @click="moveItemToTop">
                                    <i class="el-icon-caret-top"></i>
                                    </el-button>
                                    <el-button class="select-suite-button" circle  v-if="false">
                                        <i class="el-icon-plus"></i>
                                    </el-button>
                                    <el-button class="select-suite-button" circle  v-if="false">
                                        <i class="el-icon-minus"></i>
                                    </el-button>
                                    <el-button class="select-suite-button" circle @click="moveItemToBottom">
                                        <i class="el-icon-caret-bottom"></i>
                                    </el-button>
                                    <el-button class="select-suite-button" circle @click="rightTableSelectDelete">
                                        <i class="el-icon-close"></i>
                                    </el-button>
                                    <el-button class="select-suite-button" circle @click="rightTableDeleteAll">
                                        <i class="el-icon-delete"></i>
                                    </el-button>
                                </el-col>
                            </el-row>                       
                    </el-card>
                </el-col>
            </el-row>
            <hr>
            <div slot="footer">
                <el-row>
                <el-col style="text-align:right">
                    <el-button
                    type="primary"
                    plain
                    class="closebutton"
                    v-if="create_new_suite"
                    @click="createsuiteconfig"
                    >{{$t('suite.create')}}</el-button>
                    <el-button
                    type="primary"
                    plain
                    class="closebutton"
                    v-if="create_new_suite"
                    @click="setConfigListToNull"
                    >{{$t('suite.reset')}}</el-button>
                    <el-button
                    type="primary"
                    plain
                    v-if="!create_new_suite"
                    class="closebutton"
                    @click="createsuiteconfig"
                    >{{$t('suite.update')}}</el-button>
                    <el-button
                    type="primary"
                    
                    plain
                     v-if="!create_new_suite"
                    class="closebutton"
                    >{{$t('suite.delete')}}</el-button>
                    <el-button plain class="closebutton" @click="clearEditInfo">{{$t('suite.close')}}</el-button>
                </el-col>
                </el-row>
            </div>
        </el-dialog> 
        <el-dialog
            :visible.sync="show_confirm_suite_config"
            width="70%"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            
        >
            <div slot="title">
                <h1 style="margin:4px">{{$t('suite.name')}}: {{create_detail_suite_config_info.name}} </h1>
                <h1 style="margin:4px">{{$t('suite.station')}}: {{create_detail_suite_config_info.station}}</h1>
            </div>
            <el-table
                :data="create_detail_suite_config_info.suite"
                :height="detailtableheight"
            >
                <el-table-column
                    prop="index"
                    min-width="10%"
                >
                    <template slot-scope="scope">
                        {{scope.row.index+1}}
                    </template>


                </el-table-column>
                <el-table-column
                    prop="name"
                    min-width="40%"
                ></el-table-column>
                <el-table-column prop="description" :label="$t('suite.description')" :show-overflow-tooltip="true" min-width="50%">
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
            <div slot="footer">
                <el-row>
                    <el-col style="text-align:right">
                        <el-button
                            type="primary"
                            plain
                            class="closebutton"
                        >
                            {{$t('suite.submit')}}
                        </el-button>
                        <el-button
                            type="primary"
                            plain
                            class="closebutton"
                        >
                            {{$t('suite.cancel')}}
                        </el-button>
                    </el-col>
                </el-row>
            </div>
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
import Sortable from 'sortablejs'
import {getSuiteTable, deleteSuiteItem,getDeatilSuiteConfig,getsuitestation,getTestItem,getStationInfo} from '@/api/config'
import {TimeForFormatter} from '@/utils/filters'
import checkButtonPermission from '@/utils/button-permission'

export default {
    name:'SuiteConfig',
    data() {
        return {
            el:null,
            sortable:null,
            // 默认的分页数据
            suiteStation:[],
            limit:10,
            offset:0,
            suite_config_count: 0,
            all_suite_config_count:0, //所有的suite数量，用于请求所有的suite
            AllSuiteName:[], //所有的suitename 用于输入提示
            chioceForCopySuite:'', //选择copy的suite名字，用于请求该suite的详细信息，然后用于复制
            //显示表头否
            showheader:false,

            //左边搜索栏数据
            leftInputSearch:'',
            //右边搜索栏数据
            rightInputSearch:'',
            AllTestItems:[], //获取到的所有的TestItem
            // AllTestItemsForShow: [], //将获取的所有TestItems处理后用于显示

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
            
            //用于判断是更新还是创建
            create_new_suite:true,

            //点击单元格是将id记录，用于查询详细信息,和进入编辑页面
            click_cell_name:'',

            show_edit_suite_config:false, //用于显示编辑页面

            leftSelectionItems:[],
            rigthSelectionItems:[],



            create_detail_suite_config_info:{
                name:'',
                station:'',
                suite:[]
            },



            show_confirm_suite_config:false,
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
        this.all_suite_config_count = this.suite_config_count
        this.getAllSuiteName()
        this.getAllTestItems()
        
    },
    methods:{
        //当station改变后，从服务端查询对应站点的信息
        stationChange(){
            if(!this.create_new_suite && this.create_detail_suite_config_info.name.length !=0 ){
                getStationInfo(this.create_detail_suite_config_info.name,this.create_detail_suite_config_info.station).then(response =>{
                    this.create_detail_suite_config_info.suite = response.data.data
                    this.setRightIndex()
                })

            }
        },

        //将配置的list清空
        setConfigListToNull(){
            this.create_detail_suite_config_info.suite = []
        },
        //创建suiteconfig
        createsuiteconfig(){
            console.log(this.create_detail_suite_config_info)
            this.show_confirm_suite_config = true

        },
        //清空详情页面的信息
        clearDetailInfo(){
            this.detail_suite_config_info = []
            this.click_cell_name = ''
            this.show_detail_suite_config = false
        },

        //清空编辑页面的信息
        clearEditInfo(){
            this.$confirm('确认关闭？')
            .then(() => {
                this.create_detail_suite_config_info = {
                    name:'',
                    station:'',
                    suite:[]
                },
                this.click_cell_name = ''
                this.show_edit_suite_config = false,
                this.create_new_suite = true
                this.chioceForCopySuite = ''
            })
            .catch(() => {});
        },

        //将选中item置底
        moveItemToBottom(){
            //将要置顶的item的index记录
            let selectitemindex = []
            for(let i=0;i<this.rigthSelectionItems.length;i++){
                selectitemindex.push(this.rigthSelectionItems[i]['index'])
            }
            console.log(selectitemindex)
            //将所有元素中除上面选择的item选出来
            if(selectitemindex.length>0){
                let newarr = this.create_detail_suite_config_info.suite.filter(item => 
                !selectitemindex.includes(item['index'])
            )
            this.create_detail_suite_config_info.suite = [...newarr, ...this.rigthSelectionItems]
            this.setRightIndex()
            this.rigthSelectionItems = []
            }
        },
        //将选中的item置顶
        moveItemToTop(){
            //将要置顶的item的index记录
            let selectitemindex = []
            for(let i=0;i<this.rigthSelectionItems.length;i++){
                selectitemindex.push(this.rigthSelectionItems[i]['index'])
            }
            console.log(selectitemindex)
            //将所有元素中除上面选择的item选出来
            if(selectitemindex.length>0){
                let newarr = this.create_detail_suite_config_info.suite.filter(item => 
                !selectitemindex.includes(item['index'])
            )
            this.create_detail_suite_config_info.suite = [...this.rigthSelectionItems, ...newarr]
            this.setRightIndex()
            this.rigthSelectionItems = []
            }
        },
        //右边表格选择改变触发的事件
        rightTableSelectionChange(val){
            this.rigthSelectionItems = val
        },
        // 在suite中设置下标, 只用于标记对应的item
        setRightIndex() {
            //对this.create_detail_suite_config_info.suite里面的元素进行深拷贝
            this.rightInputSearch = '' //清空search状态
            let tmp_list = []
            
            for (let i = 0; i < this.create_detail_suite_config_info.suite.length; i++) {
                let tmp = Object.assign({},this.create_detail_suite_config_info.suite[i])
                tmp['index'] = i
                tmp_list.push(tmp)
            }
            this.create_detail_suite_config_info.suite = tmp_list    
        },
        //dialog加载后设置table为可拖动，当有输入过滤状态时，设置为不可拖动状态
        setsort(){
            this.el = document.querySelectorAll('.tablesortable > .el-table__body-wrapper > table >tbody')[0];
            // const _this = this
            console.log(this.el)
            this.sortable = Sortable.create(this.el,{
                ghostClass: "sortable-ghost", // Class name for the drop placeholder,
                animation: 150,
                setData: function(dataTransfer) {
                    dataTransfer.setData("Text", "");
                },
                onEnd: async(evt) => {
                    console.log(evt.oldIndex,evt.newIndex)
                    const targetRow = this.create_detail_suite_config_info.suite.splice(evt.oldIndex, 1)[0];
                    await this.create_detail_suite_config_info.suite.splice(evt.newIndex, 0, targetRow)
                    //每次拖动之后重置index，为后面删除提供正确的index
                    let tmp_list = []
                    for (let i = 0; i < this.create_detail_suite_config_info.suite.length; i++) {
                        let tmp = Object.assign({},this.create_detail_suite_config_info.suite[i])
                        tmp['index'] = i
                        tmp_list.push(tmp)
                    }
                    this.create_detail_suite_config_info.suite = tmp_list
                    console.log(this.create_detail_suite_config_info.suite)
                }
            })
        },        
        //中间箭头，将左边数据放到右边
        leftToRight(){
            for(let i=0;i<this.leftSelectionItems.length;i++){      
                this.create_detail_suite_config_info.suite.push(this.leftSelectionItems[i])
            }
            this.setRightIndex()
            this.$refs.AllTestTable.clearSelection()
        },
        // 右边全部清除
        rightTableDeleteAll(){
            this.create_detail_suite_config_info.suite = []
        },
        //右边选择后删除
        rightTableSelectDelete(){
            //将要删除的item的index记录
            let selectitemindex = []
            for(let i=0;i<this.rigthSelectionItems.length;i++){
                selectitemindex.push(this.rigthSelectionItems[i]['index'])
            }
            console.log(selectitemindex)
            //将所有元素中除上面选择的item选出来
            if(selectitemindex.length>0){
                let arr = this.create_detail_suite_config_info.suite.filter(item => 
                !selectitemindex.includes(item['index'])
            )
                //this.create_detail_suite_config_info得到新的值
                this.create_detail_suite_config_info.suite = arr;
                this.setRightIndex()
                this.rigthSelectionItems = []              
            }
        },
        //右边双击 删除对应的item
        rightTableRowDBclick(val){
            this.setRightIndex();
            console.log(val.length)
            this.create_detail_suite_config_info.suite.splice(val.index, 1);
            this.setRightIndex();
        },
        // 左边双击
        leftTableRowDBclick(val){
            this.create_detail_suite_config_info.suite.push(val) 
            this.setRightIndex()     
        },
        // 左边选择改变
        leftSelectionChange(val){
            this.leftSelectionItems = val
            console.log(this.leftSelectionItems)
        },
        //copySuite
        copySuite(){
            console.log(this.chioceForCopySuite)
            if(this.chioceForCopySuite && this.create_detail_suite_config_info.station){
                getStationInfo(this.chioceForCopySuite,this.create_detail_suite_config_info.station).then(response =>{
                    this.create_detail_suite_config_info.suite = response.data.data
                    this.setRightIndex()
                })
            }
            
        },
        //输入建议
        querySearch(queryString, cb){
            let restaurants = this.AllSuiteName
            let results = queryString ? restaurants.filter(this.createFliter(queryString)) : restaurants;
            cb(results)
        },
        createFliter(queryString){
            return restaurant => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase())) === 0;
            }
        },
        //获取服务端所有的suite 取得name 为copy suite输入建议用
        getAllSuiteName(){
            getSuiteTable({limit:this.all_suite_config_count}).then(response => {
                let tmp = response.data.results
                this.AllSuiteName = []
                for (let i = 0;i < tmp.length;i++){
                    this.AllSuiteName.push({value:tmp[i].name, lable:tmp[i].name})
                }
                console.log(this.AllSuiteName)
            })
        },
        //获取所有的suite item 用于穿梭栏选择
        getAllTestItems(){
            getTestItem().then(response => {
                this.AllTestItems = response.data.results
                console.log(this.AllTestItems)
            })
        },
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
            this.show_detail_suite_config = false
            this.show_edit_suite_config = true
            // val = clicl_cell_name 当click-cell-name没有值时说明是创建状态
            if(val){
                this.create_detail_suite_config_info['name'] = val
                //标记是create状态，显示创建相关按钮
                this.create_new_suite = false
            }
            
            //页面渲染后加载排序功能
            this.$nextTick(()=>{
                this.setsort()
            })
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
        FilterAllTestItems: function(){
            let input = this.leftInputSearch && this.leftInputSearch.toLowerCase()
            let filteritems
            if(input){
                filteritems = this.AllTestItems.filter(function(item){
                    return Object.keys(item).some(function(key){
                        return String(item[key]).toLowerCase().match(input)
                    })
                })
            }else{
                filteritems = this.AllTestItems
            }
            return filteritems
        },
        FliterSelectionItems:function(){
            let input = this.rightInputSearch && this.rightInputSearch.toLowerCase()
            let filteritems = []
            
            if (input) {
                
                filteritems = this.create_detail_suite_config_info.suite.filter(function(item){
                    return Object.keys(item).some(function(key){
                        return String(item[key]).toLowerCase().match(input)
                    })
                })
            }else{
                
                filteritems = this.create_detail_suite_config_info.suite
            }
            return filteritems
        },
    },
    watch: {
        rightInputSearch(){
            if(this.rightInputSearch){
                this.$nextTick(()=>{
                    //将可排序设为fasle
                    this.sortable.option("disabled", true)// set  
                })
            }else{
                this.sortable.option("disabled", false)// set
            }
        }
    },
}
</script>

<style lang="scss" scoped>

::v-deep .el-table thead{
    display: none
}
::v-deep .el-table td{
     padding: 0px;
}
::v-deep .el-table .cell{
    padding:0px;
}

.form-row{
    background: #eeeeee;
    margin-bottom: 10px;
    padding-top: 10px;
}

.suiteinput{
    width: 30%
}

::v-deep .el-card__header{
    background: #eeeeee;
    padding: 8px;
}
::v-deep .el-card__body{
    padding-top: 5px;
    padding-bottom: 0px;
    padding-left: 2px;
    padding-right: 0px;
}

::v-deep .sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>