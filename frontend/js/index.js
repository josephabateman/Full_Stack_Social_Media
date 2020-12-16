//fetch should not be hard coded - dynamic url and port

//logout
const logout = document.getElementById('logout')
logout.onclick = () => {
    sessionStorage.removeItem('jwt');
    location.href = "/login.html"
}

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

//post request
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