const modifyOrDeletePost = () => {
    const postToDelete = document.body

    //put post (modify)
    postToDelete.onclick = async function myFunction(event) {
        if (event.target.className === 'modify') {
            console.log(event.target.className)
            const caption = prompt('Modify the caption')
            const comment = prompt('Modify the comments')

            const postId = event.target.parentNode.id;

            const token = JSON.parse(sessionStorage.getItem('jwt'))
            // const userId = JSON.parse(sessionStorage.getItem('userId'))

            const data = {
                // userId,
                postId,
                caption,
                comment
            }
            console.log(data)
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('http://localhost:5001/posts', options)
            const jsonData = await response.json()
            console.log(jsonData)

            //delete post
        } else if (event.target.className === 'delete') {
            console.log(event.target.className)

            const postId = event.target.parentNode.id;

            const token = JSON.parse(sessionStorage.getItem('jwt'))
            // const userId = JSON.parse(sessionStorage.getItem('userId'))

            const data = {
                // userId,
                postId
            }
            console.log(data)
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('http://localhost:5001/posts', options)
            const jsonData = await response.json()
            console.log(jsonData)
        }
    }
}
modifyOrDeletePost()