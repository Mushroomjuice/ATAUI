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
                <el-input v-model="searchinput">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4" :offset="20" v-else>
                <el-input v-model="searchinput">
                    <el-button slot="append" icon="el-icon-search"></el-button>
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
            
           
            >
            <el-table-column type='selection'>

            </el-table-column>
            <el-table-column label="register_time" prop="register_time" sortable="true" :show-overflow-tooltip="true">

            </el-table-column>
            <el-table-column label="order" prop="order" :show-overflow-tooltip="true" >

            </el-table-column>
            <el-table-column label="PCID" prop="pcid" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="MAC/SN" prop="mac" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="Item" prop="current_item" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="MES" prop="route_step" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="Item" prop="current_item" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="RESULT" prop="result">
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
            <el-table-column label="elapsed_time" prop="elapsed_time" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
        <el-dialog
        :visible.sync="showuutdetailinfo"
        
        >
            
        </el-dialog>
        
            <el-row>
            <!-- 定时器 -->
            <el-col :span="10" style="text-align:left">
                
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
            <el-col :span="4" :offset="1" >
                <el-pagination>

                </el-pagination>
            </el-col>
        </el-row>
        
        
    </div>
</template>
<script>
import {getuutlist,getmodulars,getuutdetailinfo} from '@/api/uut'
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
            uutDetailInfo:{
                title_sn:'',
                title_order:'',
                uut_id:'',
                detail_info:null,
            }
            
            
        }
    },
    created() {

        //提前请求数据，提升用户体验
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
            
            getuutlist().then(response => {
                this.uut.list = response.data.results
                // console.log(response)
                this.listloading = false
            }).catch(error => {
                console.log(error)
            })
        },
        ShowTestResult() {
            console.log('sucess')
        },
        checkButtonPermission,//按钮权限判断函数
        getmodulars(){
            getmodulars().then(response => {
                this.modulars = response.data.data
                
            }).catch(error => {
                console.log(error)
            })

        },
        displayUUTDetailInfo(uut_id, uut_pcid, uut_order){
            
            this.showuutdetailinfo = true
            this.uutdetailinfoloading = true
            getuutdetailinfo().then(response => {
                response.data.results
            })
            console.log(uut_id, uut_pcid, uut_order)
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


<style lang="scss" scoped>
//参考 https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8
::v-deep .el-table td{
     padding: 0px;
 }
::v-deep .el-table .test-table{
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