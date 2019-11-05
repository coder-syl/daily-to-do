<template>
  <el-form ref="toDoform" :rules="rules" :model="toDoform" label-width="80px">
    <el-form-item label="待作名称" prop="name">
      <el-input v-model="toDoform.name"></el-input>
    </el-form-item>
    <el-form-item label="所属标签" prop="belong">
      <el-select v-model="toDoform.belong" placeholder="请选择所属标签">
        <el-option label="工作" value="job"></el-option>
        <el-option label="生活" value="life"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="预期时间">
      <el-col :span="11">
        <el-form-item prop="endDate">
          <el-date-picker
            v-model="toDoform.endDate"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd:HH-mm-ss"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <!-- <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="endTime">
          <el-time-picker
            placeholder="选择时间"
            v-model="toDoform.endTime"
            style="width: 100%;"
            value-format="HH-mm-ss"
          ></el-time-picker>
        </el-form-item>
      </el-col>-->
    </el-form-item>
    <el-form-item label="是否提醒" prop="notice">
      <el-switch v-model="toDoform.notice"></el-switch>
    </el-form-item>
    <el-form-item label="重要度" prop="importance">
      <el-radio-group v-model="toDoform.importance">
        <el-radio label="重要且紧急" name="importance"></el-radio>
        <el-radio label="重要不紧急" name="importance"></el-radio>
        <el-radio label="紧急不重要" name="importance"></el-radio>
        <el-radio label="紧急且重要" name="importance"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="详细内容" prop="detail">
      <el-input type="textarea" :rows="4" v-model="toDoform.detail"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('toDoform')">立即创建</el-button>
      <el-button @click="resetForm('toDoform')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script scoped>
// import db from "../../dataStore/index";
export default {
  data() {
    return {
      toDoform: {
        name: "",
        belong: "",
        endDate: "",
        endTime: "",
        notice: false,
        importance: "",
        detail: "",
        flag: 1
      },
      rules: {
        name: [
          { required: true, message: "请输入待作事件名称", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        belong: [
          { required: true, message: "请选择所属标签", trigger: "change" }
        ],
        endDate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        // endTime: [
        //   {
        //     required: true,
        //     message: "请选择时间",
        //     trigger: "change"
        //   }
        // ],
        importance: [
          { required: true, message: "请选个事件的重要度", trigger: "change" }
        ]
        // notice: [
        //   { required: true, message: "请选择确认是否提醒", trigger: "change" }
        // ]
        // detail: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      console.log(this.toDoform.name);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let result = this.$db
            .get("toDo")
            .insert({
              // 对数组进行insert操作
              name: this.toDoform.name,
              belong: this.toDoform.belong,
              endDate: this.toDoform.endDate,
              endTime: this.toDoform.endTime,
              notice: this.toDoform.notice,
              importance: this.toDoform.importance,
              detail: this.toDoform.detail,
              flag: 0
            })
            .write();
          if (result) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.resetForm("toDoform");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      console.log("chongzhi");
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="css" scoped>
.line {
  text-align: center;
}
</style>