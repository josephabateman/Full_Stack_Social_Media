const express = require('express')
const router = express.Router()
const { Pool } = require('pg')
const authenticateToken = require('../middleware/auth');
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

router.post('/addComment', authenticateToken, (req, res) => {
    async function addComment() {
        try {
            const decodedUserId = res.locals.testing
            const commentIdRandStr = randomstring.generate(16)
            // console.log(req.body.post_Id)

            const object = {
                commentId: commentIdRandStr,
                userId: decodedUserId,
                comment: req.body.comment,
                postId: req.body.post_Id
            }
            const objectAsString = JSON.stringify(object)

            const client = await pool.connect()
            await client.query(`UPDATE posts SET testarray = array_append(testarray, '${objectAsString}') WHERE post_id = '${req.body.post_Id}';`)
            const databaseQuery = await client.query(`SELECT * FROM posts WHERE post_id = '${req.body.post_Id}';`)
            client.release()
            // console.log(databaseQuery.rows)

            // const postId = databaseQuery.rows[0].post_id
            res.json({
                // postId: postId,
                status: 'comment added sucessfully'
            })
        } catch (error) {
            console.log(error)
            res.status(404).json({error: 'did you fill out all fields and upload a gif?'})
        }
    }
    addComment()
})

router.delete('/deleteComment', authenticateToken, (req, res) => {
    async function deleteComment() {
        try {
            //security implementation
            const decodedUserId = res.locals.testing

            const commentToDelete = {
                commentId: req.body.commentId,
                userId: req.body.userId,
                comment: req.body.comment,
                postId: req.body.postId
            }

            // console.log(commentToDelete)

            const commentToDeleteString = JSON.stringify(commentToDelete)
            // console.log(commentToDeleteString)

            const client = await pool.connect()
            await client.query(`UPDATE posts SET testarray = array_remove(testarray, '${commentToDeleteString}');`)
            client.release()

            res.json({
                message: 'comment deleted sucessfully'
            })
        } catch (error) {
            console.log(error)
            res.status(404).json({error: 'did you fill out all fields and upload a gif?'})
        }
    }
    deleteComment()
})

module.exports = router