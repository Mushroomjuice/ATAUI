<template>
    <div :class="className" :style="{height:height,width:width}"> 
        
    </div>
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
      default: "300px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
      this.initChart(this.chartData.date, this.chartData.value);
  },
  methods: {
    initChart(date, value) {
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption({
        xAxis: {
          data: date,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        dataZoom: [{
            startValue: date.length%2==0?date[date.length/2]:date[date.length/2-0.5]
        }, {
            type: 'inside'
        }],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: true
          }
        },
        legend: {
          data: ["On-Line"]
        },
        series: [
          {
            name: "On-Line",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 1
                },
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            },
            data: value,
            animationDuration: 2800,
            animationEasing: "quadraticOut"
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