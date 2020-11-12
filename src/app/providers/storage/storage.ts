export const storage = {

    getToken() {
        return localStorage.getItem('token')
            ? localStorage.getItem('token')
            : '';
        // return userToken;
    },

    setToken(token) {
        if (localStorage.getItem('token') !== null) {
            this.removeToken();
        }
        localStorage.setItem('token', token ? token : '');
    },

    removeToken() {
        localStorage.removeItem('token');
    },

    checkToken() {
        if (localStorage.getItem('token')) {
            return true
        }
        else {
            return false
        }
    }
}