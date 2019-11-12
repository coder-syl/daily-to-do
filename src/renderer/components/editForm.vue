<template>
  <div class="drawer-content">
    <el-form ref="toDoform" :rules="rules" :model="toDoform" label-width="80px" disabled="disabled">
      <el-form-item label="待作名称" prop="name">
        <el-input v-model="toDoform.name" style="width:500px" placeholder="请添加新的标签"></el-input>
      </el-form-item>
      <el-form-item label="所属标签" prop="belong">
        <el-select v-model="toDoform.belong" placeholder="请选择所属标签">
          <el-option v-for="item in tags" :key="item.value" :label="item.tag" :value="item.tag"></el-option>
        </el-select>
        <el-button icon="el-icon-plus" circle @click="show=!show" v-show="show"></el-button>
        <el-input style="width:200px" v-model="newTag" placeholder="请添加新的标签" v-show="!show"></el-input>
        <el-button type="primary" @click="addTag" v-show="!show">确认</el-button>
      </el-form-item>
      <el-form-item label="预期时间">
        <el-col :span="11">
          <el-form-item prop="endDate">
            <el-date-picker
              v-model="toDoform.endDate"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy/MM/dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="是否提醒" prop="notice">
        <el-switch v-model="toDoform.notice"></el-switch>
      </el-form-item>
      <el-form-item label="重要度" prop="importance">
        <el-radio-group v-model="toDoform.importance">
          <el-radio label="重要且紧急" name="importance"></el-radio>
          <el-radio label="重要不紧急" name="importance"></el-radio>
          <el-radio label="紧急不重要" name="importance"></el-radio>
          <el-radio label="不紧急不重要" name="importance"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="详细内容" prop="detail">
        <el-input type="textarea" style="width:500px" :rows="4" v-model="toDoform.detail"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('toDoform')">立即创建</el-button>
        <el-button @click="resetForm('toDoform')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="demo-drawer__footer">
      <el-button @click="dialog = false">取 消</el-button>
      <el-button type="primary" @click="$refs.drawer.closeDrawer()">tijao</el-button>
    </div>
  </div>
</template>
<script scoped>
// import db from "../../dataStore/index";
export default {
  props: {
    editData: {},
    disabled: {}
  },
  data() {
    return {
      show: true,
      tags: [],
      newTag: "",
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

        importance: [
          { required: true, message: "请选个事件的重要度", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    this.initData();
  },
  watch: {
    editData: function() {
      this.initData();
    }
  },
  methods: {
    initData() {
      this.toDoform = this.editData;
      console.log("tasdfa sdf", this.toDoform);
    },
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
              message: "添加清单成功",
              type: "success"
            });
            this.resetForm("toDoform");
          }
        } else {
          this.$message.error("添加清单失败，请检查输入是否正确");
          return false;
        }
      });
    },
    resetForm(formName) {
      console.log("chongzhi");
      this.$refs[formName].resetFields();
    },
    addTag() {
      if (this.newTag !== "") {
        console.log("插入数据");
        console.log(this.newTag);
        // let result =
        console.log();
        if (
          this.$db
            .get("tags")
            .insert({
              tag: this.newTag
            })
            .write()
        ) {
          this.$message({
            message: "添加标签成功",
            type: "success"
          });
          this.newTag = "";
          this.show = !this.show;
          return true;
        }
      } else {
        this.$message.error("添加标签失败，请检查输入是否正确");
        return false;
      }
    }
  }
};
</script>

<style lang="css" scoped>
.drawer-content {
  margin-left: 20px;
}
</style>