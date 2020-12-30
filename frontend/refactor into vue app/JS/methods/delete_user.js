deleteUser: async function () {
    const deletePostsToo = prompt('This will also delete all your past posts. Are you sure you want to proceed? Type YES to proceed')
    console.log(deletePostsToo)
    if (deletePostsToo === 'yes' || deletePostsToo === 'YES') {
        const token = JSON.parse(sessionStorage.getItem('jwt'))

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            // body: JSON.stringify(data)
        };
        const request = await fetch('http://localhost:5001/deleteUser', options)
        const jsonResponse = await request.json()
        if (jsonResponse.error) {
            alert(jsonResponse.error)
        } else {
            alert(jsonResponse.message)
        }
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('userId');
        location.reload()
    }
}