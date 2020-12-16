const addUserToDatabase = async () => {
    const email = prompt('enter your email')
    const password = prompt('enter a strong password')

    const data = {
        email,
        password
    }
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const sendData = await fetch('http://localhost:5001/signup', options);
    const responseObject = await sendData.json();
    console.log(responseObject)
}
addUserToDatabase()