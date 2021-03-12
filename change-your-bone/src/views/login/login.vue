<template>
  <div class="login_background">
    <div class="login-container">
      <el-form :model="ruleFormTheWindIsClear" :rules="rulesTheWindIsClear"
      status-icon
      ref="ruleFormTheWindIsClear"
      label-position="left"
      label-width="0px"
      class="login-page">
        <h3 class="title">OneToBeat</h3>
        <el-form-item prop="username">
          <el-input type="text"
          v-model="ruleFormTheWindIsClear.username"
          auto-complete="off"
          placeholder="用户名">
            <template slot="prepend">
              <span class="fa fa-user fa-lg"
                style="width: 13px">
              </span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :type="form.pwdType"
          v-model="ruleFormTheWindIsClear.password"
          auto-complete="off"
          placeholder="密码"
          @input="hanldeEnterPass"
          @keyup.enter.native="handleSubmit">
            <template slot="prepend">
              <span class="fa fa-lock fa-lg"
               style="width: 13px">
              </span>
            </template>
            <template slot="suffix">
              <span class="password-eye"
               @click="showPassword"
               :class="form.eyeType">
              </span>
            </template>
          </el-input>
        </el-form-item>
        <el-checkbox v-model="rememberme"
        class="rememberme">
          记住密码
        </el-checkbox>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 100%;" :disabled="isNotValidBrowser" @click="handleSubmit" :loading="login_ing">登录</el-button>
        </el-form-item>
      </el-form>
  </div>
</div>
</template>

<script>
import md5 from 'js-md5'
import { getLoginResult } from '../../api/login'

export default {
  name: 'Login',
  created () {
    if (!window.Promise) {
      this.isNotValidBrowser = true
      window.alert('建议使用最新版谷歌浏览器')
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  data () {
    return {
      form: {
        pwdType: 'password',
        eyeType: 'fa fa-eye-slash fa-lg'
      },
      isNotValidBrowser: false,
      rememberme: false,
      hidePassword: '',
      login_ing: false,
      redirect: undefined,
      ruleFormTheWindIsClear: {
        username: '',
        password: ''
      },
      rulesTheWindIsClear: {
        username: [{ required: true, message: 'please enter your account', trigger: 'blur' }],
        password: [{ required: true, message: 'please enter your password', trigger: 'blur' }]
      },
      checked: false,
      token: ''
    }
  },
  methods: {
    handleSubmit: function () {
      this.$refs.ruleFormTheWindIsClear.validate((valid) => {
        if (valid) {
          this.login_ing = true
          const user = this.ruleFormTheWindIsClear.username
          let pwd = md5(this.ruleFormTheWindIsClear.password)
          if (this.hidePassword !== '' && this.ruleFormTheWindIsClear.password === '********') {
            pwd = this.hidePassword
          }

          let para = {
            'account': user,
            'pwd': this.ruleFormTheWindIsClear.password
          }

          getLoginResult(para).then((res) => {
            // alert("haha")
            if (res.token !== '') {
              this.login_ing = false
              if (this.rememberme) {
                this.setCookie(this.ruleFormTheWindIsClear.username, pwd, 7)
              } else {
                this.deleteCookie()
              }
              this.$router.push({path: this.redirect || '/'}).catch(() => {})
            }
          }).catch(err => {
            this.login_ing = false
            this.$alert(err, {
              type: 'warning',
              confirmButtonText: 'ok'
            })
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    hanldeEnterPass () {
      this.hidePassword = ''
    },
    showPassword () {
      if (this.form.pwdType === 'password') {
        // console.log(this.pwdType)
        this.form.pwdType = 'text'
        this.form.eyeType = 'fa fa-eye fa-lg'
      } else {
        // console.log(this.pwdType)
        this.form.pwdType = 'password'
        this.form.eyeType = 'fa fa-eye-slash fa-lg'
      }
    },
    setCookie (name, pass, days) {
      let expire = new Date()
      expire.setDate(expire.getDate() + days)
      document.cookie = `C-username=${name};expires=${expire}`
      document.cookie = `C-password=${pass};expires=${expire}`
    },
    getCookie () {
      if (document.cookie.length) {
        let arr = document.cookie.split('; ')
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('=')
          if (arr2[0] === 'C-username') {
            this.ruleFormTheWindIsClear.username = arr2[1]
          } else if (arr2[0] === 'C-password') {
            this.ruleFormTheWindIsClear.password = '********'
            this.hidePassword = arr2[1]
            this.rememberme = true
          }
        }
      }
    },
    deleteCookie () {
      this.setCookie('', '', -1)
    }
  },
  mounted () {
    this.getCookie()
  }
}
</script>

<style scoped>
.login_background {
    background: url("../../assets/login/login.jpg");
    background-size: 100%;
    width: 100%;
    height: 100%;
    z-index: -1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
}

.login-container {
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
}

.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #eaeaea;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #eaeaea;
}

label.el-checkbox.rememberme {
  margin: 0 0 15px;
  text-align: left;
}
</style>
