fetchOne: function() {
    const postId = document.getElementById(this.postIdToModify)

    this.modifyPostData = {
        time: postId.parentNode.parentNode.childNodes[0].innerText,
        caption: postId.parentNode.parentNode.childNodes[2].innerText
    }
}