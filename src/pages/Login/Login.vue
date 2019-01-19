<template>
  <el-container direction="vertical"
    @keyup.enter.native="enter('loginForm')">
    <el-card class="login-wrapper">
      <div slot="header">
        <div class="login-head">Login</div>
      </div>
      <el-form class="login-form"
        :model="loginForm"
        label-width="70px"
        :rules="rules"
        ref="loginForm">

        <el-form-item prop="userName"
          label="Username">
          <el-input v-model.trim="loginForm.userName"
            autofocus></el-input>
        </el-form-item>

        <el-form-item prop="password"
          label="Password">
          <el-input type="password"
            v-model="loginForm.password" />
        </el-form-item>
      </el-form>

      <div class="btn-wrap">
        <el-button class="sign-btn"
          type="text"
          @click="sign">Sign up now</el-button>
        <el-button class="login-btn"
          type="success"
          @click="enter('loginForm')">Login</el-button>

      </div>

      <p class="tips">{{tip}}</p>

    </el-card>
  </el-container>
</template>

<script>
import { login } from "@/api/api";
export default {
  name: "Login",
  data() {
    //用户名的校验规则
    let validateUserName = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("用户名不能为空"));
      } else callback();
    };
    //密码的校验规则
    let validatePassWord = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("密码不能为空"));
      } else callback();
    };
    return {
      loginForm: {
        userName: "", //用户名
        password: "" //密码
      },
      rules: {
        userName: [{ validator: validateUserName, trigger: "blur" }],
        password: [{ validator: validatePassWord, trigger: "blur" }]
      },
      tip: ""
    };
  },
  methods: {
    //******************登录************************//
    enter(formName) {
      this.tip = "";
      let isOk = false;
      //校验表单所有数据
      this.$refs[formName].validate(valid => {
        isOk = valid;
      });
      if (!isOk) return;
      login({
        username: this.loginForm.userName,
        password: this.loginForm.password
      }).then(
        res => {
          res = res.data;
          if (res.token) {
            this.$store.commit("saveToken", res.token);
            this.$message({
              message: "恭喜，登录成功！",
              type: "success"
            });
            this.$router.push("/home");
          } else {
            this.showErrorMessage("登录失败，请重试");
            console.log(res);
          }
        },
        err => {
          let res = err.response.data;
          this.tip = res.message;
          this.showErrorMessage(this.tip);
        }
      );
    },
    sign() {
      this.$router.push("/sign");
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-container
  background-color: #F2F6FC
  position: absolute
  top: 0
  right: 0
  left: 0
  bottom: 0

  .login-wrapper
    padding: 5px 30px
    position: relative
    margin: 150px auto 0
    min-width: 385px

    .login-head
      font-size: 22px
      text-align: center

    .btn-wrap
      margin-left: 70px
      margin-bottom: 10px

      .login-btn
        float: right

    .tips
      color: #f56c6c
      font-size: 12px
      line-height: 1
      text-align: center
</style>
