<template>
    <div>
        <el-row>
            <el-col :span="8">
                <el-button icon="el-icon-edit" type="primary" @click="createGroupPermission">
                    {{$t('permission.create')}}
                </el-button>
            </el-col>
        </el-row>
        <el-table 
            :data="groupData"
            @row-dblclick='tableRowDbclick'
            :height="tableheight"
            
        >
            <el-table-column prop='group' :label="$t('permission.group')">

            </el-table-column>
            <el-table-column prop="date" :label="$t('permission.date')"></el-table-column>
            <el-table-column
                prop="user" :label="$t('permission.user')"
            >
            </el-table-column>
        </el-table>

        <el-dialog
            :visible.sync='showPermissionEdit'
            width="70%"
        >
            <div slot="title">
                <h1>Group permission</h1>
            </div>

            <el-table :data="groupDetailData" :height="detailtableheight">
                <el-table-column prop="api">

                </el-table-column>
                <el-table-column prop="">
                    <template slot-scope="scope">
                        <el-checkbox-group v-model="scope.row.permissions" @change="handleCheckedPermissionChange(scope.row)">
                            <el-checkbox v-for="item in AllPermission" :label="item" :key="item">
                                {{item}}
                            </el-checkbox>
                            
                        </el-checkbox-group>
                        <el-button type="text" 
                            @click="submitPermissionChange(scope.row)" 
                            class="submitbutton"
                            v-if="scope.row.changed"
                        >
                            <div>
                                <svg-icon icon-class='submit'></svg-icon>
                            </div>
                        </el-button>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    min-width="10%"
                    
                >
                    <template >
                        <el-button type="text" @click="deletePermission">
                            <div>
                                <svg-icon icon-class='delete'></svg-icon>
                            </div>
                        </el-button>
                        
                            
                        
                    </template>
                </el-table-column> -->
            </el-table>
            <div slot="footer">
                <el-button>
                    {{$t('permission.close')}}
                </el-button>
            </div>
        </el-dialog>

        



    </div>
    
    
</template>

<script>
import axios from 'axios'



export default {
    
    name:'Rolesconfig',
    data() {
        return {
            
            AllPermission:['view','add','change','delete'],

            showPermissionEdit:false,
            showcreateGroupPermissionPage:false,
            groupDetailData:[
                
            ],

            groupData:[
               
            ],

            createPermissonData:{
                id:'',
                group:'',
                api:'',
                permissions:[],
                date:'',
                user:''
            },

            Ispermissionschanged:false

        }
    },
    mounted() {
        this.getAllPermissionConfig()
    },
    methods: {

        //页面加载后获取所有的权限配置
        getAllPermissionConfig(){
             axios({
                 method:'get',
                 url:'http://192.168.128.50:8080/api_permission/info/',
                 headers:{ Authorization: 'token ' + '2eafca6c5b13e91c2ded1a083918c41bcd9e7bc4'},
                 
             }).then(res => {
                console.log(res)
                var res_result = res.data.results
                res_result = res_result.map(v => {
                    this.$set(v, "changed", false);
                    return v;
                    });
                this.groupData = res_result
             }).catch(err =>{
                 console.log(err)
             })
        },

        //删除permission
        deletePermission(){

        },
        //提交权限修改
        submitPermissionChange(row){
            console.log(row)
            row.changed=false
        },
        // 创建新权限
        createGroupPermission(){
            this.showcreateGroupPermissionPage = true
        },
        //权限信息改变时
        handleCheckedPermissionChange(val){
            console.log(this.groupDetailData)
            console.log(val)
            val.changed = true
            
        },
        // 双击行
        tableRowDbclick(val){
            console.log(val)
            this.showPermissionEdit = true
        }
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
    .el-checkbox-group{
        display: inline;
    }

    .submitbutton{
        padding-left:12%;
        padding-top:0px;
        padding-bottom:0px
    }
</style>