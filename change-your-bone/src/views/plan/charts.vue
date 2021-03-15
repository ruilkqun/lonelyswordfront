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
  </div>
</template>

<script>
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
    this.showSelectTimeResult()
  },
  methods: {
    showSelectTimeResult: function () {
      alert(this.selectTimeResult)
    }
  }
}
</script>

<style scoped>

</style>
