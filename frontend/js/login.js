// try {
//     const login = async () => {
//         const email = prompt('enter your email')
//         const password = prompt('enter your password')

//         const data = {
//             email,
//             password
//         }
//         console.log(data)

//         const options = {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data)
//         };
//         const sendData = await fetch('http://localhost:5001/login', options)
//         const responseObject = await sendData.json()
//         console.log(responseObject)

//         if (responseObject.token !== undefined) {
//             sessionStorage.setItem('jwt', JSON.stringify(responseObject.token))
//             sessionStorage.setItem('userId', JSON.stringify(responseObject.userId))
//             location.href = '/index.html'
//         }
//     }
//     login()
// } catch (error) {
//     console.log(error)
// }