<template>
  <el-container direction="vertical"
    @keyup.enter="enter('signForm')">
    <el-card class="sign-wrapper">
      <div slot="header">
        <div class="sign-head">Sign up</div>
      </div>
      <el-form class="sign-form"
        :model="signForm"
        label-width="130px"
        :rules="rules"
        ref="signForm">

        <el-form-item prop="userName"
          label="Username">
          <el-input v-model.trim="signForm.userName"
            autofocus></el-input>
        </el-form-item>

        <el-form-item prop="password1"
          label="Password">
          <el-input type="password"
            v-model="signForm.password1" />
        </el-form-item>

        <el-form-item prop="password2"
          label="Confirm Password">
          <el-input type="password"
            v-model="signForm.password2" />
        </el-form-item>
      </el-form>
      <div class="btn-wrap">
        <el-button class="login-btn"
          type="text"
          @click="$router.push('/login')"><i class="el-icon-arrow-left"></i>Return to the login</el-button>
        <el-button class="sign-btn"
          type="primary"
          @click="commit('signForm')">Create an account</el-button>
      </div>
      <p class="tips">{{tip}}</p>
    </el-card>
  </el-container>
</template>

<script>
import { sign } from "@/api/api";
export default {
  name: "Sign",
  data() {
    //用户名的校验规则
    let validateUserName = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("The user name cannot be empty"));
      } else if (value.length < 5 || value.length > 12) {
        callback(new Error("Username length between 5 and 12!"));
      } else callback();
    };
    //密码的校验规则
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else if (value.length < 8 || value.length > 20) {
        callback(new Error("Password length between 8~20!"));
      } else {
        if (this.signForm.password2 !== "") {
          this.$refs.signForm.validateField("password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value.length < 8 || value.length > 20) {
        callback(new Error("Password length between 8~20!"));
      } else if (value !== this.signForm.password1) {
        callback(new Error("The two passwords do not match!"));
      } else {
        callback();
      }
    };
    return {
      signForm: {
        userName: "", //用户名
        password1: "", //密码
        password2: "" //确认密码
      },
      rules: {
        userName: [{ validator: validateUserName, trigger: "blur" }],
        password1: [{ validator: validatePass, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }]
      },
      tip: ""
    };
  },
  methods: {
    //******************注册************************//
    commit(formName) {
      this.tip = "";
      let isOk = false;
      //校验表单所有数据
      this.$refs[formName].validate(valid => {
        isOk = valid;
      });
      if (!isOk) return;
      sign({
        username: this.signForm.userName,
        password: this.signForm.password1,
        name: "lanternyin"
      }).then(
        data => {
          if (data.id || data.username) {
            this.$message({
              message: "registered successfully，please login！",
              type: "success"
            });
            this.$router.push("/login");
          } else {
            this.showErrorMessage("fail to register，please retry~");
            console.log(data);
          }
        },
        err => {
          this.tip = `fail to register，${err.message}`;
          this.showErrorMessage(this.tip);
        }
      );
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

  .sign-wrapper
    padding: 5px 30px
    position: relative
    margin: 150px auto 0
    min-width: 385px

    .sign-head
      font-size: 22px
      text-align: center

    .btn-wrap
      margin-bottom: 10px

      .sign-btn
        float: right

    .tips
      color: #f56c6c
      font-size: 12px
      line-height: 1
      text-align: center
</style>
