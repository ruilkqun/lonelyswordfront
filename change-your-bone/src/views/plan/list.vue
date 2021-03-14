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
            <el-button v-if="!scope.row.removeButtonVisible" type="primary" size="small" @click="removeItem(scope.row.user_id, scope.row.user_account, scope.row.user_phone)">编辑状态</el-button>
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
          <el-input v-model="addPlan.account" />
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
  import { getPlanList,createPlan } from '../../api/plan';

  export default {
    name: 'list',
		data() {
			return {
			  //计划状态 选中列
			  planStatusResult: [],
        //计划状态 选择列
			  planStatusSelect: ['进行中','已完成'],
        //展示计划列表
        planList: [],
			  addPlan: {
			    account: '',
          note: '',
          schedule: '',
          status: '进行中'
        },
				total: 0,
				page: 1,
        pageSizes: 1,
        listLoading: false,
        addFormVisible: false, // 添加界面是否显示
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
          ],
				}
			}
		},
    mounted() {
				this.showPlanList();
			},
    methods: {
      handleCurrentChange(val) {
				this.page = val;
				this.showPlanList();
			},


      // 显示添加表单
      showAddForm() {
				this.addFormVisible = true;
			},

      // 开始添加
			addSubmit: function () {
        this.$confirm('是否创建该计划?', '提示', {
					type: 'warning'
				}).then(() => {
				  let para = {
				    "plan_account": this.addPlan.account.toString(),
            "plan_note": this.addPlan.note.toString(),
            "plan_schedule": this.addPlan.schedule.toString(),
            "plan_status": this.addPlan.status.toString()
          };
				  this.listLoading = true;
				  createPlan(para).then((res) => {
				    // alert(res.result)
            if (res.result === 'SUCCESS') {
              this.$message({
								message: '创建计划成功',
								type: 'success'
							});
            }else {
              this.$message({
								message: '创建计划失败',
								type: 'failure'
							});
            }
            this.showPlanList();
            this.addFormVisible = false;
            this.listLoading = false;
        })
			})
      },

      // 退出添加
      addBack: function (){
        this.listLoading = false;
        this.addFormVisible = false;
      },


      // 改变 状态 选择
      changeStatusSelect(val) {
        if (!val.includes('全选') && val.length === this.planStatusSelect.length) {
          this.planStatusResult.unshift('全选')
        } else if (val.includes('全选') && (val.length - 1) < this.planStatusSelect.length) {
          this.planStatusResult = this.planStatusResult.filter((item) => {
            return item !== '全选'
          })
        }
      },

      // 移除 状态 选择
      removeStatusSelect(val) {
        if (val === '全选'){
          this.planStatusResult = []
        }
      },

      // 选择 所有 状态
      allStatusSelect() {
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
      showPlanList(){
        let para = {
          "status": this.planStatusResult.toString(),
        };
        this.listLoading = true;
          getPlanList(para).then((res) => {
            this.planList = res.data;
            this.total = res.count;
            this.pageSizes = this.planList.length;
            this.listLoading = false;
        });
      },
    }
	}

</script>

<style scoped>

</style>
