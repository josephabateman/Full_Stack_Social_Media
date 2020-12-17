const addAPost = () => {

    const token = JSON.parse(sessionStorage.getItem('jwt'))
    const userId = JSON.parse(sessionStorage.getItem('userId'))

    const createPost = document.getElementById('create-post')
    createPost.onclick = async () => {
        const caption = prompt('write a caption')
        console.log(caption)

        const data = {
            userId,
            caption
        }
        console.log(data)
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:5001/posts', options);
        const jsonResponse = await response.json();
        console.log(jsonResponse.status)
    }
}
addAPost()