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
                <el-dropdown-item>
                  密码修改
                </el-dropdown-item>
                <el-dropdown-item>
                  手机修改
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
                          <span  style="font-size:25px; font-family: 宋体">ruilkyu</span>
                        </div>
                  </el-card>


                  <el-card class="box-card " style="min-height: 200px;" align="middle">
                    <div class="el-card__body mid" style="background-color: #87CECB">
                      <div class="el-card__body mid">
                        <span style="font-size:25px; font-family: 宋体">
                          角色
                        </span>
                        <span style="font-size:25px; font-family: 宋体">
                          admin_role
                        </span>
                      </div>
                      <div class="el-card__body mid">
                        <span style="font-size:25px; font-family: 宋体">
                          手机
                        </span>
                        <span style="font-size:25px; font-family: 宋体">
                          15201776595
                        </span>
                      </div>
                      <div class="el-card__body mid">
                        <span style="font-size:25px; font-family: 宋体">
                          文章
                        </span>
                        <span style="font-size:25px; font-family: 宋体">
                          10
                        </span>
                      </div>
                    </div>
                  </el-card>
                </el-dialog>
        </section>
      </template>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
export default {
  name: 'Container',
  components: {
    Sidebar
  },
  data () {
    return {
      personalInfoVisible: false,
      username: '',
      isCollapse: false,
      userImg: "http://192.168.1.118:8088/images/6778573061923934209.png"
    }
  },
  methods: {
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
