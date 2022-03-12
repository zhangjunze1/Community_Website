<template>
  <div class="login login-page">
  <div class="login-content">
  <div class="login-box clear" style="font-size: 0;">
  <div class="login login-page">
    <div class="login-wrap" id="login-wrap">
      <div class="item-login clear">
<!--        左半部分-->
        <div class="login-content code-login" id="qrcode-login">
          <p class="login-til">获取邀请码途径</p>
          <div class="normal-wrap" id="qrcode-box">
            <div class="code-wrap">
              <img id="qrcode" style="height: 100%;width: 100%;border: #333333" src="../assets/img/community_icon.png">
              <p class="tip-text" style="font-size: 14px;">
                食社 ，欢迎您
              </p>
            </div>
          </div>
        </div>
<!--        右半部分-->
        <div class="login-content password-login" id="password-login">
          <p class="login-til">系统登录</p>
          <el-form :model="loginForm" :rules="loginRules" style="margin-top: 22%" ref="loginForm" label- width="0rem" class="login_form">
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
                  <a class="link" style="margin-left: 20%" target="_blank" @click="test">游客登陆</a>
                  <a class="link" style="margin-left: 50%" target="_blank" @click="toInvite">邀请码注册</a>
<!--                  <a class="link" style="margin-left: 108px" target="_blank" @click="toAdmin">管理系统</a>-->
                </div>
                <div class="link-box" style="margin-top: 10%">
                  <p style="color: #1b2327;margin-left: 2%">注：游客仅能查看部分数据</p>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button class="login-btn" @click="systemSubmitForm('loginForm')">登录</el-button>
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
import { systemLogin } from '../api/system'
import { getProvinceChartsData } from '@/api/echarts'
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
    test () {
      this.loginForm.name = 'test'
      this.loginForm.password = '123456'
      this.systemSubmitForm('loginForm')
    },
    back () {
      this.$router.push('/system')
    },
    toInvite () {
      this.$router.push('/invite')
    },
    async systemSubmitForm (loginForm) {
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
      this.mysystemlogin()
    },
    async getChartsMapData () {
      const { data } = await getProvinceChartsData(window.sessionStorage.getItem('invitationCode'))
      var checkedIdStr = JSON.stringify(data.data.GroupProvince)
      window.sessionStorage.setItem('province', checkedIdStr)
      console.log(data)
      var arrAfter = JSON.parse(window.sessionStorage.getItem('province'))
      console.log(arrAfter, typeof arrAfter)
    },
    async mysystemlogin () {
      const { data } = await systemLogin(this.loginForm.name, this.loginForm.password)
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
      } else if (data.code === 200) {
        this.$notify({
          title: '成功',
          message: '成功登录沙门氏杆菌展示系统',
          type: 'success',
          duration: 2000
        })
        console.log(1)
        this.$root.USER.id = data.data.sysUser.userId
        this.$root.USER.name = data.data.sysUser.userName
        this.$root.USER.password = data.data.sysUser.password
        this.$root.USER.invitationCode = data.data.sysUser.invitationCode
        window.sessionStorage.setItem('id', data.data.sysUser.userId)
        window.sessionStorage.setItem('name', data.data.sysUser.userName)
        window.sessionStorage.setItem('password', data.data.sysUser.password)
        window.sessionStorage.setItem('invitationCode', data.data.sysUser.invitationCode)
        this.$router.push('/system')
        window.location.reload()
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
  height: 50%;
}

.login-page .login-content .login-box {
  width: 50%;
  margin-left: -28%;
}

.login-page .login-content .login-box {
    margin-top: -30%;
  }

  .login-page .login-content .login-box {
    min-height: 390px;
    min-width: 690px;
    position: absolute;
    left: 50%;
    margin-left: -20%;
    top: 50%;
    margin-top: -10%;
    width: 37%;
    height: 40%;
    display: block;
    box-shadow: 0 0.0925rem 0.556rem rgba(51,51,51,0.25);
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
  width: 2%;
  background: #e1e1e1;
  margin-left: -1%;
}
.login-wrap .item-login {
  width: 90%;
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
  padding: 0.37rem 0.026% 0 0.026%;
  position: relative;
}
.login-wrap .mobile-login, .login-wrap .code-login {
  display: inline-block;
  font-size: 0.259rem;
  float: left;
  width: 25%;
}

.login-wrap .login-content .login-til {
  font-size: 2%;
  line-height: 1%;
  color: #333;
  margin-top: 1.5%;
  margin-bottom: -1.5%;
}
.login-wrap .code-login .normal-wrap .code-wrap {
  width: 3.722rem;
  height: 3.722rem;
  margin: 0 auto;
  margin-top: 0.556rem;
  border: 0.0185rem solid #e0e0e0;
  position: relative;
}

.login-wrap .link-box .link {
  margin-left: 0.0926rem;
}

.login-wrap .link {
  color: #2685E3;
}

.login-wrap .code-login .tip-text {
  color: #333;
  line-height: 0.667rem;
  margin-top: 0.1852rem;
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
  width: 5.556rem;
}

.login-wrap .login-content .login-til {
  font-size: 150%;
  line-height: 100%;
  color: #333;
  margin-top: 10%;
  margin-bottom: -4%;
}

.login-wrap .remember-wrap {
  text-align: left;
  height: 0.333rem;
  line-height: 0px;
  margin-top: 0.352rem;
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
  line-height: 10%;
  text-align: center;
  position: absolute;
  top: 0px;
}
</style>
