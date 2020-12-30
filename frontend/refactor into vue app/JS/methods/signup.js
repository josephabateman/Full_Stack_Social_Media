signup: async function () {
    //basic validation
    if (this.email === '' || this.password === '') {
        alert('Both fields must have values')
        return
    }

    try {
        const data = {
            email: this.email,
            password: this.password
        }
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const request = await fetch('http://localhost:5001/signup', options);
        const response = await request.json();
        if (response.error) {
            alert(response.error)
        } else {
            this.signupButtonClicked = false
            await this.login()
        }
    } catch (error) {
        console.log(error)
    }
}