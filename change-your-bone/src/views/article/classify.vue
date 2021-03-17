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
            添加分类
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      v-loading="listLoading"
      :data="articleClassifyList"
      highlight-current-row
      element-loading-background="rgba(0, 0, 0, 0.1)"
      element-loading-text="数据正在加载中"
      element-loading-spinner="el-icon-loading"
      style="width: 100%;"
    >

      <el-table-column
        prop="classify_id"
        label="ID"
      />
      <el-table-column
        prop="classify_name"
        label="名称"
      />
      <el-table-column
        label="是否更改"
      >
        <template slot-scope="scope">
            <el-button v-if="!scope.row.isEditPropertyShow" type="primary" size="small" @click="editProperty(scope.row.$classify_id)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="是否保留"
      >
        <template slot-scope="scope">
            <el-button v-if="!scope.row.removeButtonVisible" type="danger" size="small" @click="removeItem(scope.row.classify_id)">删除</el-button>
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
        :model="addClassify"
        label-width="80px"
        :rules="addFormRules"
      >

        <el-form-item label="名称">
          <el-input v-model="addClassify.classify_name" />
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
        :model="removeClassify"
        label-width="80px"
      >
        <el-form-item label="ID">
          <el-input :disabled="true" v-model="removeClassify.classify_id" />
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
  import { createClassify,getClassifyList,removeClassify } from "../../api/article";

  export default {
    name: 'article-classify',
		data() {
			return {
			  addClassify: {
			    classify_name: '',
        },
        articleClassifyList: [],
        removeClassify: {
			    classify_id: 0,
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
					name: [
						{
						  required: true,
              message: '请输入分类名',
              trigger: 'blur'
						}
					],
				}
			}
		},
    mounted() {
				this.showClassifyList();
			},
    methods: {
      handleCurrentChange(val) {
				this.page = val;
				this.showClassifyList();
			},

      // 获取账户信息
      showClassifyList(){
          getClassifyList().then((res) => {
            this.articleClassifyList = res.data;
            this.total = res.count;
            this.pageSizes = this.articleClassifyList.length;
            this.listLoading = false;
        });
      },

      // 显示添加表单
      showAddForm() {
				this.addFormVisible = true;
			},

      // 开始添加
			addSubmit: function () {
        this.$confirm('是否添加该分类?', '提示', {
					type: 'warning'
				}).then(() => {
				  let para = {
				    "classify_name": this.addClassify.classify_name.toString()
          };
				  this.listLoading = true;
				  createClassify(para).then((res) => {
				    // alert(res.result)
            if (res.result === 'SUCCESS') {
              this.$message({
								message: '添加分类成功',
								type: 'success'
							});
            }else {
              this.$message({
								message: '添加分类失败',
								type: 'failure'
							});
            }
            this.showClassifyList();
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


      removeItem: function (classify_id){
        this.removeFormVisible = true;
        this.removeClassify.classify_id = classify_id;
      },


      // 开始删除
			removeSubmit: function () {
        this.$confirm('是否删除该分类?', '提示', {
					type: 'warning'
				}).then(() => {
				  let para = {
				    "classify_id": this.removeClassify.classify_id,
          };
				  this.listLoading = true;
				  removeClassify(para).then((res) => {
				    // alert(res.result)
            if (res.result === 'SUCCESS') {
              this.$message({
								message: '删除该分类成功',
								type: 'success'
							});
            }else {
              this.$message({
								message: '删除该分类失败',
								type: 'failure'
							});
            }
            this.showClassifyList();
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
