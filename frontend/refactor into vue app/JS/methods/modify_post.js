modifyPost: async function () {
    const token = JSON.parse(sessionStorage.getItem('jwt'))
    // const userId = JSON.parse(sessionStorage.getItem('userId'))

    const caption = document.getElementById('writeCaption').value
    const file = document.getElementById('file_to_submit').files[0]
    const postId = this.postIdToModify;

    if (caption !== '') {
        // console.log(file)
        const fd = new FormData()
        fd.append('myFile', file)
        // fd.append('userId', userId)
        fd.append('caption', caption)
        fd.append('postId', postId)

        const options = {
            method: 'PUT',
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: fd
        };

        const response = await fetch('http://localhost:5001/posts', options);
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        if (jsonResponse.error) {
            alert(jsonResponse.error)
        }
        this.modifyButtonClicked = false
        await this.fetchPosts()
    }
}