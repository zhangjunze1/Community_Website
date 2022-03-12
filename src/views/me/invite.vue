<template>
  <div class="login login-page">
    <div class="login-content">
      <div class="login-box clear" style="font-size: 0;">
        <div class="login login-page">
          <div class="login-wrap" id="login-wrap">
            <div class="item-login clear">

              <!--        右半部分-->
              <div class="login-content password-login" id="password-login">
                <p class="login-til">邀请码注册</p>
                <el-form :model="registerForm" :rules="registerRules" style="margin-top: 17.69%" ref="registerForm" label- width="0px" class="login_form">
                  <el-form-item prop="name">
                    <el-input v-model="registerForm.name" placeholder="请输入账户" prefix-icon="el-icon-user-solid"></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input type="password" v-model="registerForm.password" placeholder="请输入登录密码" prefix-icon="el-icon-lock"></el-input>
                  </el-form-item>
                  <el-form-item prop="repwd">
                    <el-input type="password" v-model="registerForm.repwd" placeholder="请输入重新输入密码" prefix-icon="el-icon-lock"></el-input>
                  </el-form-item>
                  <el-form-item prop="invitationCode">
                    <el-input type="password" v-model="registerForm.invitationCode" placeholder="请输入正确的邀请码" prefix-icon="el-icon-c-scale-to-original"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <div class="remember-wrap" style="margin-top: 9%;">
                      <div class="link-box">
                        <a class="link" target="_blank" @click="back">返回</a>
                        <a class="link" style="margin-left: 20%" target="_blank" @click="getNotice">详情概述</a>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item  >
                    <el-button class="login-btn" @click="myRegister('registerForm')">注册</el-button>
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
import { systemRegister } from '@/api/system'
export default {
  name: 'Login',
  data () {
    return {
      registerForm: {
        name: '',
        password: '',
        repwd: '',
        invitationCode: ''
      },
      registerRules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 4, max: 9, message: '账号格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
        ],
        repwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        invitationCode: [
          { required: true, message: '邀请码不能为空', trigger: 'blur' },
          { min: 7, max: 7, message: '长度为 7 位字符与数字的字符串', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    back () {
      this.$router.push('/login')
    },
    getNotice () {
      this.$notify({
        title: '邀请码详述',
        message: '登录用户可根据邀请码获取不同的权限，即可看不同的展示数据，具体权限与管理员沟通。微信二维码详见登录界面。',
        type: 'warning',
        duration: 5000
      })
    },
    myRegister (registerForm) {
      // eslint-disable-next-line no-unused-expressions
      this.$refs[registerForm].validate(valid => {
        if (!valid) {
          this.$notify({
            message: '请完整输入',
            type: 'warning',
            duration: 1200
          })
          return false
        }
      })
      this.systemRegister1()
    },
    async systemRegister1 () {
      const { data } = await systemRegister(this.registerForm.name, this.registerForm.password, this.registerForm.repwd, this.registerForm.invitationCode)
      if (data.code === 2004) {
        this.$notify({
          title: '警告',
          message: '密码不一致',
          type: 'warning',
          duration: 2000
        })
      } else if (data.code === 2005) {
        this.$notify({
          title: '警告',
          message: '用户名已存在',
          type: 'warning',
          duration: 2000
        })
      } else if (data.code === 3004) {
        this.$notify({
          title: '警告',
          message: '邀请码无效',
          type: 'warning',
          duration: 2000
        })
      } else if (data.code === 3003) {
        this.$notify({
          title: '警告',
          message: '邀请码已被使用',
          type: 'warning',
          duration: 2000
        })
      } else if (data.code === 200) {
        this.$notify({
          title: '成功',
          message: '成功注册',
          type: 'success',
          duration: 2000
        })
        this.$router.push('/login')
      }
      console.log(data)
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
  height: 35%;
}

.login-page .login-content .login-box {
  width: 70%;
  margin-left: -35%;
}

.login-page .login-content .login-box {
  margin-top: -44%;
}

.login-page .login-content .login-box {
  min-width: 520px;
  min-height: 478px;
  position: absolute;
  left: 50%;
  margin-left: -14%;
  top: 55%;
  margin-top: -16%;
  width: 28%;
  height: 50%;
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
  position: absolute;
  z-index: 12;
  left: 100%;
  top: 10%;
  bottom: 10%;
  width: 3%;
  background: #e1e1e1;
  margin-left: -0.0185rem;
}
.login-wrap .item-login {
  width: 55%;
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
  width: 55%;
}

.login-wrap .login-content .login-til {
  font-size: 24px;
  line-height: 2.5%;
  color: #333;
  margin-top: 2%;
  margin-bottom: -2%;
}
.login-wrap .code-login .normal-wrap .code-wrap {
  width: 25%;
  height: 10%;
  margin: 0 auto;
  margin-top: 0.556rem;
  border: 0.0185rem solid #e0e0e0;
  position: relative;
}

.login-wrap .link-box .link {
  margin-left: 1%;
}

.login-wrap .link {
  color: #2685E3;
}

.login-wrap .code-login .tip-text {
  color: #333;
  line-height: 3%;
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
  margin-top: 10%;
  margin-bottom: -6%;
}

.login-wrap .remember-wrap {
  text-align: left;
  height: 100%;
  line-height: 0px;
  margin-top: 10%;
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
  line-height: 100%;
  text-align: center;
  position: absolute;
  top: 0px;
}
</style>
