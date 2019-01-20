<template>

  <el-dialog class="input-wrapper"
    :title="editModel?'Modify Todo':'Add Todo'"
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
        @click="commitTodo">submit</el-button>
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
  computed: {
    editModel() {
      return this.modifyContent.length != 0;
    }
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
        this.$emit(this.editModel ? "modify" : "add", this.todoContent);
      }
    },
    close() {
      this.todoContent = "";
      this.$emit("closeDialog");
      this.committing = false;
    },
    closeDialog() {
      if (!this.editModel || this.modifyContent == this.todoContent)
        return this.close();
      this.$confirm(
        "Your content will not be saved.",
        "Are you sure you want to cancel the input?",
        {
          type: "warning",
          cancelButtonText: "cancel",
          confirmButtonText: "confirm"
        }
      ).then(
        () => {
          this.close();
        },
        () => {
          return;
        }
      );
    }
  }
};
</script>

<style lang="stylus" scoped>
.input-wrapper>>>.el-textarea__inner
  max-height: 200px
</style>
