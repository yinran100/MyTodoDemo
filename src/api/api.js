import caizhanRequest from "./interceptors";
// import Store from '@/store/store'

function updateParams(params) {
    return Object.assign({
    }, params)
}

export const checkCode = params => caizhanRequest.post("/user/code", updateParams(params)); //点击获取验证码
