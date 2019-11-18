<template>
    <div>

        <el-row>
            <el-col :span="4">
                <el-dropdown split-button type="primary" v-if='showuutoperations'>
                    {{$t('uut.operation')}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-if="checkButtonPermission('uutlist','poweroff')">
                            <el-button type="text" style="width:100px;">
                                {{$t("uut.poweroff")}}
                            </el-button>
                        </el-dropdown-item>
                        <el-dropdown-item v-if="checkButtonPermission('uutlist','reboot')">
                            <el-button type="text" style="width:100px;">
                                {{$t("uut.reboot")}}
                            </el-button>
                        </el-dropdown-item>
                        <el-dropdown-item v-if="checkButtonPermission('uutlist','delete')">
                            <el-button type="text" style="width:100px;">
                                {{$t("uut.delete")}}
                            </el-button>
                        </el-dropdown-item>
                        <el-dropdown-item v-if="checkButtonPermission('uutlist','continue')">
                            <el-button type="text" style="width:100px;">
                                {{$t("uut.continue")}}
                            </el-button>
                        </el-dropdown-item>
                        <el-dropdown-item v-if="checkButtonPermission('uutlist','monitor')">
                            <el-button type="text" style="width:100px;">
                                {{$t("uut.monitor")}}
                            </el-button>
                        </el-dropdown-item>

                        <div v-for="item in modulars" :key="item">
                            <el-dropdown-item style="color:rgb(102, 177, 255)" v-if="checkButtonPermission('uutlist',item)">
                                <el-button type="text" style="width:100px;">{{item}}</el-button>
                            </el-dropdown-item>
                        </div>

                    </el-dropdown-menu>
                </el-dropdown>
                
            </el-col>
            <el-col :span="4" :offset="16" v-if='showuutoperations'>
                <el-input v-model="searchinput" clearable>
                    <el-button slot="append" icon="el-icon-search" @click="SearchuutInfo">{{$t('uut.search')}}</el-button>
                </el-input>
            </el-col>
            <el-col :span="4" :offset="20" v-else>
                <el-input v-model="searchinput" clearable >
                    <el-button slot="append" icon="el-icon-search" @click="SearchuutInfo">{{$t('uut.search')}}</el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-table
            v-loading="listloading"
            :key='tablekey'
            :data="uutlist"
            :height="tableheight"
            highlight-current-row
            @selection-change="selectchange"
            tooltip-effect="light"
            
            >
            <el-table-column type='selection' >
            </el-table-column>
            <el-table-column :label="$t('uut.register_time')" prop="register_time" sortable="true" :show-overflow-tooltip="true" :min-width="uut_list_page_width[0]">
                <template slot-scope="scope">
                    <span @click="clickCell">{{scope.row.register_time}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('uut.order')" prop="order"  :min-width="uut_list_page_width[1]">
            </el-table-column>
            <el-table-column :label="$t('uut.pcid')" prop="pcid" :show-overflow-tooltip="true" :min-width="uut_list_page_width[2]"></el-table-column>
            <el-table-column :label="$t('uut.mac_sn')" prop="mac" :show-overflow-tooltip="true" :min-width="uut_list_page_width[3]"></el-table-column>
            <el-table-column :label="$t('uut.item')" prop="current_item" :show-overflow-tooltip="true" :min-width="uut_list_page_width[4]"></el-table-column>
            <el-table-column :label="$t('uut.route_step')" prop="route_step" :show-overflow-tooltip="true" :min-width="uut_list_page_width[5]"></el-table-column>
            <el-table-column :label="$t('uut.result')" prop="result" :min-width="uut_list_page_width[6]">
                <template slot-scope="scope">
                    <el-button type="text" @click="displayUUTDetailInfo(scope.row.id,scope.row.pcid,scope.row.order)">
                        <div v-if="scope.row.result==='inprocessing'" > 
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
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column :label="$t('uut.link')" prop="active" :min-width="uut_list_page_width[7]">
                <template slot-scope="scope">
                    <el-dropdown placement="right">
                        <el-button type='text'>
                            <svg-icon icon-class='pass' class="pass" v-if="scope.row.active"></svg-icon>
                            <svg-icon icon-class='fail' class="fail" v-else></svg-icon>        
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-button
                                type="text"
                                style="width:100px;"
                                @click="console.log(scope.row.id)"
                                v-if="checkButtonPermission('uutlist','add')"
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
            <el-table-column :label="$t('uut.elapsed_time')" prop="elapsed_time" :show-overflow-tooltip="true" :min-width="uut_list_page_width[8]"></el-table-column>
        </el-table>
        <el-dialog
            :visible.sync="showuutdetailinfo"
            top="3vh"
            width="95%"
            center
            :show-close='false'
            :close="uutDetailInfoClose"
            :close-on-click-modal="false"
            
        >
            <div>
                <h1>SN: {{uutDetailInfo.title_sn}}&nbsp;&nbsp; Order: {{uutDetailInfo.title_order}}</h1>
            </div>
            <el-table
                v-loading="uutdetailinfoloading"
                border
                :data="uutDetailInfo.detail_info"
                cell-class-name="test-table"
                :height="uutdetailtableheight"
                highlight-current-row
                :cell-style="{'white-space':'pre-line'}"
            > 
                <el-table-column 
                    prop="item_name"
                    :label="$t('uut.detail_item')"
                    :min-width="uut_detail_page_width[0]"
                >
                </el-table-column>
                <el-table-column
                    prop="expectation"
                    :label="$t('uut.detail_expectation')"
                    :min-width="uut_detail_page_width[1]"
                >
                    <template slot-scope="scope">
                        <el-input v-if='scope.row.edit' v-model="scope.row.expectation" autosize type="textarea"></el-input>
                        <span v-else> {{scope.row.expectation}}</span>                        
                    </template>

                </el-table-column>
                <el-table-column 
                    prop="validation"
                    :label="$t('uut.detail_validation')"
                    :min-width="uut_detail_page_width[2]"
                >
                    <template slot-scope="scope">
                        <el-input v-if='scope.row.edit' v-model="scope.row.validation" autosize type="textarea"></el-input>
                        <span v-else> {{scope.row.validation}}</span>                        
                    </template>
                </el-table-column>
                <el-table-column 
                    prop="result"
                    :label="$t('uut.detail_result')"
                    :min-width="uut_detail_page_width[3]"
                >
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-select v-model="scope.row.result" size="small" icon="fa fa-angle-down">
                                <!-- 这里的pass,fail大小写随意 -->
                                <el-option value="pass"></el-option>
                                <el-option value="fail"></el-option>
                                <el-option value="hold"></el-option>
                            </el-select>
                        </template>
                        <template v-else>
                            <!-- get detail info 的时候会将格式转化为大写 -->
                            <span v-if="scope.row.result=='FAIL' || scope.row.result=='FAILING'" style="color:red"
                            >{{defTestResult(scope.row.result)}}</span>
                            <span
                                v-else-if="scope.row.result=='PASS'"
                                style="color:#007f00"
                            >{{defTestResult(scope.row.result)}}</span>
                            <span v-else>{{defTestResult(scope.row.result)}}</span>
                        </template>
                    </template>
                    
                </el-table-column>
                <el-table-column 
                    prop="elapsed_time"
                    :label="$t('uut.detail_elapsed_time')"
                    :min-width="uut_detail_page_width[3]"
                >
                </el-table-column>
                <el-table-column
                    prop="edit"
                    :label="$t('uut.edit_test_info')"
                    :min-width="uut_detail_page_width[4]"
                    v-if="checkButtonPermission('uutlist','edit_test_info')"
                    align="center"
                >   
                    <template slot-scope="scope">
                        <!-- 不在编辑状态，并且不是hold状态的test info可以编辑 -->
                        <el-button
                            v-if="!scope.row.edit && scope.row.result!='HOLD'"
                            type="text"
                            size="small"
                            @click="editTestInfo(scope.row)"
                        >
                            <svg-icon icon-class='edit' class="edit"></svg-icon>
                        </el-button>
                        <el-button v-else 
                            type="text"
                            size="small"
                            @click="saveEditTestInfo(scope.row)"
                        >
                            <svg-icon icon-class='save' class="save"></svg-icon>

                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <hr>
            <div slot="footer">
                <el-row>
                <el-col :span='2'>
                    <el-button @click="displayUUTDetailInfo(uutDetailInfo.uut_id,uutDetailInfo.title_sn,uutDetailInfo.title_order)">
                        {{$t('uut.refresh_button')}}
                    </el-button>
                </el-col>
                <el-col :span="2" :offset="20">
                    <el-button @click="uutDetailInfoClose">
                        {{$t('uut.close_button')}}
                    </el-button>
                </el-col>

                </el-row>
            </div>
            
            
            
            
        </el-dialog>
        <!-- UUT Info页面(Test suite, IP, IPMI IP等)开始（点击开始时间显示） -->
        <el-dialog
            :visible.sync="show_uut_info_page"
        >
            <div>
                <h1>{{uut_info.uut_id}}</h1>
            </div>
            <el-card>
                <strong>IP :</strong>
                {{uut_info.uut_ip}}
                <br>
                <!-- <strong>Port :</strong>
                {{uut_info_port}}
                <br> -->
                <strong>IPMI :</strong>
                {{uut_info.uut_IPMI}}
                <br>
                <strong>MES/MAC :</strong>
                {{uut_info.uut_mes_mac_sn}}
                <br>
                <strong>SuiteName :</strong>
                {{uut_info.uut_suit_name}}
                <br>
                <strong>Mac :</strong>
                {{uut_info.uut_all_mac}}
                <br>
                <strong>LastUpdate :</strong>
                {{uut_info.uut_last_update_time}}
                <br>
                <strong>Master SN :</strong>
                {{uut_info.uut_master_sn}}
                <br>
                <strong>Location :</strong>
                {{uut_info.uut_lacation}}
            </el-card>

        </el-dialog>
        
            <el-row>
            <!-- 定时器 -->
            <el-col :span="9" style="text-align:left">
                
                    {{$t('uut.choicerefreshtime')}}
                    <el-select v-model="uutRefreshChoiceshow" @change="uutRefreshChoiceChange" v-if='showuutrefresh' class="refreshselect">
                        <el-option 
                        v-for="item in uutRefreshChoiceArray" 
                        :key='item.key'
                        :value="item.value"
                        :label="item.value">
                        {{item.value}}
                        </el-option>
                    </el-select>
                
                
            </el-col>
            <el-col :span="10"  >
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :total="uut_list_count"
                    :page-size="100"
                    :page-sizes="[100,uut_list_count]"
                    layout="total, sizes, prev, pager, next, jumper"
                >

                </el-pagination>
            </el-col>
        </el-row>
        
        
    </div>
</template>
<script>
import {getuutlist,getmodulars,getuutdetailinfo,updateuutdetailinfo} from '@/api/uut'
import checkButtonPermission from '@/utils/button-permission'
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
            modulars:[],
            uutRefreshChoiceArray:[
                { key: "1sec", value: "1" },
                { key: "10sec", value: "10" },
                { key: "30sec", value: "30" },
                { key: "never", value: "Never" }
            ],
            uutRefreshChoiceshow:'10',
            uutRefreshChoice:10, //默认的刷新频率
            uutRefreshTimer:null,
            form_command: {
                action: "", //操作UUT的命令,Reboot,PoerOff等
                data: [] //要操作的UUT的id
            },
            showuutoperations:false,
            showuutrefresh:true, //当要操作uut时关闭频率选择，避免不必要的bug
            showuutdetailinfo:false,
            show_uut_info_page:false,
            uutdetailinfoloading:true,
            uutDetailInfo:{
                title_sn:'', //dialog 头部显示
                title_order:'', //dialog 头部显示
                uut_id:'', // 用于查询uutdetailinfo
                detail_info:null,
            },
            uut_list_count:0, //用于分页组件显示总条数
            uut_list_offset:0, //默认起始页
            uut_list_limit:100, //默认每页请求条数
            uut_list_order_by:"-link",

            uut_info:{
                uut_id:'',
                uut_ip:'',
                uut_IPMI:'',
                uut_mes_mac_sn:'',
                uut_suit_name:'',
                uut_all_mac:'',
                uut_last_update_time:'',
                uut_master_sn:'',
                uut_lacation:'',

            },


            uut_detail_page_width: ["10%", "25%", "25%", "5%", "10%"], //table列宽度百分比
            uut_list_page_width:[
                "14%", // Start time
                "11%", // Order
                "10%", // PCID
                "10%", // MAC/SN
                "24%", // Item
                "10%", // Route Step
                "5%", // Test status
                "5%", // Link status
                "10%" // Duration
            ],
            uut_detail_info_editting:0,

            
            
        }
    },
    created() {

        //提前请求数据
        this.getUutlist('first')
        this.getmodulars()
        this.createuutRefreshTimer()
        

    },
    destroyed(){
        //清除定时器
        clearInterval(this.uutRefreshTimer)
        this.uutRefreshTimer=null
    },
    methods: {
        clickCell(){
            this.show_uut_info_page = true
            this.$message({
                type: "success",
                    message: this.$t("uut.update_success")
            })
        },
        defTestResult(val) {
            if (val == "inprocessing") {
                return "In Processing";
            }
            return val.toUpperCase();
        },
        editTestInfo(row){
            row.edit = true
            this.uut_detail_info_editting += 1
        },
        saveEditTestInfo(row){
            
                /*
            保存修改后的test_info,为了不改变原来的样式,这里需要对原来的样式深拷贝
            object深拷贝:const tmp = Object.assign({}, row);
            点击保存按钮,恢复刷新
            */
            const tmp = Object.assign({}, row); //object对象深拷贝
            tmp.expectation = tmp.expectation.split("\n");
            tmp.validation = tmp.validation.split("\n");
            delete tmp.elapsed_time //elapsed_time不需要更新
            let sequence = tmp.sequence
            let id = this.uutDetailInfo.uut_id
            updateuutdetailinfo(id,sequence,tmp).then(response => {
                row.edit = false
                this.uut_detail_info_editting -= 1
                console.log(response)
                if (this.uut_detail_info_editting == 0) {
                    this.displayUUTDetailInfo(this.uutDetailInfo.uut_id,this.uutDetailInfo.title_sn,this.uutDetailInfo.title_order)
                }
                this.$message({
                    type: "success",
                    message: this.$t("uut.update_success")
                });
            })


            
            
        },

        SearchuutInfo(){
            //搜索按钮点击事件
            console.log(this.searchinput)
            let searchlist = (this.searchinput && this.searchinput.toLowerCase()).split(" ")
            if(searchlist){
                this.listloading=true
                getuutlist(this.uut_list_offset,this.uut_list_limit,this.uut_list_order_by).then(response => {
                    let res_result = response.data.results
                    // console.log(response)

                    
                    for (var i = 0; i < res_result.length; i++) {
                        // 变换elapsed_time
                        res_result[i].elapsed_time = res_result[i].elapsed_time_str;
                        // 变换register_time
                        res_result[i].register_time = res_result[i].start_time_str;
                        // 变换current_item
                        if (res_result[i].current_item) {
                            res_result[i].current_item =
                            res_result[i].current_item +
                            "(" +
                            res_result[i].current_item_index +
                            "/" +
                            res_result[i].test_item_count +
                            ")";
                        }
                        // 变换active
                        if (res_result[i].status && res_result[i].status == "online") {
                            res_result[i].active = true;
                        } else {
                            res_result[i].active = false;
                        }
                    }
                    this.uut_list_count = response.data.count
                    
                })
                let filter_item = this.uut.list.filter(function(item) {
                    //console.log(Object.keys(item));
                    return searchlist.every(key1 => {
                        return Object.keys(item).some(key2 => {
                            return String(item[key2]).toLowerCase().match(key1);
                        })

                    });
                });
                //搜索结果得到后清除定时器
                clearInterval(this.uutRefreshTimer)
                this.uutRefreshTimer = null
                this.uut.list = filter_item
                this.listloading = false
                
            }else{
                return false
                // 清除搜索的时候要恢复定时器刷新
                // let timer = this.uutRefreshChoiceshow
                // console.log(timer)
                // this.uutRefreshChoiceChange(timer)
            }




        },


        // uutlist请求要根据分页的数据请求不同数量的请求
        handleSizeChange(val){
            // 分页 数量改变
            this.uut_list_limit = val
            this.getUutlist('first')
        },
        handleCurrentChange(val){
            //分页 当前页数改变时的函数
            this.uut_list_offset = (val - 1) * this.uut_summary_limit;
            this.getUutlist('first')
        },
        secondToHMS(val) {
            /*
            把秒转换成时分秒的形式
            */
            if (!val || val == "undefined") {
                return "00h:00m:00s";
            }
            var h = val / 3600;
            var m = (val % 3600) / 60;
            var s = (val % 3600) % 60;
            h = h < 10 ? "0" + parseInt(h) : parseInt(h);
            m = m < 10 ? "0" + parseInt(m) : parseInt(m);
            s = s < 10 ? "0" + parseInt(s) : parseInt(s);
            return h + "h:" + m + "m:" + s + "s";
        },
        secondToYMDHMS(val) {
            //把时间戳转换成年月日时分秒 日期
            var date = "";
            if (!val || val == "undefined") {
                return "";
            }
            if (Date.now() / val > 10) {
                date = new Date(val * 1000);
            } else {
                date = new Date(val);
            }
            var Y = date.getFullYear() + "-";
            var M =
                (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
            var D =
                date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";

            var h = date.getHours();
            h = h < 10 ? "0" + h : h;
            var m = date.getMinutes();
            m = m < 10 ? "0" + m : m;
            var s = date.getSeconds();
            s = s < 10 ? "0" + s : s;
            return Y + M + D + h + ":" + m + ":" + s;
        },
        calcElapsedTime(start_time) {
            var elapsed_time_sec = Date.now() / 1000 - start_time;
            return this.secondToHMS(elapsed_time_sec);
        },
        webAddBr: function(row) {
            /*
            定义期望值和实际值的展示样式
            */
            var info = "";
            for (var i = 0; i < row.length; i++) {
                if (i == row.length - 1) {
                info = info + row[i];
                } else {
                info = info + row[i] + "\n";
                }
            }
            return info;
        },
        testResultFormat(val) {
            if (val == "inprocessing") {
                return "In Processing";
            }
            return val.toUpperCase();
        },
        // //定时器
        createuutRefreshTimer(){
            this.uutRefreshTimer = setInterval(this.getUutlist, Number(this.uutRefreshChoice)* 1000)  
        },
        // 改变刷新频率
        uutRefreshChoiceChange(val){
            clearInterval(this.uutRefreshTimer)
            this.uutRefreshTimer=null
            if(val == 'Never'){
                this.uutRefreshChoice = 1000000;

            }else{
                this.uutRefreshChoice = Number(val);
                
            }
            this.createuutRefreshTimer()
        },

        //选择改变后,将选择的行数据保存以待使用
        selectchange(val){
            
            this.form_command.data = [];
            if(val.length !=0){
                
                clearInterval(this.uutRefreshTimer) //清除定时器
                this.showuutrefresh = false //隐藏刷新频率调节选项
                this.showuutoperations = true; //显示uut操作按钮
                // 将所有勾选的行的id放入data
                for (var i = 0; i < val.length; i++) {
                    this.form_command.data.push(val[i].id);
                    }

            }else{
                this.createuutRefreshTimer()
                this.showuutrefresh=true
                this.showuutoperations = false
            }
        },
        getUutlist(val) {
            if(val =='first'){
                this.listloading = true
            }
            // 请求的查询参数要根据设置的分页数调整
            getuutlist(this.uut_list_offset,this.uut_list_limit,this.uut_list_order_by).then(response => {
                let res_result = response.data.results
                // console.log(response)

                
                for (var i = 0; i < res_result.length; i++) {
                    // 变换elapsed_time
                    res_result[i].elapsed_time = res_result[i].elapsed_time_str;
                    // 变换register_time
                    res_result[i].register_time = res_result[i].start_time_str;
                    // 变换current_item
                    if (res_result[i].current_item) {
                        res_result[i].current_item =
                        res_result[i].current_item +
                        "(" +
                        res_result[i].current_item_index +
                        "/" +
                        res_result[i].test_item_count +
                        ")";
                    }
                    // 变换active
                    if (res_result[i].status && res_result[i].status == "online") {
                        res_result[i].active = true;
                    } else {
                        res_result[i].active = false;
                    }
                }
                

                this.uut.list = res_result
                this.uut_list_count = response.data.count
                this.listloading = false
            })
        },
        ShowTestResult() {
            console.log('sucess')
        },
        checkButtonPermission,//按钮权限判断函数
        getmodulars(){
            getmodulars().then(response => {
                this.modulars = response.data.data
            })
        },
        displayUUTDetailInfo(uut_id, uut_pcid, uut_order){
            this.showuutdetailinfo = true
            this.uutdetailinfoloading = true
            this.uutDetailInfo.uut_id = uut_id

            //获取uutdetailinfo
            getuutdetailinfo(this.uutDetailInfo.uut_id).then(response => {
                var res_result = response.data.results;
                // 设置edit字段为false
                res_result = res_result.map(v => {
                    this.$set(v, "edit", false);
                    return v})
                //处理数据
                for (var i = 0; i < res_result.length; i++) {
                    /* 变换elapsed_time*/
                    var elapsed_time = res_result[i].elapsed_time;
                    var start_time = res_result[i].start_time;
                    var elapsed_time_str = "";
                    if (elapsed_time && elapsed_time != "0") {
                        elapsed_time_str = this.secondToHMS(elapsed_time);
                    } else if (start_time && start_time != 0) {
                        elapsed_time_str = this.calcElapsedTime(start_time);
                    } else {
                        elapsed_time_str = this.secondToHMS(0);
                    }
                    res_result[i].elapsed_time = elapsed_time_str;
                    /* 变化 expectation validation */
                    if (res_result[i].expectation && res_result[i].validation) {
                        res_result[i].expectation = this.webAddBr(
                        res_result[i].expectation
                        );
                        res_result[i].validation = this.webAddBr(res_result[i].validation);
                    }
                    if (res_result[i].result) {
                        res_result[i].result = this.testResultFormat(res_result[i].result);
                    }
                    }
                this.uutDetailInfo.detail_info= res_result
                this.uutDetailInfo.title_sn = uut_pcid
                this.uutDetailInfo.title_order = uut_order
                this.uutdetailinfoloading = false
                console.log(this.uutDetailInfo.detail_info)
            })
        },
        uutDetailInfoClose(){
            this.uutDetailInfo = {
                title_sn:'', //dialog 头部显示
                title_order:'', //dialog 头部显示
                uut_id:'', // 用于查询uutdetailinfo
                detail_info:null,
            }
            this.showuutdetailinfo=false
            this.uutdetailinfoloading = true
        }

    },
    computed: {
        uutlist: function(){
            return this.uut.list
        },
        tableheight: function(){
            return this.$store.getters.pageheight-190 +'px'
        },
        uutdetailtableheight: function(){
            return this.$store.getters.pageheight * 0.7 + 'px'
        }
    },
    watch: {
        // searchinput:function(){
        //     // alert('ok')
        //     this.uut.list = []
        // },
        // tableheight: () => {
        //     this.tableheight =this.$store.getters.pageheight
        // }
    },
}
</script>


<style lang="scss" scoped>
//参考 https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8
::v-deep .el-table td{
     padding: 0px;
 }
::v-deep  .el-table .test-table{
    padding-right: 0px;
    padding-left: 0px;
    padding-top: 10px;
    padding-bottom: 10px;
    white-space: pre-line;
}
::v-deep .refreshselect{
    height: 36px;
    .el-input--suffix .el-input__inner{
        height: 36px;
    }
}

.el-dropdown-link {
    cursor: pointer;
}
.el-dropdown-menu__item{
    padding: 0px;
}
.el-dropdown-item{
    width: 120px;
}
.el-input .el-input--suffix .el-input__inner{
    padding: 0px;
    height: 30px;
}
.el-input__icon {
    display: none;
}


.el-row {
    text-align: center;
    margin-bottom: 20px;
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    padding-bottom: 0px;
}
</style>