<template>
  <div>
    <el-row>
      <el-form>
        <el-form-item label="小记标题">
          <el-col :span="6">
            <el-input v-model="model.title"></el-input>
          </el-col>
        </el-form-item>


        <el-form-item label="所属分类">
          <el-select
            v-model="model.classify"
            multiple
            collapse-tags
          >
            <el-option
              v-for="item in classify_data"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-col>
            <mavon-editor v-model="model.content" style="height: 100%"
            @imgAdd="imgAdd"
            @imgDel="imgDel"
            ref="md"></mavon-editor>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col>
            <el-button type="primary" size="small" @click="submit">发表</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { upLoadImg } from "../../api/image";
import { getClassifyList } from "../../api/article";

export default {
  name: "note",
  data () {
    return {
      model: {
        title: '',
        content: '',
        classify: '',
      },
      classify_data: []
    }
  },
  mounted() {
				this.showClassifyList();
  },
  methods: {
    // 获取账户信息
    showClassifyList(){
        getClassifyList().then((res) => {
          for(var i=0;i<res.data.length;i++){
          this.classify_data.push(res.data[i].classify_name.toString());
        }
      });
    },


    submit: function () {
      alert(this.model.title)
      alert(this.model.content)
      alert(this.model.classify)
    },
    imgAdd(pos, $file) {
      const base64Data = $file.miniurl.replace(/^data:image\/\w+;base64,/, "");
      let params = { base64data: base64Data }

      var user;
      let arr = document.cookie.split('; ')
      for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=')
        if (arr2[0] === 'C-username') {
          user = arr2[1]
        }
      }


      upLoadImg(params).then( res => {
        if (res.result === 'SUCCESS') {
            this.$message({
              message: '写入图片成功',
              type: 'success'
            });
        }else {
            this.$message({
              message: '写入图片失败',
              type: 'failure'
            });
        }
        this.$refs.md.$img2Url(pos, res.path);
      })
    },

    imgDel(pos) {
      delete this.img_file[pos];
    },

  }
}
</script>

<style scoped>

</style>
