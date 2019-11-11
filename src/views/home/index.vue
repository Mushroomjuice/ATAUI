<template>
    <div>
        <el-card>
            <el-row>
                <el-col :span="24">
                    <el-card>
                        <div slot="header">
                            <h1 style="margin:1px;text-align:left;">{{$t('main.server_info')}}</h1>
                        </div>
                        <div style="height:217px;">
                        <el-row>
                            <el-col :span="8">
                            <pie-chart :chart-data="server_info.cpu"></pie-chart>
                            <strong>CPU</strong>
                            </el-col>
                            <el-col :span="8">
                            <pie-chart :chart-data="server_info.memory"></pie-chart>
                            <strong>Memory</strong>
                            </el-col>
                            <el-col :span="8">
                            <pie-chart :chart-data="server_info.hdd"></pie-chart>
                            <strong>HDD</strong>
                            </el-col>
                        </el-row>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
        <el-card>
            <el-row>
                <el-col :span="15">
                    <el-card style="margin-left:8px;text-align: left;">
                        <div slot="header" class="clearfix">
                        <el-row>
                            <el-col :span="18">
                                <h1 style="margin:1px;text-align: left;">{{$t('main.uut_info')}}</h1>
                            </el-col>
                        </el-row>
                        </div>
                        <div style="height:300px">
                            <bar-chart :chart-data="uut_info"></bar-chart>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="9">
                    <el-card>
                        <div slot="header">
                            <el-row>
                                <el-col :span="20">
                                    <h1 style="margin:1px;text-align: left;">{{$t('main.station_info')}}</h1>
                                </el-col>
                                <el-col :span="4" style="height: 20px">
                                    <el-button
                                        style="margin:1px;padding:5px;width:80px;"
                                        type="primary"
                                        @click="touutlist(production.name+' '+production.ip)"
                                    >{{$t('main.conn_server')}}</el-button>
                                </el-col>
                            </el-row>
                        </div>
                        <div style="height:300px;text-align:left">
                            <el-row>
                                <el-col :span="6" style="text-align:left">
                                    <h3>{{$t('main.station_name')}}:</h3>
                                </el-col>
                                <el-col :span="6" style="text-align:left">
                                    <h3>{{production.name}}</h3>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6" style="text-align:left">
                                    <h3>{{$t('main.station_ip')}}:</h3>
                                </el-col>
                                <el-col :span="6" style="text-align:left">
                                    <h3>{{production.ip}}</h3>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6" style="text-align:left">
                                    <h3>{{$t('main.number')}}:</h3>
                                </el-col>
                                <el-col :span="6" style="text-align:left">
                                    <h3>{{production.unit}}</h3>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6" style="text-align:left">
                                    <h3>{{$t('main.status')}}:</h3>
                                </el-col>
                                <el-col :span="6" style="text-align:left">
                                    <h3>{{production.status}}</h3>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="6" style="text-align:left">
                                    <h3>{{$t('main.active')}}:</h3>
                                </el-col>
                                <el-col :span="6" style="text-align:left">
                                    <h3>
                                        <svg-icon icon-class='inprocessing' class="inprocessing" style="display:inline-block" v-if="production.status=='Running...'"></svg-icon>
                                        <svg-icon icon-class='fail' class="fail" v-else></svg-icon>
                                    </h3>
                                </el-col>
                            </el-row>
                        </div>
                        
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
        <el-footer height="10px">
            Copyright ©2019 AMAX Information Technologies, Inc. All rights reserved.
            Powered by AMAX ATA team, web
        </el-footer>
    </div>
</template>
<script>
import PieChart from './PieChart'
import BarChart from './BarChart'
export default {
    name: 'DashBoard',
    components:{
        PieChart,
        BarChart
    },
    data() {
        return {
            server_info: {
                cpu: { free: 103124470, usage: 1802706 },
                memory: { free: 2888520, usage: 1150008 },
                hdd: { free: 65615556608, usage: 38486544384 }
            },
            uut_info:{
                date:["20190815",
                        "20190816",
                        "20190817",
                        "20190818",
                        "20190819",
                        "20190820",
                        "20190821",
                        "20190822",
                        "20190823",
                        "20190824",
                        "20190825",
                        "20190826",
                        "20190827",
                        "20190828",
                        "20190829",
                        "20190830",
                        "20190831",
                        "20190901",
                        "20190902",
                        "20190903",
                        "20190904",
                        "20190905",
                        "20190906",
                        "20190907",
                        "20190908",
                        "20190909",
                        "20190910",
                        "20190911",
                        "20190912",
                        "20190913",
                        "20190914",
                        "20190915",
                        "20190916",
                        "20190917",
                        "20190918",
                        "20190919",
                        "20190920",
                        "20190921",
                        "20190922",
                        "20190923",
                        "20190924",
                        "20190925",
                        "20190926",
                        "20190927",
                        "20190928",
                        "20190929",
                        "20190930",
                        "20191001",
                        "20191002",
                        "20191003",
                        "20191004",
                        "20191005",
                        "20191006",
                        "20191007",
                        "20191008",
                        "20191009",
                        "20191010",
                        "20191011",
                        "20191012",
                        "20191013",
                        "20191014",
                        "20191015",
                        "20191016",
                        "20191017",
                        "20191018",
                        "20191019",
                        "20191020",
                        "20191021",
                        "20191022",
                        "20191023",
                        "20191024",
                        "20191025",
                        "20191026",
                        "20191027",
                        "20191028",
                        "20191029",
                        "20191030",
                        "20191031",
                        "20191101",
                        "20191102",
                        "20191103",
                        "20191104",
                        "20191105",
                        "20191106",
                        "20191107",
                        "20191108",
                        "20191109",
                        "20191110",
                        "20191111"],
                value:[ 9,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0]
            },
            production:{
                "name": "localhost.localdomain",
                "ip": "172.16.1.1",
                "unit": 0,
                "status": "Running..."
            }
            
        }
    },
    methods:{
        touutlist(val){
            this.$storage.setstorage("PRODUCTION", val)
            this.$router.push({ path: "/uutlist" })

        }

    }
}
</script>