const express = require('express')
const router = express.Router()
const validator = require("email-validator");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fs = require('fs');
const path = require('path');
require('dotenv').config()
const randomstring = require("randomstring");
const authenticateToken = require('../middleware/auth');
const pool = require('../functions/db-connect')

router.post('/signup', (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const firstName = req.body.firstName
        const lastName = req.body.lastName

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
                        await client.query(`INSERT INTO users (user_email, password, user_id, first_name, last_name) VALUES ('${email}', '${hash}', '${postIdRandStr}', '${firstName}', '${lastName}');`)
                        client.release()
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

router.post('/login', (req, res) => {
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
            const databaseFirstName = databaseQuery.rows[0].first_name
            const databaseLastName = databaseQuery.rows[0].last_name

            bcrypt.compare(req.body.password, databasePassword).then(function (passesValidation) {
                if (passesValidation) {
                    const accessToken = jwt.sign({
                        // remove the userid
                            userId: databaseUserId,
                            firstName: databaseFirstName,
                            lastName: databaseLastName
                        },
                        process.env.ACCESS_TOKEN_SECRET, {
                            expiresIn: '24h'
                        });
                    res.status(200).json({
                        token: accessToken,
                        userId: databaseUserId,
                        // databaseFirstName: databaseFirstName,
                        // databaseLastName: databaseLastName
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

router.put('/userDetails', authenticateToken, (req, res) => {
        async function updateUserDetails() {
            try {
                console.log(req.body)
                const decodedUserId = res.locals.userId
                const client = await pool.connect()
                const databaseQuery = await client.query(`SELECT * FROM users WHERE user_id = '${decodedUserId}'`)
                client.release()

                const databaseUserId = databaseQuery.rows[0].user_id
                const databasePassword = databaseQuery.rows[0].password

                //database variable needs to be declared to compare decodedId
                if (databaseUserId === decodedUserId) {
                    bcrypt.compare(req.body.password, databasePassword).then(function (passesValidation) {
                        if (passesValidation) {                         
                            bcrypt.hash(req.body.newPassword, 10, async function(err, hash) {
                                const client = await pool.connect()
                                await client.query(`UPDATE users SET password = '${hash}', first_name = '${req.body.firstName}', last_name = '${req.body.lastName}' WHERE user_id = '${decodedUserId}';`)               
                                client.release()
                                res.json({
                                    message: 'user details updated successfully'
                                })
                            });
                            } else {
                                res.status(403).json({
                                    error: 'Password incorrect'
                                })
                            }
                        })
                  
                } else {
                    res.status(403).json({
                        error: 'id does not match the administrator'
                    })
                }
            } catch (error) {
                console.log(error)
                res.status(404).json({error: 'Something went wrong'})
            }
        }
        updateUserDetails()
})

router.delete('/deleteUser', authenticateToken, (req, res) => {
    async function deleteUser() {
        try {
            const decodedUserId = res.locals.userId
            const client = await pool.connect()
            const databaseQuery = await client.query(`SELECT * FROM users WHERE user_id = '${decodedUserId}'`)
            client.release()

            const databaseUserId = databaseQuery.rows[0].user_id
            const databasePassword = databaseQuery.rows[0].password

            if (databaseUserId === decodedUserId) {
                bcrypt.compare(req.body.password, databasePassword).then(async function (passesValidation) {
                    if (passesValidation) {
                        const client = await pool.connect()
                        //use a join instead of three queries!
                        const databaseQuery = await client.query(`SELECT file_upload FROM posts WHERE user_id = '${decodedUserId}';`)
                        await client.query(`DELETE FROM posts WHERE user_id = '${decodedUserId}';`)
                        await client.query(`DELETE FROM users WHERE user_id = '${decodedUserId}'`)
                        client.release()
                        res.json({
                            message: 'user account deleted successfully'
                        })

                        //this gets all the filenames from database and splits off the filename, pushing to array for deletion
                        let fileUploadsArray = []
                        databaseQuery.rows.forEach(row => fileUploadsArray.push(row.file_upload.split('/uploads/')[1]))

                        fs.readdir('uploads/', (err, files) => {
                            if (err) throw err;
                            for (const file of files) {
                                //list array matches here
                                if(fileUploadsArray.includes(file)) {
                                    fs.unlink(path.join('uploads/', file), err => {
                                        if (err) throw err;
                                    });
                                }
                            }
                        });
                    } else {
                        res.status(403).json({
                            error: 'Password incorrect'
                        })
                    }
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
    deleteUser()
})

module.exports = router