<template>
  <el-row type="flex"
    justify="space-around"
    @click.native.self="showDeleteIndex=-1">
    <el-col :sm="24"
      :md="20"
      :lg="16">
      <div class="todo-wrapper"
        v-loading="loading">
        <div class="logout-btn">
          <el-button type="danger"
            @click="logout">Logout</el-button>
        </div>

        <el-card>
          <div slot="header"
            class=" clearfix">
            <span class="card-title">your Todo-List</span>
            <el-button style="float: right; padding: 3px 0"
              type="text"
              @click="dialogVisible=true">add todo</el-button>
          </div>
          <p class="tip"
            v-show="todoList.length==0">Currently there is no any todo</p>
          <transition-group tag="div"
            name="el-zoom-in-top">
            <div class="todo-item"
              v-for="(item,index) in todoList"
              @mouseenter="showDeleteIndex=index"
              :key="item.id">
              <div class="todo-content">{{item.title}}</div>

              <div class="edit-btn"
                v-show="showDeleteIndex===index"
                @click="showEdit(index)"><i class="el-icon-edit"></i></div>

              <div class="delete-btn"
                v-show="showDeleteIndex===index"
                @click="confirm(index)"><i class="el-icon-delete"></i></div>

            </div>
          </transition-group>
        </el-card>

        <input-dialog :dialogVisible="dialogVisible"
          :modifyContent="modifyTodoItem?modifyTodoItem.title:''"
          @add="commit"
          @modify="modify"
          @closeDialog="()=>{dialogVisible=false,modifyTodoItem=null}"></input-dialog>

      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getTodoList, addTodo, deleteTodo, modifyTodo } from "@/api/api";
import { mapState } from "vuex";
import InputDialog from "./components/InputDialog";
export default {
  name: "Home",
  components: {
    InputDialog
  },
  data() {
    return {
      loading: true,
      dialogVisible: false,
      showDeleteIndex: -1,
      modifyTodoItem: null,
      todoList: []
    };
  },
  computed: {
    ...mapState(["token"])
  },
  mounted() {
    getTodoList().then(
      data => {
        this.loading = false;
        if (data) this.todoList = data;
      },
      err => this.showErrorMessage(err.message)
    );
  },
  methods: {
    commit(title) {
      addTodo({ title }).then(
        data => {
          if (data) {
            this.todoList.push(data);
            this.dialogVisible = false;
            this.$message({
              message: "successfully added!",
              type: "success"
            });
          }
        },
        err => this.showErrorMessage(err.message)
      );
    },
    logout() {
      this.$confirm("Are you sure to logout your account?", {
        type: "warning",
        cancelButtonText: "cancel",
        confirmButtonText: "confirm"
      }).then(
        () => {
          this.$store.commit("saveToken", "");
          this.$router.push("/login");
        },
        () => {}
      );
    },
    confirm(index) {
      this.$confirm("Are you sure to delete this item?", {
        type: "warning",
        cancelButtonText: "cancel",
        confirmButtonText: "confirm"
      }).then(
        () => {
          this.deleteTodoById(index);
        },
        () => {}
      );
    },
    deleteTodoById(index) {
      deleteTodo(this.todoList[index].id).then(
        data => {
          if (data) {
            this.todoList.splice(index, 1);
          }
        },
        err => this.showErrorMessage(err.message)
      );
    },
    showEdit(index) {
      this.modifyTodoItem = this.todoList[index];
      this.dialogVisible = true;
    },
    modify(title) {
      modifyTodo(this.modifyTodoItem.id, { title }).then(
        data => {
          console.log(data);
          this.dialogVisible = false;
          this.todoList.splice(this.showDeleteIndex, 1, {
            id: this.modifyTodoItem.id,
            title
          });
          this.modifyTodoItem = null;
          this.$message({
            message: "modify successfully!",
            type: "success"
          });
        },
        err => this.showErrorMessage(err.message)
      );
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-card>>>.card-title
  font-weight: bold
  font-size: 18px

.todo-wrapper
  margin: 30px 0

  .logout-btn
    text-align: right

  .el-card
    padding: 20px 30px
    margin: 15px 0

.tip
  color: #909399
  font-size: 14px

.todo-item
  padding: 20px
  display: flex
  align-items: center
  margin: 15px 0
  border-radius: 5px
  background-color: #F2F6FC

  &:hover
    background-color: #ecf5ff

  .todo-content
    flex: 1
    margin-right: 50px

  .edit-btn
    margin-right: 30px
    color: #409EFF
    font-size: 18px
    line-height: 0
    float: left

    &:hover
      color: #91c6fd
      cursor: pointer

  .delete-btn
    color: #F56C6C
    font-size: 18px
    line-height: 0

    &:hover
      color: #ffbcbc
      cursor: pointer
</style>
