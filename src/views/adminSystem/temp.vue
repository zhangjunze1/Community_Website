<template>
  <div class="login login-page">
    <div class="login-content">
      <div class="login-box clear" style="font-size: 0;">
        <div class="login login-page">
          <div class="login-wrap" id="login-wrap">
            <div class="item-login clear">
              <!--        左半部分-->
              <div class="login-content code-login" id="qrcode-login">
                <p class="login-til">扫码登录</p>
                <div class="normal-wrap" id="qrcode-box">
                  <div class="code-wrap">
                    <img id="qrcode" style="height: 3.722rem;width: 3.722rem;border: #333333" src="../assets/img/wechat.jpg">
                    <p class="tip-text" style="font-size: 14px;">
                      微信扫码
                    </p>
                  </div>
                </div>
              </div>
              <!--        右半部分-->
              <div class="login-content password-login" id="password-login">
                <p class="login-til">密码登录</p>
                <el-form :model="loginForm" :rules="loginRules" style="margin-top: 0.85185rem" ref="loginForm" label- width="0px" class="login_form">
                  <el-form-item prop="name">
                    <el-input v-model="loginForm.name" placeholder="请输入账户" prefix-icon="el-icon-user-solid"></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" placeholder="请输入登录密码" prefix-icon="el-icon-lock"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <div class="remember-wrap" style="margin-top: 0.352rem;">
                      <div class="link-box">
                        <a class="link" target="_blank" @click="back">返回</a>
                        <a class="link" style="margin-left: 38px" target="_blank" @click="toInvite">邀请码注册</a>
                        <a class="link" style="margin-left: 108px" target="_blank" @click="toAdmin">管理系统</a>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item  >
                    <el-button class="login-btn" @click="submitForm('loginForm')">登录</el-button>
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
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        name: '',
        password: '',
        verifyCode: ''
      },
      loginRules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 4, max: 9, message: '账号格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '请输入计算结果', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    toInvite () {
      this.$router.push('/invite')
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
  height: 7.407rem;
}

.login-page .login-content .login-box {
  width: 14.815rem;
  margin-left: -7.407rem;
}

.login-page .login-content .login-box {
  margin-top: -4.815rem;
}

.login-page .login-content .login-box {
  position: absolute;
  left: 50%;
  margin-left: -7.037rem;
  top: 50%;
  margin-top: -3.703rem;
  width: 740px;
  height: 7.407rem;
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
  top: 1.111rem;
  bottom: 1.111rem;
  width: 0.0185rem;
  background: #e1e1e1;
  margin-left: -0.0185rem;
}
.login-wrap .item-login {
  width: 60.556rem;
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
  width: 5.556rem;
}

.login-wrap .login-content .login-til {
  font-size: 24px;
  line-height: 0.778rem;
  color: #333;
  margin-top: 0.278rem;
  margin-bottom: -0.278rem;
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
  font-size: 24px;
  line-height: 0.778rem;
  color: #333;
  margin-top: 0.278rem;
  margin-bottom: -0.278rem;
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
  width: 3.703rem;
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
