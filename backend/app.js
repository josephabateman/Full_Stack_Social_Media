const express = require('express');
const app = express();
const {
    Pool
} = require('pg')
const validator = require("email-validator");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const multer = require('multer')
const fs = require('fs');
const path = require('path');
const randomstring = require("randomstring");
// const upload = multer({ dest: 'uploads/' }) 

//maybe an env variable for passing the decoded token from function to requests
let decodedEmail

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
//below line is ESSENTIAL to serve static images (ie, instead of just text)
app.use("/uploads", express.static(__dirname + '/uploads'));
app.use(express.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
})

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
                        await pool.query(`INSERT INTO users (user_email, password, user_id) VALUES ('${email}', '${hash}', '${postIdRandStr}');`)
                        res.status(200).json({
                            message: 'email and password stored successfully'
                        })
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
            const databaseQuery = await pool.query(`SELECT * FROM users WHERE user_email = '${req.body.email}'`)

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

app.get('/', authenticateToken, (req, res) => {
    try {
        async function displayPosts() {
            const databaseQuery = await pool.query("SELECT * FROM posts");
            res.send(databaseQuery.rows)
        }
        displayPosts();
    } catch (error) {
        res.status(404).json('could not GET items!')
        return [];
    }
});

app.post('/posts', authenticateToken, upload.single('myFile'), (req, res) => {
    async function storePostInDatabase() {
        try {
            const imageUrl = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename
            const postIdRandStr = randomstring.generate(16);
            const databaseQuery = await pool.query(`INSERT INTO posts (caption, user_email, file_upload, post_id) VALUES ('${req.body.caption}', '${req.body.userId}', '${imageUrl}', '${postIdRandStr}') RETURNING post_id;`)
            const postId = databaseQuery.rows[0].post_id
            res.json({
                postId: postId,
                status: 'post submitted sucessfully'
            })
        } catch (error) {
            console.log(error)
            res.status(404).json({error: 'Are all fields filled out and image uploaded?'})
        }
    }
    storePostInDatabase()
})

app.put('/posts', authenticateToken, upload.single('myFile'), (req, res) => {
    async function modifyPost() {
        try {
            const imageUrl = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename
            const result = await pool.query(`SELECT user_email FROM posts WHERE post_id = '${req.body.postId}'`)
            const databseEmail = result.rows[0].user_email
            //database variable is declared at top of page and passed globally
            if (decodedEmail.userId === databseEmail) {
                await pool.query(`UPDATE posts SET caption = '${req.body.caption}', file_upload = '${imageUrl}' WHERE post_id = '${req.body.postId}';`)
                res.json({
                    status: 'post modified sucessfully'
                })
            } else {
                res.status(403).json({
                    error: 'You are not authorised to make changes to this post'
                })
            }
        } catch (error) {
            console.log(error)
            res.status(404).json({error: 'Are all fields filled out and image uploaded?'})
        }
    }
    modifyPost()
})


//put and delete share most of the same code - refactor as a function
app.delete('/posts', authenticateToken, (req, res) => {
    async function deletePost() {
        try {
            const result = await pool.query(`SELECT * FROM posts WHERE post_id = '${req.body.postId}'`)
            const databaseEmail = result.rows[0].user_email
            const databaseUpload = result.rows[0].file_upload
            const filename = databaseUpload.split('/uploads/')[1]
            //database variable is declared at top of page and passed globally
            if (decodedEmail.userId === databaseEmail) {
                const postId = req.body.postId
                await pool.query(`DELETE FROM posts WHERE post_id = '${postId}';`)
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

//token authentication
async function authenticateToken(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (decodedToken) {
            decodedEmail = decodedToken
            next()
        } else {
            throw 'Invalid user ID';
        }
    } catch(error) {
        console.log(error)
        res.status(401).json({
            error: 'Are you trying to hack the system? We are very secure!'
        });
    }
}

//multer
// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png'
// };

// const storage = multer.diskStorage({
//     destination: 'backend/uploads',
//     filename: (req, file, callback) => {
//         const name = file.originalname.split(' ').join('_');
//         const extension = MIME_TYPES[file.mimetype];
//         callback(null, name + Date.now() + '.' + extension);
//     }
// });

// const upload = multer({
//     storage: storage
// }).single('myImage')