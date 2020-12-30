logout: function () {
    if (confirm('If you log out you will need to log in again')) {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('userId');
        this.loggedIn = false
        location.reload()
    }
}