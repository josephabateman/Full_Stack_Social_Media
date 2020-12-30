deletePost: async function () {
    const postId = event.target.id;
    const token = JSON.parse(sessionStorage.getItem('jwt'))

    const data = {
        postId
    }

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    };
    const request = await fetch('http://localhost:5001/posts', options)
    const jsonResponse = await request.json()
    if (jsonResponse.error) {
        alert(jsonResponse.error)
    } else {
        alert(jsonResponse.message)
    }
    await this.fetchPosts()
}