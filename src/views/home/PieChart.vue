<template>
    
    <div :class="className" :style="{height:height,width:width}"></div>
    
</template>

<script>
import echarts from "echarts";

require("echarts/theme/macarons"); // echarts theme

export default {
    props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "180px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      default:() =>{
          return {free:null, usage:null}
      }
    }
  },
  data() {
    return {
      chart: null
    };
  },
  methods:{
    initChart(free, usage) {
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption({
        legend: {
          data: ["Free", "Usage"]
        },
        tooltip: {
          formatter: "{b} : {d}%"
        },
        series: [
          {
            name: "Server Information",
            type: "pie",
            radius: "50%",
            data: [
              {
                value: free,
                name: "Free",
                itemStyle: {
                  normal: {
                    color: "#7BBCE8"
                  }
                }
              },
              {
                value: usage,
                name: "Usage",
                itemStyle: {
                  normal: {
                    color: "#D4D4D4"
                  }
                }
              }
            ]
          }
        ]
      });
    }
  },
  mounted () {
    this.initChart(this.chartData.free, this.chartData.usage);
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.initChart(val.free, val.usage);
      }
    }
  }
}
</script>