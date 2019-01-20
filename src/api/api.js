import httpRequest from "./httpInterceptor.js";

export const login = params => httpRequest.post("/auth", params); //登录

export const sign = params => httpRequest.post("/user", params); //注册

export const getTodoList = params => httpRequest.get("/user/todo", params); //获取用户备忘录列表

export const addTodo = params => httpRequest.post("/todo", params); //添加备忘录

export const deleteTodo = params => httpRequest.delete("/todo/" + params); //删除备忘录

export const modifyTodo = (params, content) => httpRequest.put("/todo/" + params, content); //修改备忘录