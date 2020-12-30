fetchPosts: async function () {
    const token = JSON.parse(sessionStorage.getItem('jwt'))
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    const response = await fetch('http://localhost:5001', options)
    const jsonData = await response.json()
    // console.log(jsonData)

    vm.posts = jsonData

}