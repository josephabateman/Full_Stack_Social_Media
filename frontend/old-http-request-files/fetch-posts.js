//get all data
async function fetchTableData() {
    const token = JSON.parse(sessionStorage.getItem('jwt'))
    // const userId = JSON.parse(sessionStorage.getItem('userId'))
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch('http://localhost:5001', options)
    const jsonData = await response.json()

    for (let i in jsonData) {
        const addToHtmlPage = document.getElementById('posts')

        const divCard = document.createElement('div')
        divCard.id = jsonData[i].id

        //delete button
        const deleteButton = document.createElement('button')
        deleteButton.innerText = 'delete post'
        deleteButton.className = 'delete'

        //modify button
        const modifyButton = document.createElement('button')
        modifyButton.innerText = 'modify post'
        modifyButton.className = 'modify'

        const caption = document.createElement('h2')
        caption.innerText = jsonData[i].caption

        // file upload

        const comments = document.createElement('p')
        comments.innerText = jsonData[i].comments

        addToHtmlPage.appendChild(divCard)
        divCard.appendChild(caption)
        divCard.appendChild(comments)
        divCard.appendChild(deleteButton)
        divCard.appendChild(modifyButton)

        //usersLiked

        //usersDisliked

    }

}
fetchTableData()