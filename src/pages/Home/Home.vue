<template>
  <el-row type="flex"
    justify="space-around">
    <el-col :sm="24"
      :md="20"
      :lg="16">
      <div v-loading="loading">
        主页

      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getTodoList } from "@/api/api";
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      loading: true,
      todoList: []
    };
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {
    getTodoList({ token: "affaelfhi" }).then(
      res => {
        this.loading = false;
      },
      () => {}
    );
  },
  methods: {}
};
</script>

<style scoped>
</style>