<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      label-position="left"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="ruleForm.userName" placeholder="请输入用户名" style="width: 180px;"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          placeholder="请输入密码"
          style="width: 180px;"
        ></el-input>
      </el-form-item>
      <el-form-item label="开机启动" prop="autoStart">
        <el-switch v-model="ruleForm.autoStart"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import store from "../store/index";
export default {
  data() {
    return {
      user: [],
      ruleForm: {
        password: "",
        userName: "",
        autoStart: false
      },
      rules: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        userName: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.user = this.$db.get("user").value()[0];
    console.log(this.user);
  },
  methods: {
    submitForm(formName) {
      console.log("提交");
      this.$refs[formName].validate(valid => {
        console.log("kaisahi ");

        // this.$message.error("用户名或者密码错误");
        if (valid) {
          // this.$message.error("用户名或者密码错误");

          console.log("kaisahi ");
          if (
            this.ruleForm.userName !== this.user.userName ||
            this.user.password !== this.ruleForm.password
          ) {
            // this.$message.error("用户名或者密码错误");
            this.$message({
              message: "用户名或者密码错误",
              type: "error",
              center: true,
              duration: 1000
            });
          } else {
            let result = this.$db
              .get("user")
              .find({ userName: this.ruleForm.userName })
              .assign({ autoStart: this.ruleForm.autoStart })
              .write();
            console.log("result", result);
            if (result) {
              console.log("跳转路由", result);
              this.$store.commit("changeLoginState", true);
              console.log(this.$store.state.login.loginState);
              this.$router.replace("/");
              console.log(this.$router);
            }
            // setTimeout(() => {
            //   this.$message({
            //     message: "登录成功",
            //     type: "success"
            //   });
            // }, 1000);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang='css' scoped>
.login {
  width: 240px;
  height: 280px;
  padding-top: 30px;
  padding-left: 30px;
}
</style>