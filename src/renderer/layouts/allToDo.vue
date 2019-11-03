<template>
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
  >
    <el-table-column label="end-date" prop="endDate"></el-table-column>
    <el-table-column label="to-do-list" prop="name"></el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">加入完成</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      search: ""
    };
  },
  mounted() {
    this.tableData = this.$db.get("toDo").value();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      let result = this.$db
        .get("toDo")
        .removeById(row.id)
        .write();
      if (result) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
      } else {
        this.$message({
          message: "删除失败",
          type: "warning"
        });
      }
    }
  }
};
</script>