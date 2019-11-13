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
  mounted() {
    this.iniData();
  },
  methods: {
    /** 初始化数据，读取json赋值给tableData */
    iniData() {
      let TodoData = this.$db
        .get("toDo")
        .filter({ flag: 0 })
        .sortBy("endDate")
        .value();
      for (let item of TodoData) {
        if (dateFromat.dayDiff(item.endDate) === 0) {
          this.toDoListData.push(item);
        }
      }
    }
  }
};
</script>