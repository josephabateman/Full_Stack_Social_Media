const express = require('express');
const app = express();
const { Pool } = require('pg')

const validator = require("email-validator");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const fs = require('fs');
const path = require('path');
const randomstring = require("randomstring");

const controllers = require('./controllers/posts')

const authenticateToken = require('./middleware/auth');
const multer = require('./middleware/multer-config');

const PORT = process.env.PORT || 5001;

//Start server listening
app.listen(PORT, () => console.log(`server started on ${PORT}`))

    //replace all below names with env variables
    const databaseName = "postgres"
    const pool = new Pool({
        user: "postgres",
        password: "password",
        host: "Josephs-MacBook-Pro.local",
        port: 1003,
        database: databaseName
    })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
//below line is ESSENTIAL to serve static images (ie, instead of just text)
app.use("/uploads", express.static(__dirname + '/uploads'));
app.use(express.json())

app.post('/signup', (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const postIdRandStr = randomstring.generate(20)
        const validEmail = validator.validate(email);

        if (email === '' || password === '') {
                throw 'fields can not be empty'
            } else if (!validEmail) {
            throw 'please enter a valid email'
        }
        function storeUser() {
            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    console.log(err)
                } else {
                    try {
                        const client = await pool.connect()
                        await client.query(`INSERT INTO users (user_email, password, user_id) VALUES ('${email}', '${hash}', '${postIdRandStr}');`)
                        client.release()
                        console.log('signed up')
                        res.status(200).json({
                            message: 'email and password stored successfully'
                        })
                        await pool.end()
                    } catch (error) {
                        console.log(`Error when adding user to database: '${error.detail}' - Full error: ${error}`)
                        res.status(409).json({
                            error: 'User already exists'
                        })
                    }

                }
            });
        }
        storeUser()
    } catch (error) {
        res.json({error: error})
        return [];
    }
})

app.post('/login', (req, res) => {
    try {
        async function login() {
            const client = await pool.connect()
            const databaseQuery = await client.query(`SELECT * FROM users WHERE user_email = '${req.body.email}'`)
            client.release()
            if (databaseQuery.rowCount !== 1) {
                console.log('no user found in database')
                res.status(401).json({
                    error: 'User does not exist'
                })
            }

            const databaseUserId = databaseQuery.rows[0].user_id
            const databasePassword = databaseQuery.rows[0].password

            bcrypt.compare(req.body.password, databasePassword).then(function (passesValidation) {
                if (passesValidation) {
                    const accessToken = jwt.sign({
                            userId: databaseUserId
                        },
                        process.env.ACCESS_TOKEN_SECRET, {
                            expiresIn: '24h'
                        });
                    res.status(200).json({
                        token: accessToken,
                        userId: databaseUserId
                    })
                } else {
                    res.status(403).json({
                        error: 'Password incorrect'
                    })
                }
            });
        }
        login()
    } catch (error) {
        console.log(error)
        return [];
    }
})

app.get('/', (req, res) => {
    try {
        async function displayPosts() {
            const client = await pool.connect()
            const databaseQuery = await client.query("SELECT * FROM posts");
            client.release()
            res.send(databaseQuery.rows)
        }
        displayPosts();
    } catch (error) {
        res.status(404).json('could not GET items!')
        return [];
    }
});

app.post('/posts', authenticateToken, (req, res) => {
    multer(req, res, function (err) {
        if (err) {
            res.status(404).json({error: req.fileValidationError})
            return
        }
        async function storePostInDatabase() {
            try {
                const imageUrl = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename
                const postIdRandStr = randomstring.generate(16);

                const client = await pool.connect()
                const databaseQuery = await client.query(`INSERT INTO posts (caption, user_id, file_upload, post_id) VALUES ('${req.body.caption}', '${req.body.userId}', '${imageUrl}', '${postIdRandStr}') RETURNING post_id;`)
                client.release()

                const postId = databaseQuery.rows[0].post_id
                res.json({
                    postId: postId,
                    status: 'post submitted sucessfully'
                })
            } catch (error) {
                console.log(error)
                res.status(404).json({error: 'did you fill out all fields and upload a gif?'})
            }
        }
        storePostInDatabase()
    })

})

app.put('/posts', authenticateToken, (req, res) => {
    multer(req, res, function (err) {
        if (err) {
            res.status(404).json({error: req.fileValidationError})
            return
        }
        async function modifyPost() {
            try {
                const decodedUserId = res.locals.testing
                const imageUrl = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename
                const client = await pool.connect()
                const result = await pool.query(`SELECT user_id FROM posts WHERE post_id = '${req.body.postId}'`)
                const databaseId = result.rows[0].user_id
                // console.log(databaseId)
                // console.log(req.body)

                //database variable needs to be declared to compare decodedId
                if (databaseId === decodedUserId) {
                    await client.query(`UPDATE posts SET caption = '${req.body.caption}', file_upload = '${imageUrl}' WHERE post_id = '${req.body.postId}';`)
                    client.release()
                    res.json({
                        status: 'post modified sucessfully'
                    })
                } else {
                    res.status(403).json({
                        error: error
                    })
                }
            } catch (error) {
                console.log(error)
                res.status(404).json({error: 'Are all fields filled out and image uploaded?'})
            }
        }
        modifyPost()
    })
})


//put and delete share most of the same code - refactor as a function
app.delete('/posts', authenticateToken, (req, res) => {
    async function deletePost() {
        try {
            const decodedUserId = res.locals.testing
            const client = await pool.connect()
            const result = await client.query(`SELECT * FROM posts WHERE post_id = '${req.body.postId}'`)
            const databaseId = result.rows[0].user_id
            const databaseUpload = result.rows[0].file_upload
            const filename = databaseUpload.split('/uploads/')[1]
            //database variable is declared at top of page and passed globally
            if (databaseId === decodedUserId) {
                const postId = req.body.postId
                await client.query(`DELETE FROM posts WHERE post_id = '${postId}';`)
                client.release()
                fs.unlink('uploads/' + filename, (err) => {
                    if (err) throw err;
                });
                res.json({
                    message: 'post deleted successfully'
                })
            } else {
                res.status(403).json({
                    error: 'You are not authorised to delete this post'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    deletePost()
})