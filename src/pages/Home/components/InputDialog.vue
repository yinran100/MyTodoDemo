<template>

  <el-dialog class="input-wrapper"
    :title="modifyContent.length==0?'Add Todo':'Modify Todo'"
    :visible="dialogVisible"
    @open='todoContent=modifyContent'
    @close="closeDialog"
    :close-on-click-modal="false">
    <el-input type="textarea"
      :rows="3"
      :clearable="true"
      placeholder="The content length between 1~20!"
      v-model.trim="todoContent">
    </el-input>
    <div slot="footer"
      class="dialog-footer">
      <el-button @click="closeDialog">cancel</el-button>
      <el-button type="primary"
        @click="commitTodo">commit</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "InputDialog",
  props: {
    modifyContent: {
      type: String,
      default: ""
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      todoContent: "",
      committing: false
    };
  },
  methods: {
    commitTodo() {
      if (this.committing) return;
      if (this.todoContent.length < 1 || this.todoContent.length > 20)
        return this.$message({
          message: "The content length between 1~20!",
          type: "warning",
          center: true
        });
      else {
        this.committing = true;
        this.$emit(
          this.modifyContent.length == 0 ? "add" : "modify",
          this.todoContent
        );
      }
    },
    closeDialog() {
      this.todoContent = "";
      this.$emit("closeDialog");
      this.committing = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.input-wrapper>>>.el-textarea__inner
  max-height: 200px
</style>
