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
import { statisticPlan } from '../../api/plan'

import Highcharts from 'highcharts/highstock'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsDrilldown from 'highcharts/modules/drilldown'
import Highcharts3D from 'highcharts/highcharts-3d'

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts)
Highcharts3D(Highcharts)

export default {
  name: 'charts',
  data () {
    return {
      data_running: [],
      data_completed: [],
      categories: [],
      selectTimeResult: '',
      listLoading: false,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  mounted () {
    this.planChart()
  },
  methods: {
    showSelectTimeResult: function () {
      // alert(this.selectTimeResult)
      var user
      let arr = document.cookie.split('; ')
      for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=')
        if (arr2[0] === 'C-username') {
          user = arr2[1]
        }
      }

      let para = {
        'statistical_time': this.selectTimeResult.toString(),
        'token': window.sessionStorage.getItem('jwt').toString(),
        'account': user.toString()
      }
      // alert(para)
      this.listLoading = true
      statisticPlan(para).then((res) => {
        this.data_running = []
        this.data_completed = []
        this.categories = []

        for (var i = 0; i < res.statistical_time.length; i++) {
          this.categories.push(res.statistical_time[i].statistical_time.toString())
        }
        // this.categories.push(res.statistical_time[0].statistical_time.toString());
        // this.categories.push(res.statistical_time[1].statistical_time.toString());
        for (var k = 0; k < res.statistical_running_count.length; k++) {
          this.data_running.push(res.statistical_running_count[k].statistical_running_count)
        }
        // this.data_running.push(res.statistical_running_count[0].statistical_running_count);
        // this.data_running.push(res.statistical_running_count[1].statistical_running_count);
        for (var v = 0; v < res.statistical_completed_count.length; v++) {
          this.data_completed.push(res.statistical_completed_count[v].statistical_completed_count)
        }
        // this.data_completed.push(res.statistical_completed_count[0].statistical_completed_count);
        // this.data_completed.push(res.statistical_completed_count[1].statistical_completed_count);

        // alert(this.data_running)
        // alert(this.data_completed)

        this.listLoading = false
        this.planChart()
      })
    },

    planChart () {
      if (this.chart) {
        this.chart.destroy()
      }
      // 初始化 Highcharts 图表
      this.chart = new Highcharts.Chart('container', {
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
          categories: this.categories
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
          data: this.data_completed
        }, {
          name: '进行中',
          data: this.data_running
        }]
      })
    }
  }
}
</script>

<style scoped>

</style>
