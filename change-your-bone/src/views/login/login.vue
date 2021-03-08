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
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
          v-model="ruleFormTheWindIsClear.password"
          auto-complete="off"
          placeholder="密码">
          </el-input>
        </el-form-item>
        <el-checkbox v-model="checked"
        class="rememberme">
          记住密码
        </el-checkbox>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 100%;" @click="handleSubmit" :loading="login_ing">登录</el-button>
        </el-form-item>
      </el-form>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      login_ing: false,
      ruleFormTheWindIsClear: {
        username: 'admin',
        password: '999999999'
      },
      rulesTheWindIsClear: {
        username: [{ required: true, message: 'please enter your account', trigger: 'blur' }],
        password: [{ required: true, message: 'please enter your password', trigger: 'blur' }]
      },
      checked: false
    }
  },
  methods: {
    handleSubmit (event) {
      this.$refs.ruleFormTheWindIsClear.validate((valid) => {
        if (valid) {
          this.login_ing = true
          if (this.ruleFormTheWindIsClear.username === 'admin' &&
              this.ruleFormTheWindIsClear.password === '999999999') {
            this.login_ing = false
            sessionStorage.setItem('user', this.ruleFormTheWindIsClear.username)
            this.$router.push({ path: '/' })
          } else {
            this.login_ing = false
            this.$alert('username or password is error!', 'info', {
              confirmButtonText: 'ok'
            })
          }
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
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
