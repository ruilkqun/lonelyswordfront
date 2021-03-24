<template>
  <div class="app">
    <el-aside class="app-side app-side-left"
      :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
        <Sidebar :collapse="isCollapse" :routes="$router.options.routes[1].children" />
      </el-aside>

      <el-container>
        <el-header class="app-header"
        style="background-color: #87CECB">
          <div style="width: 60px; cursor: pointer;"
          @click.prevent="toggleSideBar">
            <i v-show="!isCollapse" class="el-icon-caret-left"></i>
            <i v-show="isCollapse" class="el-icon-caret-right"></i>
          </div>

          <el-menu default-active="/"
                   router
                   class="el-menu-demo tab-page"
                   mode="horizontal"
                   @select="handleSelect"
                   active-text-color="#409EFF">
            <el-menu-item :index="this.$route.path">
              {{ this.$route.name }}
            </el-menu-item>
          </el-menu>

          <div class="app-header-userinfo">
            <el-dropdown trigger="hover"
            :hide-on-click="false">
              <span class="el-dropdown-link">
                <img :src="userImg" class="userImg"/>

                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="setPersonalInfoVisible">
                  我的信息
                </el-dropdown-item>
                <el-dropdown-item @click.native="setChangePasswordVisible">
                  密码修改
                </el-dropdown-item>
                <el-dropdown-item @click.native="setChangePhoneVisible">
                  手机修改
                </el-dropdown-item>
                <el-dropdown-item @click.native="setChangePhotographVisible">
                  头像上传
                </el-dropdown-item>
                <el-dropdown-item divided
                @click.native="logout">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="app-body">
          <template>
            <router-view />
          </template>
        </el-main>
      </el-container>

<!--    个人信息-->
    <div>
      <template>
        <section>
                <el-dialog
                title="个人信息"
                :visible.sync="personalInfoVisible"
                :show-close="true"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                >
                  <el-card align="middle" style="background-color: cornflowerblue">
                        <img :src="userImg" class="userImg"/>
                        <div>
                          <span  style="font-size:25px; font-family: 宋体">{{personalInfo.account}}</span>
                        </div>
                  </el-card>


                  <el-card class="box-card " style="min-height: 200px;" align="middle">
                    <div class="el-card__body mid" style="background-color: #87CECB">
                      <div class="el-card__body mid">
                        <span style="font-size:25px; font-family: 宋体">
                          角色
                        </span>
                        <span style="font-size:25px; font-family: 宋体">
                          {{personalInfo.role}}
                        </span>
                      </div>
                      <div class="el-card__body mid">
                        <span style="font-size:25px; font-family: 宋体">
                          手机
                        </span>
                        <span style="font-size:25px; font-family: 宋体">
                          {{personalInfo.phone}}
                        </span>
                      </div>
                      <div class="el-card__body mid">
                        <span style="font-size:25px; font-family: 宋体">
                          文章
                        </span>
                        <span style="font-size:25px; font-family: 宋体">
                          {{personalInfo.article_count}}
                        </span>
                      </div>
                    </div>
                  </el-card>
                </el-dialog>
        </section>
      </template>
    </div>

    <div>
      <template>
        <section>
            <el-dialog
            title="密码修改"
            :visible.sync="changePasswordVisible"
            :show-close="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            style="font-size:25px; font-family: 宋体"
            >
                <el-form
                  ref="form"
                  :model="changePasswordForm"
                  label-width="90px"
                  class="demo-ruleForm"
                  >
                  <el-form-item label="老密码" style="font-size:40px; font-family: 宋体">
                    <el-input v-model="changePasswordForm.old_password"  />
                  </el-form-item>
                  <el-form-item label="新密码" style="font-size:40px; font-family: 宋体">
                    <el-input v-model="changePasswordForm.new_password" />
                  </el-form-item>
                  <el-form-item label="确认密码" style="font-size:40px; font-family: 宋体">
                    <el-input v-model="changePasswordForm.confirm_new_password" />
                  </el-form-item>
                </el-form>
                <div
                  slot="footer"
                  class="dialog-footer"
                >
                  <el-button
                    type="primary"
                    @click.native="changePasswordCancel"
                  >
                    取消
                  </el-button>
                  <el-button
                    type="primary"
                    @click.native="changePasswordCommit"
                  >
                    提交
                  </el-button>
                </div>
            </el-dialog>
        </section>
      </template>
    </div>

    <div>
      <template>
        <section>
            <el-dialog
            title="手机修改"
            :visible.sync="changePhoneVisible"
            :show-close="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            style="font-size:25px; font-family: 宋体"
            >
                <el-form
                  ref="form"
                  :model="changePhoneForm"
                  label-width="90px"
                  class="demo-ruleForm"
                  >
                  <el-form-item label="老手机" style="font-size:40px; font-family: 宋体">
                    <el-input v-model="changePhoneForm.old_phone"  />
                  </el-form-item>
                  <el-form-item label="新手机" style="font-size:40px; font-family: 宋体">
                    <el-input v-model="changePhoneForm.new_phone" />
                  </el-form-item>
                  <el-form-item label="确认新手机" style="font-size:40px; font-family: 宋体">
                    <el-input v-model="changePhoneForm.confirm_new_phone" />
                  </el-form-item>
                </el-form>
                <div
                  slot="footer"
                  class="dialog-footer"
                >
                  <el-button
                    type="primary"
                    @click.native="changePhoneCancel"
                  >
                    取消
                  </el-button>
                  <el-button
                    type="primary"
                    @click.native="changePhoneCommit"
                  >
                    提交
                  </el-button>
                </div>
            </el-dialog>
        </section>
      </template>
    </div>
    <div>
      <template>
        <section>
            <el-dialog
            title="头像修改"
            :visible.sync="changePhotographVisible"
            :show-close="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            style="font-size:25px; font-family: 宋体"
            >
               <el-upload
                 ref="clean"
                  list-type="picture-card"
                  action=""
                  :http-request="imgAdd"
                  :before-upload="beforeAvatarUpload">
                  <i class="el-icon-plus"></i>
               </el-upload>
            </el-dialog>
        </section>
      </template>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import {changePassword, changePhone, getPersonalInfo} from "../api/user";
import {upLoadUserImg,getUserImg} from "../api/image";



export default {
  name: 'Container',
  components: {
    Sidebar
  },
  data () {
    return {
      changePhotographVisible: false,
      changePhoneVisible: false,
      changePasswordVisible: false,
      personalInfoVisible: false,
      username: '',
      isCollapse: false,
      userImg: "http://192.168.1.118:8088/images/6778573061923934209.png",
      personalInfo: {
        "account": '',
        "role": '',
        "phone": '',
        "article_count": ''
      },
      changePhotographForm: {

      },
      changePasswordForm: {
        old_password: '',
        new_password: '',
        confirm_new_password: ''
      },
      changePhoneForm: {
        old_phone: '',
        new_phone: '',
        confirm_new_phone: ''
      },
    }
  },
  methods: {
    userImage() {
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
        getUserImg(params).then((res) => {
          this.userImg = res.path
          // alert(res.path)
        })
    },
    uploadFile(file) {
      return new Promise(function(resolve, reject) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function() {
          resolve(this.result)
          }
      })
    },
    imgAdd(item) {
      let file = item.file
      let base64Data = ''
      this.uploadFile(file).then(res => {
        // alert(res)
          base64Data = res.split(',')[1]
          var user;
          let arr = document.cookie.split('; ')
          for (let i = 0; i < arr.length; i++) {
            let arr2 = arr[i].split('=')
            if (arr2[0] === 'C-username') {
              user = arr2[1]
            }
          }
          let params = {
            base64data: base64Data,
            "token": window.sessionStorage.getItem('jwt').toString(),
            "account": user.toString()
          }

          upLoadUserImg(params).then( res => {
          if (res.result === 'SUCCESS') {
              this.userImg = res.path;
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
          this.$refs.clean.clearFiles()
          this.changePhotographVisible = false
        })
      })
    },
    // 图片上传前验证
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
       this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isLt2M
    },
    personalTotalInfo: function () {
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
      };
      getPersonalInfo(params).then((res) => {
          this.personalInfo.account = res.account;
          this.personalInfo.role = res.role;
          this.personalInfo.phone = res.phone;
          this.personalInfo.article_count = res.article_count;
      })
    },
    changePhoneCancel: function () {
      this.changePhoneVisible = false
    },
    changePasswordCancel: function () {
      this.changePasswordVisible = false
    },
    setChangePhotographVisible: function () {
      this.changePhotographVisible = true
    },
    setChangePhoneVisible: function () {
      this.changePhoneVisible = true
    },
    setChangePasswordVisible: function () {
      this.changePasswordVisible = true
    },
    changePhoneCommit: function () {
      this.$confirm('确定修改手机？','提示',{
        type:'warning'
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
				    "old_phone": this.changePhoneForm.old_phone.toString(),
            "new_phone": this.changePhoneForm.new_phone.toString(),
            "confirm_new_phone": this.changePhoneForm.confirm_new_phone.toString(),
            "token": window.sessionStorage.getItem('jwt').toString(),
            "account": user.toString()
          };

          changePhone(params).then((res) => {
            if (res.result === 'SUCCESS') {
              this.$message({
								message: '修改手机成功',
								type: 'success'
							});
            }else {
              this.$message({
								message: '修改手机失败',
								type: 'failure'
							});
            }
            this.changePhoneVisible = false
        })

      })
    },
    changePasswordCommit: function () {
      this.$confirm('确定修改密码？','提示',{
        type:'warning'
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
				    "old_password": this.changePasswordForm.old_password.toString(),
            "new_password": this.changePasswordForm.new_password.toString(),
            "confirm_new_password": this.changePasswordForm.confirm_new_password.toString(),
            "token": window.sessionStorage.getItem('jwt').toString(),
            "account": user.toString()
          };

          changePassword(params).then((res) => {
            if (res.result === 'SUCCESS') {
              this.$message({
								message: '修改密码成功',
								type: 'success'
							});
            }else {
              this.$message({
								message: '修改密码失败',
								type: 'failure'
							});
            }
            this.changePasswordVisible = false
        })

      })
    },
    toggleSideBar () {
      this.isCollapse = !this.isCollapse
      // alert(window.sessionStorage.getItem("jwt"))
    },
    setPersonalInfoVisible: function () {
      this.personalInfoVisible = true
    },
    logout: function () {
      this.$confirm('确认退出?', '提示', {})
        .then(() => {
          sessionStorage.removeItem('user')
          sessionStorage.removeItem('jwt')
          location.reload()
          this.$router.push('/login')
        })
        .catch(() => { })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted: function () {
    this.personalTotalInfo()
    this.userImage()

    // let user = sessionStorage.getItem('user')
    var user;
    let arr = document.cookie.split('; ')
    for (let i = 0; i < arr.length; i++) {
      let arr2 = arr[i].split('=')
      if (arr2[0] === 'C-username') {
        user = arr2[1]
      }
    }
    if (user) {
      this.username = user
    }
  }
}
</script>

<style scoped>
  .userImg {
      /*display: block;*/
      /*box-sizing: content-box;*/
      height: 46px;
      width: 46px;
      margin: 0 auto;
      margin-bottom: 5px;
      border: 3px solid white;
      border-radius: 50%;
  }

  .el-card {
    min-width: 380px;
    margin-right: 20px;
    transition: all .5s;
  }
  .el-card:hover{
    margin-top: -5px;
  }

  .mid{
    margin-top: 2%;
    height: 10%;
  }
</style>
