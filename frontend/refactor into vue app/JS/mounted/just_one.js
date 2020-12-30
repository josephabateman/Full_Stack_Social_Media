mounted: function () {
    const logInBtn = document.getElementById('log_in_btn')
    const signUpBtn = document.getElementById('sign_up_btn')
    signUpBtn.onclick = () => {
        signUpBtn.classList.remove('btn-secondary')
        logInBtn.classList.add('btn-secondary')
        signUpBtn.classList.add('btn-primary')
    }
    logInBtn.onclick = () => {
        logInBtn.classList.remove('btn-secondary')
        signUpBtn.classList.add('btn-secondary')
        logInBtn.classList.add('btn-primary')
    }
}