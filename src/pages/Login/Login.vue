<template>
  <el-container direction="vertical"
    @keyup.enter="enter('loginForm')">
    <el-card class="login-wrapper">
      <div slot="header">
        <div class="login-head">登 录</div>
      </div>
      <el-form class="login-form"
        :model="loginForm"
        label-width="70px"
        ref="loginForm">

        <el-form-item prop="userName"
          label="用户名"
          :rules="rules.userName">
          <el-input v-model.trim="loginForm.userName"
            autofocus></el-input>
        </el-form-item>

        <el-form-item prop="password"
          label="密码"
          :rules="rules.password">
          <el-input type="password"
            v-model.trim="loginForm.password" />
        </el-form-item>

        <el-form-item>
          <el-button class="login-btn"
            type="success"
            @click="enter('loginForm')">登录</el-button>
          <el-button class="sign-btn"
            @click="sign">注册</el-button>
        </el-form-item>
        <p class="tips">{{tip}}</p>
      </el-form>

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
          this.$store.commit("saveToken", res.token);
        },
        () => {
          this.tip = "密码错误或没有注册";
          this.showErrorMessage("密码错误或没有注册");
        }
      );
    },
    sign() {}
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

    .login-head
      font-size: 22px
      text-align: center

    .login-form
      background-color: #fff
      padding: 15px 0

      .login-btn, .sign-btn
        margin-right: 20px

      .tips
        color: #f56c6c
        font-size: 12px
        line-height: 1
        text-align: center
</style>
