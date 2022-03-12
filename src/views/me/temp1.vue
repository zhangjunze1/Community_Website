<template>
  <div id="app" class="myhome">
    <div class="home-container">
      <div>
        <h1 class="blog-title animated zoomIn" style="margin-top: 0.9259rem">
          沙门氏杆菌展示系统
        </h1>
      </div>
      <div class="register_box" style="margin-top: 0.9259rem">
        <!--头像-->
        <div class="avatar_box">
          <img src="../../assets/img/dna1.png" class="avatar_img">
        </div>
        <!--表单-->
        <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label- width="0px" class="register_form">
          <el-form-item prop="number">
            <el-input v-model="registerForm.number" placeholder="请输入账户名" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input type="password" v-model="registerForm.pwd" placeholder="请输入注册密码" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item prop="repwd">
            <el-input type="password" v-model="registerForm.repwd" placeholder="请输入重新输入密码" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item prop="invitationCode">
            <el-input type="password" v-model="registerForm.invitationCode" placeholder="请输入正确的邀请码" prefix-icon="el-icon-c-scale-to-original"></el-input>
          </el-form-item>
          <el-form-item class="register_btn">
            <el-button type="warning" @click="back">返回</el-button>
            <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
            <el-button @click="resetForm('registerForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Invite',
  data () {
    return {
      registerForm: {
        number: '',
        pwd: '',
        repwd: '',
        invitationCode: ''
      },
      registerRules: {
        number: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 12, message: '请输入1-12位', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        repwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        invitationCode: [
          { required: true, message: '邀请码不能为空', trigger: 'blur' },
          { min: 6, max: 6, message: '长度为 6 位字符与数字的字符串', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    back () {
      this.$router.push('/home')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

.home-container {
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  height: 100vh;
  background: url("../../assets/img/dna-1903875.jpg") center center /
    cover no-repeat;
  background-color: #49b1f5;
  background-attachment: fixed;
  text-align: center;
  color: #fff !important;
  animation: header-effect 1s !important;
}

.home-login {
  margin-top: 43vh;
  line-height: 1.5;
  color: #eee;
}

.text,
.textt {
  font-size: 1.5rem;
  color: #fff;
}

.inner-container {
  animation: myMove 5s linear infinite;
  animation-fill-mode: forwards;
}

/*文字无缝滚动*/
@keyframes myMove {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-2.778rem);
  }
}

.textBox {
  width: 100%;
  height: 0.7407rem;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  text-align: center;
}

.register_box {
  width: 8.333rem;
  height: 7.037rem;
  background-color: unset;
  border-radius: 0.0556rem;
  border-width: 0.0926rem;
  border: solid #FFFFFF;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}

.register_form {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0px 0.3704rem;
  box-sizing: border-box;
}

.register_btn {
  display: flex;
  justify-content: flex-end;
}

.avatar_box {
  width: 2.407rem;
  height: 2.407rem;
  border: 0.0185rem solid #EEEEEE;
  border-radius: 50%;
  padding: 0.1852rem;
  box-shadow: 0 0.037rem 0.222rem 0 rgba(0, 0, 0, 0.1);
  margin: -1.2037rem auto;
  background-color: #FFFFFF;
}

.avatar_img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #EEEEEE;
}
</style>
