<template>
<!--  <div>-->
<!--    开始时间：-->
<!--    <el-time-select-->
<!--    :picker-options="{-->
<!--      start: '08:30',-->
<!--      step: '00:15',-->
<!--      end: '18:30'-->
<!--    }"-->
<!--    placeholder="选择时间">-->
<!--    </el-time-select>-->
<!--    结束时间：-->
<!--    <el-time-select-->
<!--    :picker-options="{-->
<!--      start: '08:30',-->
<!--      step: '00:15',-->
<!--      end: '18:30'-->
<!--    }"-->
<!--    placeholder="结束时间">-->
<!--    </el-time-select>-->
<!--  </div>-->
  <div class="block">
    范围选择：
     <el-date-picker
      v-model="selectTimeResult"
      type="datetimerange"
      value-format="yyyy-MM-dd HH:mm:ss"
      format="yyyy-MM-dd HH:mm:ss"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      placeholder="选择时间"
      :picker-options="pickerOptions"
      :default-time="['00:00:00']">
    </el-date-picker>
    <el-button
        type="primary"
        @click="showSelectTimeResult"
    >
      查看
    </el-button>

    <div>
      <br />
      <br />
      <div id="container" style="width: 85%;height: 80%;position: absolute;"></div>
    </div>
  </div>

</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';

HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

export default {
  name: "charts",
  data(){
   return {
     selectTimeResult: '',
     pickerOptions: {
       disabledDate(time) {
         return time.getTime() > Date.now();
       }
     },
   }
  },
  mounted() {
    this.planChart();
  },
  methods: {
    showSelectTimeResult: function () {
      alert(this.selectTimeResult)
    },

    planChart() {
      if (this.chart) {
        this.chart.destroy();
      }
      // 初始化 Highcharts 图表
      this.chart = new Highcharts.Chart("container", {
          chart: {
            // backgroundColor: '#1E90FF',
            backgroundColor: {
                linearGradient: [0, 0, 500, 500],
                stops: [
                    [0, 'rgb(255, 255, 255)'],
                    [1, 'rgb(240, 255, 240)']
                ]
            },
            type: 'line'
          },
          title: {
            text: '计划执行情况'
          },
          subtitle: {
            text: '数据来源: postgresql plan_statistic'
          },
          xAxis: {
            categories: ['2021-03-13', '2021-03-14', '2021-03-15', '2021-03-16']
          },
          yAxis: {
            title: {
              text: '总数'
            }
          },
          plotOptions: {
            line: {
              dataLabels: {
                // 开启数据标签
                enabled: true
              },
              // 关闭鼠标跟踪，对应的提示框、点击事件会失效
              enableMouseTracking: false
            }
          },
          series: [{
            name: '已完成',
            data: [7.0, 6.9, 9.5, 14.5]
          }, {
            name: '进行中',
            data: [3.9, 4.2, 5.7, 8.5]
          }]
        });
    }
  }
}
</script>

<style scoped>

</style>
