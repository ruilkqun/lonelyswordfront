<template>
  <section>
    <el-col
      :span="24"
      class="toolbar"
      style="padding-bottom: 0px;"
    >
      <el-form
        :inline="true"
        :model="filters"
      >
        <el-form-item>
          集群代号：
          <el-select
            v-model="clusters"
            multiple
            collapse-tags
            placeholder="cluster"
            @change="changeCluster"
            @remove-tag="removeClusterTag"
          >
            <el-option
              label="全选"
              value="全选"
              @click.native="selectClusterAll"
            />
            <el-option
              v-for="item in data1"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          维修状态：
          <el-select
            v-model="statusitems"
            multiple
            collapse-tags
            placeholder="status"
            @change="changeStatus"
            @remove-tag="removeStatusTag"
          >
            <el-option
              label="全选"
              value="全选"
              @click.native="selectStatusAll"
            />
            <el-option
              v-for="item in data3"
              :key="item.status"
              :label="item.status"
              :value="item.status"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          维修类型：
          <el-select
            v-model="reasonitems"
            multiple
            collapse-tags
            placeholder="type"
            @change="changeReason"
            @remove-tag="removeReasonTag"
          >
            <el-option
              label="全选"
              value="全选"
              @click.native="selectReasonAll"
            />
            <el-option
              v-for="item in data5"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            size="primary"
            @click="showRepairIPEdit"
          >
            添加
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="info"
            @click="getList"
          >
            查看
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      v-loading="listLoading"
      :data="data2"
      highlight-current-row
      element-loading-background="rgba(0, 0, 0, 0.1)"
      element-loading-text="数据正在加载中"
      element-loading-spinner="el-icon-loading"
      style="width: 100%;"
    >
      <el-table-column
        type="index"
        label="Index"
      />
      <el-table-column
        prop="cluster"
        label="集群代号"
      />
      <el-table-column
        prop="repair_groups"
        label="所属组"
      />
      <el-table-column
        prop="repair_ip"
        label="IP"
      />
      <el-table-column
        prop="report_date"
        label="上报时间"
      />
      <el-table-column
        prop="repair_date"
        label="修复时间"
      />
      <el-table-column
        prop="repair_cycle"
        label="修复周期"
      />
      <el-table-column
        prop="repair_content"
        label="上报原因"
      />

      <el-table-column
        prop="repair_type"
        label="维修类型"
      >
      </el-table-column>

      <el-table-column
        prop="repair_name"
        label="上报人"
      />
      <el-table-column
        prop="repair_status"
        label="维修状态"
        width="140"
      />
      <el-table-column
        prop="repair_component"
        label="维修组件"
      />
      <el-table-column
        label="状态修改"
      >
        <template scope="scope">
          <el-button
            type="danger"
            size="small"
            @click="updateRepair(scope.$index, scope.row.cluster, scope.row.repair_ip, scope.row.report_date)"
          >
            更改
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="误填修改"
      >
        <template slot-scope="scope">
            <el-button v-if="!scope.row.isEditPropertyShow" type="primary" size="small" @click="editProperty(scope.$index, scope.row.cluster, scope.row.repair_ip, scope.row.report_date)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog />


    <!--添加界面-->
    <el-dialog
      title="添加"
      :visible.sync="editFormVisible"
      :show-close="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :rules="editFormRules"
      >
        <!--        <el-form-item label="集群代号">-->
        <!--          <el-input v-model="form.cluster"></el-input>-->
        <!--		    </el-form-item>-->
        <el-form-item label="集群">
          <el-select
            v-model="form.cluster"
            multiple
            collapse-tags
            placeholder="cluster"
            @change="changeCluster"
            @remove-tag="removeClusterTag"
          >
            <el-option
              v-for="item in data1"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属组">
          <el-select
            v-model="form.repair_groups"
            multiple
            collapse-tags
            placeholder="group"
            @change="changeGroups"
            @remove-tag="removeGroupsTag"
          >
            <el-option
              v-for="item in data7"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="维修类型">
          <el-select
            v-model="form.repair_type"
            multiple
            collapse-tags
            placeholder="repair_type"
            @change="changeReason"
            @remove-tag="removeReasonTag"
          >
            <el-option
              v-for="item in data5"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="维修组件">
          <el-select
            v-model="form.repair_component"
            multiple
            collapse-tags
            placeholder="repair_component"
            @change="changeComponent"
            @remove-tag="removeComponentTag"
          >
            <el-option
              v-for="item in data6"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="维修列表">
          <el-input
            v-model="form.repair_list"
            type="textarea"
            placeholder="节点IP列表，以换行符分开"
          />
        </el-form-item>
        <el-form-item label="维修说明">
          <el-input v-model="form.repair_content" />
        </el-form-item>
        <el-form-item label="提交人">
          <el-input v-model="form.repair_name" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          :loading="editLoading"
          @click.native="backEdit"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          :loading="editLoading"
          @click.native="editSubmit"
        >
          提交
        </el-button>
      </div>
    </el-dialog>


    <!--编辑界面-->
    <el-dialog
      title="添加"
      :visible.sync="updateMistakeShow"
      :show-close="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :rules="editFormRules"
      >
        <!--        <el-form-item label="集群代号">-->
        <!--          <el-input v-model="form.cluster"></el-input>-->
        <!--		    </el-form-item>-->
        <el-form-item label="集群">
          <el-input :disabled="true" v-model="form.cluster" />
        </el-form-item>
        <el-form-item label="IP">
          <el-input :disabled="true" v-model="form.repair_ip" />
        </el-form-item>
        <el-form-item label="上报时间">
          <el-input :disabled="true" v-model="form.report_date" />
        </el-form-item>
        <el-form-item label="维修类型">
          <el-select
            v-model="form.repair_type"
            multiple
            collapse-tags
            placeholder="repair_type"
            @change="changeReason"
            @remove-tag="removeReasonTag"
          >
            <el-option
              v-for="item in data5"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          :loading="editLoading"
          @click.native="backEdit"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          :loading="editLoading"
          @click.native="UpdateMistakeSubmit"
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
  import { getClusterList, getStatusList, getRepairList, updateRepairList, writeRepairList, getRepairAllList, updateMistake } from "../../api/user";

  export default {
    name: 'user',
		data() {
			return {
        // eslint-disable-next-line no-mixed-spaces-and-tabs
			  form: {
			    cluster: '',
          repair_list: [],
          repair_content: '',
          repair_name: '',
          repair_type: '',
          repair_component: '',
          repair_ip: '',
          report_date: '',
          repair_groups: '',
        },
				filters: {
				},
				data1: [],
        data2: [],
        data3: [],
        data5: ["硬盘","内存","主板","电源","CPU","GPU","返厂"],
        data6: ["lotus","w_n-poster","w_d-poster","lotus-server","lotus-message","worker","storage","其它"],
        data7: ["颜超","赵李波"],
				total: 0,
				page: 1,
        pageSizes: 1,
        flag: 0,
        listLoading: false,
        detailShow: false,//编辑界面是否显示
        editFormVisible: false,
				editLoading: false,

        updateMistakeShow: false, // 误填修改界面

        isEditPropertyShow: false,

				editFormRules: {
					nodelist: [
						{ required: true, message: '请输入Nodes列表', trigger: 'blur' }
					]
				},
        //编辑界面数据
				editForm: {
					nodelist: []
				},

				clusters: [],//集群列表选中列
        statusitems: [], //配置状态选项列表
        reasonitems: [], //维修原因选项列表
        componentitems: [], // 维修组件选项列表
        groups_item: [],
			}
		},
    mounted() {
				this.getCluster();
				this.getStatus();
				this.getAllList();
			},
    methods: {
      handleCurrentChange(val) {
				this.page = val;
				this.getList();
			},

      getCluster(){
            getClusterList().then((res) => {
              this.data1 = res.data
              this.listLoading = false;
				  });
      },


      getStatus(){
            getStatusList().then((res) => {
              this.data3 = res.data
              this.listLoading = false;
				  });
      },

      updateRepair: function (index, cluster, repair_ip, report_date){
        this.$confirm('确认机器已经修好了吗?', '提示', {
					type: 'warning'
				}).then(() => {
				  this.listLoading = true;
				  let para = {
				    "cluster": cluster.toString(),
            "repair_ip": repair_ip.toString(),
            "report_date": report_date.toString(),
          };
				  updateRepairList(para).then((res) => {
				    this.listLoading = false;
				    if (res.data === '0') {
              this.$message({
								message: '状态更新成功',
								type: 'success'
							});
            }else {
              this.$message({
								message: '状态更新失败',
								type: 'failure'
							});
            }
				    this.getList();
				    this.getStatus();
				    this.getList();
          });
        }).catch(() => {

        });
      },


      selectClusterAll() {
        if (this.clusters.length < this.data1.length) {
          this.clusters = []
          this.data1.map((item) => {
            this.clusters.push(item)
          })
          this.clusters.unshift('全选')
        } else {
          this.clusters = []
        }
      },


      selectStatusAll() {
        if (this.statusitems.length < this.data3.length) {
          this.statusitems = []
          this.data3.map((item) => {
            this.statusitems.push(item.status)
          })
          this.statusitems.unshift('全选')
        } else {
          this.statusitems = []
        }
      },

      selectReasonAll() {
        if (this.reasonitems.length < this.data5.length) {
          this.reasonitems = []
          this.data5.map((item) => {
            this.reasonitems.push(item)
          })
          this.reasonitems.unshift('全选')
        } else {
          this.reasonitems = []
        }
      },


      selectComponentAll() {
        if (this.componentitems.length < this.data6.length) {
          this.componentitems = []
          this.data6.map((item) => {
            this.componentitems.push(item)
          })
          this.componentitems.unshift('全选')
        } else {
          this.componentitems = []
        }
      },

      changeCluster(val) {
        if (!val.includes('全选') && val.length === this.data1.length) {
          this.clusters.unshift('全选')
        } else if (val.includes('全选') && (val.length - 1) < this.data1.length) {
          this.clusters = this.clusters.filter((item) => {
            return item !== '全选'
          })
        }
      },

      changeStatus(val) {
        if (!val.includes('全选') && val.length === this.data3.length) {
          this.statusitems.unshift('全选')
        } else if (val.includes('全选') && (val.length - 1) < this.data3.length) {
          this.statusitems = this.statusitems.filter((item) => {
            return item !== '全选'
          })
        }
      },

      changeReason(val) {
        if (!val.includes('全选') && val.length === this.data5.length) {
          this.reasonitems.unshift('全选')
        } else if (val.includes('全选') && (val.length - 1) < this.data5.length) {
          this.reasonitems = this.reasonitems.filter((item) => {
            return item !== '全选'
          })
        }
      },


      changeComponent(val) {
        if (!val.includes('全选') && val.length === this.data6.length) {
          this.componentitems.unshift('全选')
        } else if (val.includes('全选') && (val.length - 1) < this.data6.length) {
          this.componentitems = this.componentitems.filter((item) => {
            return item !== '全选'
          })
        }
      },

      changeGroups(val) {
        if (!val.includes('全选') && val.length === this.data7.length) {
          this.groups_item.unshift('全选')
        } else if (val.includes('全选') && (val.length - 1) < this.data7.length) {
          this.groups_item = this.groups_item.filter((item) => {
            return item !== '全选'
          })
        }
      },

      removeClusterTag(val) {
        if (val === '全选'){
          this.clusters = []
        }
      },


      removeStatusTag(val) {
        if (val === '全选'){
          this.statusitems = []
        }
      },

      removeReasonTag(val) {
        if (val === '全选'){
          this.reasonitems = []
        }
      },

      removeComponentTag(val) {
        if (val === '全选'){
          this.componentitems = []
        }
      },

      removeGroupsTag(val) {
        if (val === '全选'){
          this.groups_item = []
        }
      },


      showRepairIPEdit() {
				this.editFormVisible = true;
				// this.editForm = {
				// 	nodelist: []
				// };
			},

      // 开始添加
			editSubmit: function () {
        this.$confirm('请确认维修列表是否准确?', '提示', {
					type: 'warning'
				}).then(() => {
				  let para = {
				    "cluster": this.form.cluster.toString(),
            "repair_ip": this.form.repair_list.toString(),
            "repair_content": this.form.repair_content.toString(),
            "repair_name": this.form.repair_name.toString(),
            "repair_type": this.form.repair_type.toString(),
            "repair_component": this.form.repair_component.toString(),
            "repair_groups": this.form.repair_groups.toString(),
          };
          // eslint-disable-next-line no-mixed-spaces-and-tabs
				  this.listLoading = true;
				  writeRepairList(para).then((res) => {
            if (res.data === '0') {
              this.$message({
								message: '维修列表更新成功',
								type: 'success'
							});
            }else {
              this.$message({
								message: '维修列表更新失败',
								type: 'failure'
							});
            }
            this.getStatus();
            this.getCluster();
            this.getList();
            this.editFormVisible = false;
            this.listLoading = false;
        })
			})
      },


      // 开始编辑
			UpdateMistakeSubmit: function () {
        this.$confirm('请确认修改是否准确?', '提示', {
					type: 'warning'
				}).then(() => {
				  let para = {
				    "cluster": this.form.cluster.toString(),
            "repair_ip": this.form.repair_ip.toString(),
            "report_date": this.form.report_date.toString(),
            "repair_type": this.form.repair_type.toString(),
          };
          // eslint-disable-next-line no-mixed-spaces-and-tabs
				  this.listLoading = true;
				  updateMistake(para).then((res) => {
            if (res.data === '0') {
              this.$message({
								message: '更新成功',
								type: 'success'
							});
            }else {
              this.$message({
								message: '更新失败',
								type: 'failure'
							});
            }
            this.getStatus();
            this.getCluster();
            this.getList();
            this.updateMistakeShow = false;
        })
			})
      },


      // 退出编辑
      backEdit: function (){
        this.listLoading = true;
        this.listLoading = false;
        this.editFormVisible = false;
        this.updateMistakeShow = false;
      },


      editProperty: function (index, cluster, repair_ip, report_date){
        this.updateMistakeShow = true;
        this.form.cluster = cluster;
        this.form.repair_ip = repair_ip;
        this.form.report_date = report_date;
      },

			getList() {
        let para = {
          "cluster": this.clusters.toString(),
          "repair_status": this.statusitems.toString(),
          "repair_type": this.reasonitems.toString(),
          "current_page": this.page.toString(),
        };
        this.listLoading = true;
        getRepairList(para).then((res) => {
					this.data2 = res.data.list;
					this.total = res.data.count;
					this.pageSizes = this.data2.length;
					this.listLoading = false;
				});
			},


			getAllList() {
        this.listLoading = true;
        getRepairAllList().then((res) => {
					this.data2 = res.data.list;
					this.total = res.data.count;
					this.pageSizes = this.data2.length;
					this.listLoading = false;
				});
			}
    }
	}

</script>

<style scoped>

</style>
