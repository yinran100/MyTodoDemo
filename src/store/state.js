let token = '',
    userInfo = {
        id: '',
        username: '',
        name: ""
    }


try {
    if (localStorage.token) token = JSON.parse(localStorage.token);
    if (localStorage.userInfo) userInfo = JSON.parse(localStorage.userInfo);
} catch (error) {
    //
}

export default {
    token,
    userInfo
};