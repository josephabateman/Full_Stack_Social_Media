// fetch('http://localhost:5001/data')
// .then(res => res.json())
// .then(data => console.log(data))

//fetch should not be hard coded - dynamic url and port

async function fetchTableData() {
    const response = await fetch('http://localhost:5001/posts')
    // console.log(response)
    const jsonData = await response.json()
    // console.log(jsonData)
    // return jsonData

    for (let i in jsonData) {
        const addToHtmlPage = document.getElementById('posts')

        const caption = document.createElement('h2')
        caption.innerText = jsonData[i].caption

        // file upload

        const comments = document.createElement('p')
        comments.innerText = jsonData[i].comments

        addToHtmlPage.appendChild(caption)
        addToHtmlPage.appendChild(comments)

        //usersLiked

        //usersDisliked

    }
}
fetchTableData()

const addAPost = () => {
    const createPost = document.getElementById('create-post')
    createPost.onclick = async () => {
        const caption = prompt('write a caption')
        console.log(caption)
    
        const data = {caption}
        console.log(data)
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:5001/submitPost', options);
        const status = await response.json();
        console.log(status)
    }
}
addAPost()
