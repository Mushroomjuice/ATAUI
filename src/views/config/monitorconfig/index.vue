<template>
    <div>
        <el-row>
            <el-col :span="8">
                <el-button icon="el-icon-edit" type="primary" @click="ShowCreatePage">
                    {{$t('itemconfig.create')}}
                </el-button>
                
            </el-col>
            <el-col :span="5" :offset="11">
                <el-input placeholder="搜索" v-model="searchinput" clearable="true">
                    <el-button slot="append" icon="el-icon-search" @click="SearchFromServer">
                    </el-button>
                </el-input>
            </el-col>
        </el-row>

        <el-table
            :data="itemlist"
        >
            <el-table-column type="selection" min-width="10%">
            </el-table-column>
            <el-table-column label='Name' prop='name'>
            </el-table-column>
            <el-table-column label='description' prop='description'>
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
            <el-table-column label='user' prop="user">
            </el-table-column>
            <el-table-column label='date' prop='date'>
            </el-table-column>

        </el-table>

        <el-dialog
            :visible.sync="showcreatepage"
            width="70%"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
        >
            <div slot="title">
                <h1 style="margin:4px">{{$t('itemconfig.createtip')}}</h1>
            </div>
            <el-form
                :model="createdata"
                ref='createform'
                :rules="rules"
            >
                <el-form-item label="名称">
                    <el-input v-model="createdata.name"></el-input>
                </el-form-item>
                <el-form-item label="英语描述">
                    <el-input v-model="createdata.ENdiscription"></el-input>
                </el-form-item>
                <el-form-item label="中文描述">
                    <el-input v-model="createdata.ZHdiscription"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>


    </div>
</template>

<script>
export default {
    name:'MonitorConfig',
    
    data() {
        return {
            searchinput:'',
            showcreatepage:false,
            createdata:{
                name:'',
                ENdiscription:'',
                ZHdiscription:'',

            },
            itemlist:[
                {
                    "id": "BBU.20181007",
                    "name": "BBU_CHECK",
                    "path": "raid.bbu_check",
                    "class_name": "BBU",
                    "description": {
                        "en": "Check UUT's BBU",
                        "zh": "检查UUT的BBU"
                    },
                    "config": {},
                    "user": "ata",
                    "date": "2019-04-19T16:49:02.317000",
                    "display": true,
                    "usable": true,
                    "note": "test"
                },
                {
                    "id": "BIOS.20180906",
                    "name": "BIOS",
                    "path": "bios.bios",
                    "class_name": "BIOS",
                    "description": {
                        "en": "Check BIOS version with BOM",
                        "zh": "检查BIOS版本号"
                    },
                    "config": {},
                    "user": "ata",
                    "date": "2019-04-19T16:49:01.940000",
                    "display": true,
                    "usable": true,
                    "note": "pass"
                },
                {
                    "id": "BIOS-TIME-CHECK.20181006",
                    "name": "BIOS-TIME-CHECK",
                    "path": "bios.bios_time_check",
                    "class_name": "BIOSTime",
                    "description": {
                        "en": "check bios power time",
                        "zh": "检查UUT的主板时间"
                    },
                    "config": {},
                    "user": "ata",
                    "date": "2019-04-19T16:49:02.309000",
                    "display": true,
                    "usable": true,
                    "note": "test"
                }

            ],

            rules:{
                name:{required: true, message: '请输入名称', trigger: 'blur'},
                ENdiscription:{required: true, message: '请输入描述', trigger: 'blur'},
                ZHdiscription:{required: true, message: '请输入描述', trigger: 'blur'}
            },
        }
    },
    methods:{
        ShowCreatePage(){
            this.showcreatepage=true
        },
        SearchFromServer(){

        }
    },




}
</script>