login: async function (email, password) {
    try {
        const data = {
            email: this.email,
            password: this.password
        }
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
        const request = await fetch('http://localhost:5001/login', options)
        const response = await request.json()
        if (response.error) {
            alert(response.error)
        }
        if (response.token !== undefined) {
            sessionStorage.setItem('jwt', JSON.stringify(response.token))
            sessionStorage.setItem('userId', JSON.stringify(response.userId))
            this.email = ''
            this.password = ''
            this.loggedIn = true

            const parsedUserId = JSON.parse(sessionStorage.getItem('userId'))
            this.userId = parsedUserId
            await this.fetchPosts()
        }
    } catch (error) {
        console.log(error)
    }
}