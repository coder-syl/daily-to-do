<template>
  <div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column label="end-date" prop="endDate" width="160" sortable></el-table-column>
      <el-table-column label="to-do-list" prop="name"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleDelete(scope.$index, scope.row,0)"
          >设为待作</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row,2)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      :visible.sync="showDrawer"
      direction="rtl"
      size="60%"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <editForm :disabled="true" :editData="editData"></editForm>
    </el-drawer>
  </div>
</template>

<script>
import editForm from "../components/editForm";
export default {
  components: {
    editForm
  },
  data() {
    return {
      showDrawer: false,
      editData: {},
      tableData: [],
      search: ""
    };
  },
  mounted() {
    this.iniData();
  },
  methods: {
    /** 初始化数据，读取json赋值给tableData */
    iniData() {
      this.tableData = this.$db
        .get("toDo")
        .filter({ flag: 1 })
        .value();
      console.log(this.tableData);
    },
    handleEdit(index, row) {
      this.editData = row;
      console.log(this.editData);
      this.showDrawer = true;
    },
    handleDelete(index, row, flag) {
      console.log(index, row);
      let result = this.$db
        .get("toDo")
        .find({ id: row.id })
        .assign({ flag: flag })
        .write();
      if (result) {
        this.$message({
          message: "操作成功",
          type: "success"
        });
        this.iniData();
      } else {
        this.$message({
          message: "操作失败",
          type: "warning"
        });
        this.iniData();
      }
    }
  }
};
</script>