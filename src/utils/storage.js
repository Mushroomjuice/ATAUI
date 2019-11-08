export default {
    getstorage: function(name, value) {
        return localStorage.getItem(name) ? localStorage.getItem(name) : value
    },
    setstorage: function(name, value) {
        localStorage.setItem(name, value)

    }
}