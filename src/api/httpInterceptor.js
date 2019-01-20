import Axios from 'axios'
import Router from '@/router'
import Store from '@/store/store'
import {
    Message
} from 'element-ui'
const postUrl = "todo.lanternfish.ai" //todo.lanternfish.ai

const Request = Axios.create({
    baseURL: `https://${postUrl}`,
    timeout: 15000,
});
//请求拦截器
Request.interceptors.request.use(config => {
    if (Store.state.token.length != 0) { //jwt鉴权
        config.headers.Authorization = 'JWT ' + Store.state.token
    }
    return config
}, error => {
    Message({
        message: 'Request timed out',
        type: "error",
        center: true
    })
    return Promise.reject(error)
})
//响应拦截器
Request.interceptors.response.use(res => {
    return res.data
}, error => {
    if (error.response.status === 401 || error.response.status === 403) {
        Message({
            message: 'please login',
            center: true,
            type: "warning"
        })
        // 401  说明 token 验证失败 403
        // 可以直接跳转到登录页面，重新登录获取 token
        Router.replace({
            path: '/login',
            query: {
                redirect: Router.currentRoute.fullPath
            }
        })
    } else if (error.response.status === 500) {
        // 服务器错误
        // do something
        return Promise.reject(error.response.data)
    }
    // 返回 response 里的错误信息
    return Promise.reject(error.response.data)
})

export default Request