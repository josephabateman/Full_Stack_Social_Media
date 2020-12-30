const express = require('express')
const router = express.Router()
const { Pool } = require('pg')
// const authenticateToken = require('../middleware/auth');
// const multer = require('../middleware/multer-config');
const validator = require("email-validator");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const randomstring = require("randomstring");

//replace all below names with env variables
const databaseName = "postgres"
const pool = new Pool({
    user: "postgres",
    password: "password",
    host: "Josephs-MacBook-Pro.local",
    port: 1003,
    database: databaseName
})

router.post('/signup', (req, res) => {
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

module.exports = router