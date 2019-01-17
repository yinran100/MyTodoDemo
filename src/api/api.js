import Axios from "axios";

const postUrl = "todo.lanternfish.ai" //todo.lanternfish.ai

const caizhanRequest = Axios.create({
    baseURL: `https://${postUrl}`,
    transformRequest: [
        //axios请求将json格式数据转换为FormData
        function (data) {
            let ret = "";
            for (let it in data) {
                ret +=
                    encodeURIComponent(it) +
                    "=" +
                    encodeURIComponent(data[it]) +
                    "&";
            }
            return ret;
        }
    ],
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});

export const login = params => caizhanRequest.post("/auth", params); //登录