<template>
  <section>
    <el-col
      :span="24"
      class="toolbar"
      style="padding-bottom: 0px;"
    >
      <el-form
        :inline="true"
      >
        <el-form-item>
          状态选择：
          <el-select
            v-model="planStatusResult"
            multiple
            collapse-tags
            placeholder="状态"
            @change="changeStatusSelect"
            @remove-tag="removeStatusSelect"
          >
            <el-option
              label="全选"
              value="全选"
              @click.native="allStatusSelect"
            />
            <el-option
              v-for="item in planStatusSelect"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="showPlanList"
          >
            查看
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="showAddForm"
          >
            添加计划
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      v-loading="listLoading"
      :data="planList"
      highlight-current-row
      element-loading-background="rgba(0, 0, 0, 0.1)"
      element-loading-text="数据正在加载中"
      element-loading-spinner="el-icon-loading"
      style="width: 100%;"
    >

      <el-table-column
        prop="plan_id"
        label="ID"
      />
      <el-table-column
        prop="plan_account"
        label="用户"
      />
      <el-table-column
        prop="plan_create_date"
        label="开始时间"
      />
      <el-table-column
        prop="plan_completed_date"
        label="结束时间"
      />
      <el-table-column
        prop="plan_note"
        label="备注"
      />
      <el-table-column
        prop="plan_schedule"
        label="进度"
      />
      <el-table-column
        label="进度调节"
      >
        <template slot-scope="scope">
            <el-button v-if="!scope.row.adjustButtonVisible" type="primary" size="small" @click="adjustItem(scope.row.plan_id, scope.row.plan_account)">编辑状态</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog />

    <!--添加界面-->
    <el-dialog
      title="添加"
      :visible.sync="addFormVisible"
      :show-close="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="form"
        :model="addPlan"
        label-width="80px"
        :rules="addFormRules"
      >

        <el-form-item label="用户">
          <el-input v-model="addPlan.account" :disabled="true" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addPlan.note" />
        </el-form-item>
        <el-form-item label="进度">
          <el-input v-model="addPlan.schedule"  placeholder="%"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="addPlan.status" :disabled="true" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click.native="addBack"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          @click.native="addSubmit"
        >
          提交
        </el-button>
      </div>
    </el-dialog>

    <!--编辑进度界面-->
    <el-dialog
      title="更改"
      :visible.sync="adjustFormVisible"
      :show-close="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="form"
        :model="adjustPlan"
        label-width="80px"
      >
        <el-form-item label="ID">
          <el-input v-model="adjustPlan.id" :disabled="true" />
        </el-form-item>
        <el-form-item label="用户">
          <el-input v-model="adjustPlan.account" :disabled="true" />
        </el-form-item>
        <el-form-item label="进度">
          <el-input v-model="adjustPlan.schedule"  placeholder="%"/>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click.native="adjustBack"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          @click.native="adjustSubmit"
        >
          提交
        </el-button>
      </div>
    </el-dialog>

    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <el-pagination
        layout="total, prev, pager, next, jumper"
        :page-size="pageSizes"
        :total="total"
        style="float:right;"
        @current-change="handleCurrentChange"
      />
    </el-col>
  </section>
</template>

<script>
import { getPlanList, createPlan, adjustSchedule } from '../../api/plan'

export default {
  name: 'list',
  data () {
    return {
      // 计划状态 选中列
      planStatusResult: [],
      // 计划状态 选择列
      planStatusSelect: ['进行中', '已完成'],
      // 展示计划列表
      planList: [],
      addPlan: {
        account: '',
        note: '',
        schedule: '',
        status: '进行中'
      },
      adjustPlan: {
        id: 0,
        account: '',
        schedule: ''
      },
      total: 0,
      page: 1,
      pageSizes: 1,
      listLoading: false,
      addFormVisible: false, // 添加界面是否显示
      adjustButtonVisible: false, // 进度调节按钮是否显示
      adjustFormVisible: false, // 进度调节表单是否显示
      // 添加界面规则设定
      addFormRules: {
        account: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ],
        note: [
          {
            required: true,
            message: '请输入备注',
            trigger: 'blur'
          }
        ],
        schedule: [
          {
            required: true,
            message: '请输入进度%',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    this.showPlanList()
    this.setAccount()
  },
  methods: {
    setAccount: function () {
      var user
      let arr = document.cookie.split('; ')
      for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=')
        if (arr2[0] === 'C-username') {
          user = arr2[1]
        }
      }
      this.addPlan.account = user
      this.adjustPlan.account = user
    },
    handleCurrentChange (val) {
      this.page = val
      this.showPlanList()
    },

    // 显示添加表单
    showAddForm () {
      this.addFormVisible = true
    },

    // 开始添加
    addSubmit: function () {
      this.$confirm('是否创建该计划?', '提示', {
        type: 'warning'
      }).then(() => {
        var user
        let arr = document.cookie.split('; ')
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('=')
          if (arr2[0] === 'C-username') {
            user = arr2[1]
          }
        }

        let para = {
          'plan_account': this.addPlan.account.toString(),
          'plan_note': this.addPlan.note.toString(),
          'plan_schedule': this.addPlan.schedule.toString(),
          'plan_status': this.addPlan.status.toString(),
          'token': window.sessionStorage.getItem('jwt').toString(),
          'account': user.toString()
        }
        this.listLoading = true
        createPlan(para).then((res) => {
          // alert(res.result)
          if (res.result === 'SUCCESS') {
            this.$message({
              message: '创建计划成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '创建计划失败',
              type: 'failure'
            })
          }
          this.showPlanList()
          this.addFormVisible = false
          this.listLoading = false
        })
      })
    },

    // 退出添加
    addBack: function () {
      this.listLoading = false
      this.addFormVisible = false
    },

    // 改变 状态 选择
    changeStatusSelect (val) {
      if (!val.includes('全选') && val.length === this.planStatusSelect.length) {
        this.planStatusResult.unshift('全选')
      } else if (val.includes('全选') && (val.length - 1) < this.planStatusSelect.length) {
        this.planStatusResult = this.planStatusResult.filter((item) => {
          return item !== '全选'
        })
      }
    },

    // 移除 状态 选择
    removeStatusSelect (val) {
      if (val === '全选') {
        this.planStatusResult = []
      }
    },

    // 选择 所有 状态
    allStatusSelect () {
      if (this.planStatusResult.length < this.planStatusSelect.length) {
        this.planStatusResult = []
        this.planStatusSelect.map((item) => {
          this.planStatusResult.push(item)
        })
        this.planStatusResult.unshift('全选')
      } else {
        this.planStatusResult = []
      }
    },

    // 获取计划信息
    showPlanList () {
      var user
      let arr = document.cookie.split('; ')
      for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=')
        if (arr2[0] === 'C-username') {
          user = arr2[1]
        }
      }

      let para = {
        'status': this.planStatusResult.toString(),
        'token': window.sessionStorage.getItem('jwt').toString(),
        'account': user.toString()
      }

      this.listLoading = true
      getPlanList(para).then((res) => {
        this.planList = res.data
        this.total = res.count
        this.pageSizes = this.planList.length
        this.listLoading = false
      })
    },

    // 调节 进度 辅助函数
    adjustItem: function (planID, planAccount) {
      this.adjustFormVisible = true
      this.adjustPlan.id = planID
      this.adjustPlan.account = planAccount
    },

    // 开始 调节 进度
    adjustSubmit: function () {
      this.$confirm('是否更新进度?', '提示', {
        type: 'warning'
      }).then(() => {
        var user
        let arr = document.cookie.split('; ')
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('=')
          if (arr2[0] === 'C-username') {
            user = arr2[1]
          }
        }

        let para = {
          'plan_id': this.adjustPlan.id,
          'plan_account': this.adjustPlan.account.toString(),
          'plan_schedule': this.adjustPlan.schedule.toString(),
          'token': window.sessionStorage.getItem('jwt').toString(),
          'account': user.toString()
        }
        this.listLoading = true
        adjustSchedule(para).then((res) => {
          // alert(res.result)
          if (res.result === 'SUCCESS') {
            this.$message({
              message: '调节进度成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '调节进度失败',
              type: 'failure'
            })
          }
          this.showPlanList()
          this.adjustFormVisible = false
          this.listLoading = false
        })
      })
    },

    // 退出 调节 进度
    adjustBack: function () {
      this.listLoading = false
      this.adjustFormVisible = false
    }
  }
}

</script>

<style scoped>

</style>
