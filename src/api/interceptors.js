import Axios from 'axios'
import router from '@/router'
import Store from '@/store/store'
import {
    getState
} from "@/api/api"
import {
    MessageBox,
    Message
} from 'element-ui'
const Request = Axios.create({
    baseURL: `https://${Store.state.systemInfo.postUrl}`
});
// 拦截request,设置全局请求为ajax请求 
Request.interceptors.request.use(config => {
    return config
}, error => {
    // loadpage.close()
    Message.error({
        message: '加载超时',
        center: true
    })
    return Promise.reject(error)
})

// 拦截响应response，并做一些错误处理
Request.interceptors.response.use(response => {
    const data = response.data
    // 根据返回的code值来做不同的处理（和后端约定）
    switch (data.code) {
        case 0: //后台没有成功
            Message.error({
                message: data.message,
                center: true
            })
            // loadpage.close();
            break
            // 需要重新登录
        case 105:
            router.replace({
                path: '/login',
                query: {
                    redirect: router.currentRoute.fullPath
                }
            })
            Store.commit("saveToken", "");
            Store.commit("saveUserMsg");
            Store.commit("saveLogin", 0);
            data.description = data.message
            break
        case 206: //页面停留时间太长
            Message.warning({
                message: data.message,
                center: true
            })
            if (getState) getState();
            break
        default:
            return data
    }
    // 若不是正确的返回code，且已经登录，就抛出错误
    const err = new Error(data.description)
    err.data = data
    err.response = response

    throw err
}, err => { // 这里是返回状态码不为200时候的错误处理
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '请求错误'
                break

            case 401:
                err.message = '未授权，请登录'
                break

            case 403:
                err.message = '拒绝访问'
                break

            case 404:
                err.message = `请求地址出错: ${err.response.config.url}`
                break

            case 408:
                err.message = '请求超时'
                break

            case 500:
                err.message = '服务器内部错误'
                break

            case 501:
                err.message = '服务未实现'
                break

            case 502:
                err.message = '网关错误'
                break

            case 503:
                err.message = '服务不可用'
                break

            case 504:
                err.message = '网关超时'
                break

            case 505:
                err.message = 'HTTP版本不受支持'
                break
            default:
                err.message = `未知错误,${err.response.status}`
        }
        MessageBox.alert("网络出错！" + err.message, "请求失败", {
            type: "error"
        })
    }
    return Promise.reject(err)
})

export default Request