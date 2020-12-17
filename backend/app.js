const express = require('express');
const app = express();
const {
    Pool
} = require('pg')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

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

//connect to DB
async function connect() {
    try {
        await pool.connect();
        console.log(`connected to ${databaseName} database`)
    } catch (e) {
        console.error(`failed to connect ${e}`)
    }
}
connect()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json())

app.post('/signup', (req, res) => {
    try {
        async function storeUser() {
            const email = req.body.email
            const password = req.body.password

            bcrypt.hash(password, 10, function (err, hash) {
                if (err) {
                    console.log(err)
                } else {
                    pool.query(`INSERT INTO users (user_email, password) VALUES ('${email}', '${hash}');`)
                }
            });
            res.json({
                status: 'email and password stored sucessfully'
            })
        }
        storeUser()
    } catch (error) {
        return [];
    }
})

app.post('/login', (req, res) => {
    try {
        async function login() {

            const databaseQuery = await pool.query(`SELECT * FROM users WHERE user_email = '${req.body.email}'`)
            const databaseEmail = databaseQuery.rows[0].user_email
            const databasePassword = databaseQuery.rows[0].password

            bcrypt.compare(req.body.password, databasePassword).then(function (passesValidation) {
                // console.log(result)
                if (passesValidation) {
                    const accessToken = jwt.sign({
                            userId: databaseEmail
                        },
                        process.env.ACCESS_TOKEN_SECRET, {
                            expiresIn: '24h'
                        });
                    res.status(200).json({
                        token: accessToken,
                        userId: req.body.email
                    })
                } else {
                    res.status(403).json('Password incorrect')
                }
            });
        }
        login()
    } catch (error) {
        res.status(404).json('user email does not exist!')
        return [];
    }
})

app.get('/', (req, res) => {
    try {
        async function displayPosts() {
            const databaseQuery = await pool.query("SELECT * FROM posts");
            res.send(databaseQuery.rows)
        }
        displayPosts();
    } catch (error) {
        return [];
    }
});

app.post('/posts', authenticateToken, (req, res) => {
    async function storePostInDatabase() {
        try {
            const caption = req.body.caption
            const databaseQuery = await pool.query(`INSERT INTO posts (caption, user_email) VALUES ('${caption}', '${req.body.userId}') RETURNING id;`)
            const postId = databaseQuery.rows[0].id
            res.json({
                postId: postId,
                status: 'post submitted sucessfully'
            })
        } catch (error) {
            return [];
        }
    }
    storePostInDatabase()
})

app.put('/posts', authenticateToken, (req, res) => {
    async function modifyPost() {
        try {
            await pool.query(`UPDATE posts SET caption = '${req.body.caption}', comments = '${req.body.comment}' WHERE id = ${req.body.postId};`)
            res.json({
                status: 'post modified sucessfully'
            })
        } catch (error) {
            return [];
        }
    }
    modifyPost()
})

app.delete('/posts', authenticateToken, (req, res) => {
    async function deletePost() {
        try {
            const postId = req.body.postId
            await pool.query(`DELETE FROM posts WHERE id = ${postId};`)
            res.json({
                status: 'post deleted sucessfully'
            })
        } catch (error) {
            return [];
        }
    }
    deletePost()
})

async function authenticateToken(req, res, next) {
    try {
        console.log(req.method)
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const decodedTokenUserId = decodedToken.userId;
        console.log(`decoded token: ${decodedTokenUserId}`)

        if (req.method === 'POST' && decodedToken) {
            next()
        } else {
            const query = `select user_email from posts WHERE id = '${req.body.postId}'`
            const databaseQuery = await pool.query(query);
            const databaseUser_email = databaseQuery.rows[0].user_email
            console.log(`database email: ${databaseUser_email}`)

            const emailsMatch = databaseUser_email === decodedTokenUserId;
            if (req.method === 'PUT' && emailsMatch || req.method === 'DELETE' && emailsMatch) {
                next();
            } else {
                throw 'Invalid user ID';
            }
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}