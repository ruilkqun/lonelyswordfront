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
          <el-button
            size="primary"
            @click="showAddForm"
          >
            添加管理员
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      v-loading="listLoading"
      :data="userList"
      highlight-current-row
      element-loading-background="rgba(0, 0, 0, 0.1)"
      element-loading-text="数据正在加载中"
      element-loading-spinner="el-icon-loading"
      style="width: 100%;"
    >

      <el-table-column
        prop="user_id"
        label="ID"
      />
      <el-table-column
        prop="user_account"
        label="用户名"
      />
      <el-table-column
        prop="user_phone"
        label="手机号"
      />
      <el-table-column
        prop="user_note"
        label="备注"
      />
      <el-table-column
        prop="user_create_date"
        label="创建时间"
      />
      <el-table-column
        label="权限管理"
      >
        <template slot-scope="scope">
            <el-button v-if="!scope.row.isEditPropertyShow" type="primary" size="small" @click="editProperty(scope.$index, scope.row.cluster, scope.row.repair_ip, scope.row.report_date)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="是否保留"
      >
        <template slot-scope="scope">
            <el-button v-if="!scope.row.removeButtonVisible" type="danger" size="small" @click="removeItem(scope.row.user_id, scope.row.user_account, scope.row.user_phone)">删除</el-button>
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
        :model="addUser"
        label-width="80px"
        :rules="addFormRules"
      >

        <el-form-item label="用户名">
          <el-input v-model="addUser.account" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addUser.pwd" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="addUser.phone" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="addUser.note"
            type="textarea"
            placeholder="备注"
          />
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


    <!--删除界面-->
    <el-dialog
      title="删除"
      :visible.sync="removeFormVisible"
      :show-close="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="form"
        :model="removeUser"
        label-width="80px"
      >
        <el-form-item label="用户ID">
          <el-input :disabled="true" v-model="removeUser.id" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input :disabled="true" v-model="removeUser.account" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input :disabled="true" v-model="removeUser.phone" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click.native="removeBack"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          @click.native="removeSubmit"
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
  import { createAccount,getAccountList,removeAccount } from "../../api/user";

  export default {
    name: 'user',
		data() {
			return {
			  addUser: {
			    account: '',
          pwd: '',
          note: '',
          phone: ''
        },
        userList: [],
        removeUser: {
			    id: 0,
			    account: '',
          phone: ''
        },
				total: 0,
				page: 1,
        pageSizes: 1,
        listLoading: false,
        addFormVisible: false, // 添加界面是否显示
        removeFormVisible: false, // 删除界面是否显示
        removeButtonVisible: false, // 删除按钮是否显示
        // 添加界面规则设定
				addFormRules: {
					account: [
						{
						  required: true,
              message: '请输入账号',
              trigger: 'blur'
						}
					],
          pwd: [
            {
              required: true,
              message: '请输入密码',
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
          phone: [
            {
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            }
          ],
				}
			}
		},
    mounted() {
				this.showAccountList();
			},
    methods: {
      handleCurrentChange(val) {
				this.page = val;
				this.showAccountList();
			},

      // 获取账户信息
      showAccountList(){
          getAccountList().then((res) => {
            this.userList = res.data;
            this.total = res.count;
            this.pageSizes = this.userList.length;
            this.listLoading = false;
        });
      },

      // 显示添加表单
      showAddForm() {
				this.addFormVisible = true;
			},

      // 开始添加
			addSubmit: function () {
        this.$confirm('是否创建该用户?', '提示', {
					type: 'warning'
				}).then(() => {
				  let para = {
				    "user_account": this.addUser.account.toString(),
            "user_password": this.addUser.pwd.toString(),
            "user_phone": this.addUser.phone.toString(),
            "user_note": this.addUser.note.toString()
          };
				  this.listLoading = true;
				  createAccount(para).then((res) => {
				    // alert(res.result)
            if (res.result === 'SUCCESS') {
              this.$message({
								message: '创建用户成功',
								type: 'success'
							});
            }else {
              this.$message({
								message: '创建用户失败',
								type: 'failure'
							});
            }
            this.showAccountList();
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


      removeItem: function (user_id,user_account,user_phone){
        this.removeFormVisible = true;
        this.removeUser.id = user_id;
        this.removeUser.account = user_account;
        this.removeUser.phone = user_phone;
      },


      // 开始删除
			removeSubmit: function () {
        this.$confirm('是否删除该用户?', '提示', {
					type: 'warning'
				}).then(() => {
				  let para = {
				    "user_id": this.removeUser.id,
				    "user_account": this.removeUser.account.toString(),
            "user_phone": this.removeUser.phone.toString()
          };
				  this.listLoading = true;
				  removeAccount(para).then((res) => {
				    // alert(res.result)
            if (res.result === 'SUCCESS') {
              this.$message({
								message: '删除用户成功',
								type: 'success'
							});
            }else {
              this.$message({
								message: '删除用户失败',
								type: 'failure'
							});
            }
            this.showAccountList();
            this.removeFormVisible = false;
            this.listLoading = false;
        })
			})
      },

      // 退出删除
      removeBack: function (){
        this.listLoading = false;
        this.removeFormVisible = false;
      },
    }
  }

</script>

<style scoped>

</style>
