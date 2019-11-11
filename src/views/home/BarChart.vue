<template>
    <div :class="className" :style="{height:height,width:width}">
        
    </div>
</template>


<script>

import echarts from "echarts";

require("echarts/theme/macarons"); // echarts theme

const animationDuration = 6000;
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
      default: "300px"
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null,
      uut:{date:null,value:null},
      // uut: { running: [], fail: [], pass: [], date: [] }
    };
  },
  mounted(){
      this.initChart(this.chartData.date, this.chartData.value);
  },
  methods:{
    initChart(date, value) {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 30,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: date,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: true
            }
          }
        ],
        dataZoom: [
          {
            startValue: date.length%2==0?date[date.length/2]:date[date.length/2-0.5]
          },
          {
            type: "inside"
          },
          {
            type: "slider"
          }
        ],
        legend: {
          data: ["On-Line"]
        },
        series: [
          {
            name: "On-Line",
            itemStyle: {
              normal: {
                color: "#7BBCE8"
              }
            },
            type: "bar",
            stack: "vistors",
            barWidth: "50%",
            data: value,
            animationDuration
          }
        ]
      });
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.initChart(val.date, val.value);
      }
    }
  }
}
</script>