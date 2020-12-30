deleteComment: async function() {
    if (confirm("Your comment will be permanently deleted")) {
        const token = JSON.parse(sessionStorage.getItem('jwt'))

        let postId
        let comment
        let userId

        const commentId = event.target.id

        //this works but prints can not read property of undefined commentId
        // for (let i = 0; i < vm.posts.length; i++) {
        //   for (let j = 0; j < vm.posts.length; j++) {
        //     console.log(vm.posts[i].comments[j].commentId)
        //   }
        // }

        //this doesn't do what it should
        // for (let i = 0; i < vm.posts.length; i++) {
        //   for (let j = 0; j < vm.posts.length; j++) {
        //     if (vm.posts[i].comments[j].commentId == commentId) {
        //       postId = vm.posts[i].comments[j].postId
        //       comment = vm.posts[i].comments[j].comment
        //       userId = vm.posts[i].comments[j].userId
        //     }
        //   }
        // }

        // this stopped working saying error type but now works
        for (let post of vm.posts) {
            for (let commentList of post.comments) {
                if (commentList.commentId === commentId) {
                    postId = commentList.postId
                    comment = commentList.comment
                    userId = commentList.userId
                }
            }
        }

        const data = {
            commentId: commentId,
            userId: userId,
            comment: comment,
            postId: postId
        }

        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        };
        const request = await fetch('http://localhost:5001/deleteComment', options)
        const jsonResponse = await request.json()
        if (jsonResponse.error) {
            alert(jsonResponse.error)
        } else {
            alert(jsonResponse.message)
        }
    }

    else {
        console.log("comment not deleted");
    }


    // sessionStorage.removeItem('jwt');
    // sessionStorage.removeItem('userId');
    await this.fetchPosts()

}