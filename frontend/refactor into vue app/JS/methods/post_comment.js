postComment: async function () {
    const writeAComment = prompt('write a comment')
    const token = JSON.parse(sessionStorage.getItem('jwt'))
    const postId = event.target.id;

    if (writeAComment !== '') {
        const data = {
            comment: writeAComment,
            post_Id: postId
        }

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        };

        const request = await fetch('http://localhost:5001/addComment', options);
        const response = await request.json();
        if (response.error) {
            alert(response.error)
        }
        // vm.createPostResponse = response
        // this.createPostButtonClicked = false;

    }
    await this.fetchPosts()
}