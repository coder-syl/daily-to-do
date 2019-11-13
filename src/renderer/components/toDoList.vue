<template>
  <div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    >
      <el-table-column
        label="end-date"
        prop="endDate"
        width="160"
        column-key="endDate"
        :filters="[{text: '今天', value: 'today'}, {text: '最近七天', value: 'sevenDay'}]"
        :filter-method="filterHandler"
        sortable
      ></el-table-column>
      <el-table-column label="to-do-list" prop="name"></el-table-column>
      <el-table-column
        prop="importance"
        label="重要度"
        width="150"
        :filters="[{ text: '重要且紧急', value: '重要且紧急' }, { text: '重要不紧急', value: '重要不紧急' },{text: '紧急不重要', value: '紧急不重要'},{ text: '不紧急不重要', value: '不紧急不重要'}]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="getType(scope.row.importance )"
            disable-transitions
          >{{scope.row.importance}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleDelete(scope.$index, scope.row,1)"
          >加入完成</el-button>

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row,2)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-button type="text" @click>打开嵌套 Form 的 Drawer</el-button> -->
    <el-drawer
      :visible.sync="showDrawer"
      direction="rtl"
      size="60%"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <editForm :editData="editData"></editForm>
    </el-drawer>
  </div>
</template>

<script>
import { dateFromat } from "./../utils/FormatDate.js";
import editForm from "../components/editForm";
export default {
  components: {
    editForm
  },
  props: {
    toDoListData: {
      require: true
    }
  },
  data() {
    return {
      showDrawer: false,
      tableData: [],
      editData: {},
      search: ""
    };
  },
  created() {
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
    filterHandler(value, row, column) {
      const property = column["property"];
      if (value === "today") {
        return dateFromat.dayDiff(row[property]) === 0;
      } else if (value === "sevenDay") {
        return dateFromat.dayDiff(row[property]) <= 7;
      }
    },
    /** 初始化数据，读取json赋值给tableData */
    iniData() {
      this.tableData = this.toDoListData;
      console.log("to do list", this.toDoListData);
      //   this.$db
      //     .get("toDo")
      //     .filter({ flag: 0 })
      //     .sortBy("endDate")
      //     .value();
      //   console.log(this.tableData);
      //   for (let item of this.tableData) {
      //     console.log(item);
      //     console.log(dateFromat);
      //     console.log(dateFromat.dayDiff(item.endDate));
      //     console.log(item.endDate);
      //   }
    },
    handleEdit(index, row) {
      // console.log(index, row);
      // console.log(row);
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
        var index = this.tableData.indexOf(row);
        if (index > -1) {
          this.tableData.splice(index, 1);
        }
      } else {
        this.$message({
          message: "操作失败",
          type: "warning"
        });
        var index = this.tableData.indexOf(row);
        if (index > -1) {
          this.tableData.splice(index, 1);
        }
      }
    }
  }
};
</script>
<style  scoped>
</style>