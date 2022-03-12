<template>
  <div class="login login-page">
    <div class="login-content">
      <div class="login-box clear" style="font-size: 0;">
        <div class="login login-page">
          <div class="login-wrap" id="login-wrap">
            <div class="item-login clear">

              <!--        右半部分-->
              <div class="login-content password-login" id="password-login">
                <p class="login-til">后台管理系统</p>
                <el-form :model="loginForm" :rules="loginRules" style="margin-top: 27%" ref="loginForm" label- width="0px" class="login_form">
                  <el-form-item prop="name">
                    <el-input v-model="loginForm.name" placeholder="请输入账户" prefix-icon="el-icon-user-solid"></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" placeholder="请输入登录密码" prefix-icon="el-icon-lock"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <div class="remember-wrap" style="margin-top: 10%;">
                      <div class="link-box">
                        <a class="link" target="_blank" @click="back">返回</a>
                        <a class="link" style="margin-left: 20%" target="_blank" @click="notice">详情概述</a>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <el-button class="login-btn" @click="adminsubmitForm('loginForm')">登录</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { adminLogin } from '../api/admin'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        name: '',
        password: ''
      },
      loginRules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 4, max: 9, message: '账号格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    back () {
      this.$router.push('login')
    },
    async adminsubmitForm (loginForm) {
      // eslint-disable-next-line no-unused-expressions
      this.$refs[loginForm].validate(valid => {
        if (!valid) {
          this.$notify({
            message: '请完整输入',
            type: 'warning',
            duration: 1200
          })
          return false
        }
      })
      this.myadminlogin()
    },
    async myadminlogin () {
      const { data } = await adminLogin(this.loginForm.name, this.loginForm.password)
      if (data.code === 2003) {
        this.$notify({
          title: '警告',
          message: '密码错误',
          type: 'warning',
          duration: 2000
        })
      } else if (data.code === 2007) {
        this.$notify({
          title: '警告',
          message: '账号不存在',
          type: 'warning',
          duration: 2000
        })
      } else if (data.code === 2002) {
        this.$notify({
          title: '警告',
          message: '非管理员账户',
          type: 'warning',
          duration: 2000
        })
      } else if (data.code === 200) {
        this.$notify({
          title: '成功',
          message: '成功登录后台管理系统',
          type: 'success',
          duration: 2000
        })
        this.$root.ADMIN.id = 1
        this.$root.ADMIN.name = 'admin'
        window.sessionStorage.setItem('admin', '97nc06x')
        this.$router.push('/adminMain')
      }
      console.log(data)
    },
    notice () {
      this.$notify({
        title: '后台管理系统详述',
        message: '后台管理系统为管理员更新实验数据的系统，不对其余访问用户开放，深感抱歉！',
        type: 'warning',
        duration: 5000
      })
    }
  }
}
</script>

<style scoped>

.login-page {
  min-height: 100%;
  position: relative;
}

.login-page .login-content {
  height: 100%;
}

.login-page .login-content .login-box {
  margin-top: -25%;
}

.login-page .login-content .login-box {
  min-height: 400px;
  min-width: 500px;
  position: absolute;
  left: 50%;
  margin-left: -14%;
  top: 50%;
  margin-top: -11%;
  width: 27%;
  height: 41.3%;
  display: block;
  box-shadow: 0 0.0926rem 0.556rem rgba(51,51,51,0.25);
}
.login-wrap {
  margin: 0 auto;
  text-align: center;
  font-size: 0;
  font-size: 0;
  position: relative;
}

.login-wrap:after {
  content: '';
  position: relative;
  z-index: 12;
  left: 100%;
  top: 10%;
  bottom: 1.111rem;
  width: 5%;
  background: #e1e1e1;
  margin-left: -5%;
}
.login-wrap .item-login {
  width: 60%;
}

.item-login {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  vertical-align: middle;
}
.clear {
  *zoom: 1;
}
.clear :after{
  content: '\20';
  display: block;
  height: 0;
  clear: both;
}

.login-wrap .login-content {
  padding: 0.3704rem 0.9259rem 0 0.9259rem;
  position: relative;
}
.login-wrap .mobile-login, .login-wrap .code-login {
  display: inline-block;
  font-size: 14px;
  float: left;
  width: 50%;
}

.login-wrap .login-content .login-til {
  font-size: 24px;
  line-height: 3%;
  color: #333;
  margin-top: 2%;
  margin-bottom: -2%;
}
.login-wrap .code-login .normal-wrap .code-wrap {
  width: 10%;
  height: 25%;
  margin: 0 auto;
  margin-top: 3%;
  border: 0.0185rem solid #e0e0e0;
  position: relative;
}

.login-wrap .link-box .link {
  margin-left: 3%;
}

.login-wrap .link {
  color: #2685E3;
}

.login-wrap .code-login .tip-text {
  color: #333;
  line-height: 5%;
  margin-top: 2%;
  font-size: 13px!important;
}

.login-wrap .login-content {
  padding: 0.3704rem 0.9259rem 0 0.9259rem;
  position: relative;
}

.login-wrap .password-login,
.login-wrap .code-login {
  display: inline-block;
  font-size: 14px;
  float: left;
  width: 100%;
}

.login-wrap .login-content .login-til {
  font-size: 24px;
  line-height: 100%;
  color: #333;
  margin-top: 15%;
  margin-bottom: -10%;
}

.login-wrap .remember-wrap {
  text-align: left;
  height: 100%;
  line-height: 0px;
  margin-top: 3%;
  font-size: 0.222rem;
  color: #6b6b6b;
}

.login-wrap .login-btn {
  *display: inline;
  *zoom: 1;
  display: block;
  width: 100%;
  height: 0.778rem;
  background: #ff0042;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 0.333rem;
  line-height: 0.296rem;
  text-align: center;
  position: absolute;
  top: 0px;
}
</style>
