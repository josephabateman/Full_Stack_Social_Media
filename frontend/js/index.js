const vm = new Vue({
    el: '#app',
    data: {
      email: '',
      password: '',
      posts: [],
      createPostResponse: [],
      loggedIn: false
    },
    /* Below is an example of a vue instance lifecycle - see documentation
    this is essential to work */
    // created: function () {
    //   this.fetchPosts()
    // },
    // process: function () {
    //   this.loggedIn = true;
    // },
    methods: {
        
      login: async function () {
        try {
          
          const email = this.email
          const password = this.password

          const data = {
            email,
            password
          }

          const options = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          };
          const sendData = await fetch('http://localhost:5001/login', options)
          const responseObject = await sendData.json()

          if (responseObject.token !== undefined) {
            sessionStorage.setItem('jwt', JSON.stringify(responseObject.token))
            sessionStorage.setItem('userId', JSON.stringify(responseObject.userId))
            this.email = ''
            this.password = ''
            this.loggedIn = true
            this.fetchPosts()
          }

        } catch (error) {
          console.log(error)
        }
      },
      logout: function () {
        if (confirm('If you log out you will need to login again')) {
          sessionStorage.removeItem('jwt');
          this.loggedIn = false
        }
      },
      fetchPosts: async function () {
        const token = JSON.parse(sessionStorage.getItem('jwt'))
        const options = {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        const response = await fetch('http://localhost:5001', options)
        const jsonData = await response.json()
        vm.posts = jsonData
      },
      createPost: async function () {
        const token = JSON.parse(sessionStorage.getItem('jwt'))
        const userId = JSON.parse(sessionStorage.getItem('userId'))

        const caption = prompt('write a caption')
        if (caption !== '') {
          const data = {
            userId,
            caption
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
          const response = await fetch('http://localhost:5001/posts', options);
          const jsonResponse = await response.json();
          console.log(jsonResponse.status)
          vm.createPostResponse = jsonResponse
          this.fetchPosts()
        }
      },
      deletePost: async function () {
        const postId = event.target.parentNode.id;
        const token = JSON.parse(sessionStorage.getItem('jwt'))

        const data = {
          postId
        }

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
        this.fetchPosts()
      },
      modifyPost: async function () {
        const caption = prompt('Modify the caption')
        const comment = prompt('Modify the comments')
        const postId = event.target.parentNode.id;
        const token = JSON.parse(sessionStorage.getItem('jwt'))

        const data = {
          postId,
          caption,
          comment
        }

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
        this.fetchPosts()
      }
    }
  })