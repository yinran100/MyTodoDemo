let token = ''


try {
    if (localStorage.token) token = JSON.parse(localStorage.token);
} catch (error) {
    //
}

export default {
    token
};