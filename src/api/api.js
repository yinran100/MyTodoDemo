import Axios from "axios";

const postUrl = "todo.lanternfish.ai" //todo.lanternfish.ai

const caizhanRequest = Axios.create({
    baseURL: `https://${postUrl}`
});

export const login = params => caizhanRequest.post("/auth", params); //登录

export const sign = params => caizhanRequest.post("/user", params); //注册

export const getTodoList = params => caizhanRequest.get("/user/todo", params); //获取用户备忘录列表