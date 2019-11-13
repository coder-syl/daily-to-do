<template>
  <div>
    <toDoList :toDoListData="toDoListData"></toDoList>
  </div>
</template>

<script>
import { dateFromat } from "./../utils/FormatDate.js";
import toDoList from "../components/toDoList";
export default {
  components: {
    toDoList
  },
  data() {
    return {
      toDoListData: []
    };
  },
  created() {
    this.iniData();
  },
  methods: {
    /** 初始化数据，读取json赋值给tableData */
    iniData() {
      this.toDoListData = this.$db
        .get("toDo")
        .filter({ flag: 0 })
        .sortBy("endDate")
        .value();
      console.log(this.toDoListData);
    }
  }
};
</script>
<style  scoped>
</style>