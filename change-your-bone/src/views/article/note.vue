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
import { upLoadImg,deleteImg } from "../../api/image";
import { getClassifyList,createArticle } from "../../api/article";

export default {
  name: "note",
  data () {
    return {
      model: {
        title: '',
        content: '',
        classify: '',
      },
      classify_data: [],
      image_id: [],
      image_id_map: [],
      current_image_id: 0,
    }
  },
  mounted() {
				this.showClassifyList();
				this.image_id = [];
				this.image_id_map = [];
  },
  methods: {
    // 跳转到 展示页
    goToFramework ()
    {
       this.$router.push({
          name: '展示框架',
          params: {
            article_id: "".toString(),
            article_title: this.model.title.toString()
          }
       })
    },
    // 获取分类信息
    showClassifyList(){
      var user;
      let arr = document.cookie.split('; ')
      for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=')
        if (arr2[0] === 'C-username') {
          user = arr2[1]
        }
      }
      let params = {
        "token": window.sessionStorage.getItem('jwt').toString(),
        "account": user.toString()
      }
      getClassifyList(params).then((res) => {
          for(var i=0;i<res.data.length;i++){
            this.classify_data.push(res.data[i].classify_name.toString());
          }
      });
    },


    submit: function () {
        this.$confirm('是否创建该文章?', '提示', {
          type: 'warning'
        }).then(() => {
        var user;
        let arr = document.cookie.split('; ')
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('=')
          if (arr2[0] === 'C-username') {
            user = arr2[1]
          }
        }

        let params = {
          	"article_account": user.toString(),
            "article_classify": this.model.classify.toString(),
            "article_title": this.model.title.toString(),
            "article_content": {"markdown":this.model.content.toString()},
            "article_image": this.image_id,
            "token": window.sessionStorage.getItem('jwt').toString(),
            "account": user.toString()
        };

        createArticle(params).then((res) => {
          if (res.result === 'SUCCESS') {
            this.$message ({
              'message': "创建文章成功",
              'type': 'success'
            });
            this.goToFramework();
          } else {
            this.$message ({
              'message': "创建文章失败",
              'type': 'failure'
            });
          }
        });
      })
    },
    imgAdd(pos, $file) {
      const base64Data = $file.miniurl.replace(/^data:image\/\w+;base64,/, "");
      let params = { base64data: base64Data }


      upLoadImg(params).then( res => {
        if (res.result === 'SUCCESS') {
            let image_pos =  pos.toString();
            let image_pos_id_map = {[image_pos]: res.image_id};
            this.image_id.push(res.image_id);
            this.image_id_map.push(image_pos_id_map);
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
      // delete this.img_file[pos];
      // alert(pos.toString().split(',')[0].toString().split('/')[4].toString().split('.')[0])
      var current_image_id = "".toString()
      current_image_id = pos.toString().split(',')[0].toString().split('/')[4].toString().split('.')[0].toString();
      // var current_image_id = "".toString();
      // for (let i = 0; i < this.image_id_map.length; i++) {
      //     if (this.image_id_map[i][pos] !== '') {
      //       // alert(i)
      //       // alert(pos)
      //       // alert(this.image_id_map[i][pos])
      //       current_image_id = this.image_id_map[i][pos];
      //       // alert(current_image_id);
      //       this.image_id_map.splice(i+1,1);
      //       for (let k = 0; k < this.image_id.length; k++) {
      //         if (this.image_id[k] === current_image_id) {
      //           this.image_id.splice(i+1,1);
      //           break;
      //         }
      //       }
      //       break
      //     }
      // }

      // alert(current_image_id)
      let params = { "image_id": current_image_id };
      // alert(params["image_id"])
      deleteImg(params).then( res => {
        if (res.result === 'SUCCESS') {
            this.$message({
              message: '删除图片成功',
              type: 'success'
            });
        }else {
            this.$message({
              message: '删除图片失败',
              type: 'failure'
            });
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
