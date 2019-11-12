<template>
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
  >
    <el-table-column label="end-date" prop="endDate" width="160" sortable></el-table-column>
    <el-table-column label="to-do-list" prop="name"></el-table-column>
    <el-table-column
      prop="importance"
      label="重要度"
      width="150"
      :filters="[{ text: '重要且紧急', value: '重要且紧急' }, { text: '重要不紧急', value: '重要不紧急' },{text: '紧急且重要', value: '紧急且重要'},{ text: '紧急不重要', value: '紧急不重要'}]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template slot-scope="scope">
        <el-tag :type="getType(scope.row.importance )" disable-transitions>{{scope.row.importance}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button size="mini" type="success" @click="handleDelete(scope.$index, scope.row,1)">加入完成</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row,2)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { dateFromat } from "./../utils/FormatDate.js";
export default {
  data() {
    return {
      tableData: [],
      search: ""
    };
  },
  mounted() {
    this.iniData();
  },
  methods: {
    getType(importanceValue) {
      if (importanceValue === "重要且紧急") {
        return "danger";
      }
      if (importanceValue === "重要不紧急") {
        return "warning";
      }
      if (importanceValue === "紧急不重要") {
        return "primary";
      }
      if (importanceValue === "不紧急不重要") {
        return "info";
      }
    },
    filterTag(value, row) {
      return row.importance === value;
    },
    /** 初始化数据，读取json赋值给tableData */
    iniData() {
      let TodoData = this.$db
        .get("toDo")
        .filter({ flag: 0 })
        .sortBy("endDate")
        .value();
      console.log("today");
      console.log(this.tableData);
      for (let item of TodoData) {
        console.log(item);
        console.log(dateFromat);
        if (dateFromat.dayDiff(item.endDate) <= 7) {
          this.tableData.push(item);
        }
        console.log(item.endDate);
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
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