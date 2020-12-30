createPost: async function () {
    const token = JSON.parse(sessionStorage.getItem('jwt'))
    const userId = JSON.parse(sessionStorage.getItem('userId'))

    const caption = document.getElementById('writeCaption').value
    const file = document.getElementById('file_to_submit').files[0]

    if (caption !== '') {
        // console.log(file)
        const fd = new FormData()
        fd.append('myFile', file)
        fd.append('userId', userId)
        fd.append('caption', caption)

        const options = {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: fd
        };

        const request = await fetch('http://localhost:5001/posts', options);
        const response = await request.json();
        if (response.error) {
            alert(response.error)
        }
        vm.createPostResponse = response
        this.createPostButtonClicked = false;
        await this.fetchPosts()
    }
}