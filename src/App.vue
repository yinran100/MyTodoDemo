
<template>
  <div class="page-body">
    <el-scrollbar ref="scrollbar"
      class="scroll-page"
      :native="false">
      <router-view class="router-class"></router-view>
    </el-scrollbar>
    <to-top-button :getTarger="getScrollTarget"></to-top-button>
  </div>

</template>

<script>
import ToTopButton from "@/components/ToTopButton";
export default {
  name: "App",
  components: {
    ToTopButton
  },
  methods: {
    getScrollTarget() {
      return this.$refs.scrollbar.wrap;
    }
  }
};
</script>

<style lang='stylus'  scoped>

.page-body
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0

.el-scrollbar
  height: 100%

.scroll-page .el-scrollbar__wrap
  overflow-x: hidden
</style>
