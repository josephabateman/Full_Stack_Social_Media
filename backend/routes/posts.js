const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const multer = require("../middleware/multer-config");
require("dotenv").config();
const fs = require("fs");
const randomstring = require("randomstring");
const pool = require("../functions/db-connect");
const timeElapsed = require("../functions/time-calc");

router.get("/", authenticateToken, (req, res) => {
  try {
    async function displayPosts() {
      const client = await pool.connect();
      const databaseQuery = await client.query(
        "SELECT * FROM posts ORDER BY time_stamp DESC"
      );
      client.release();
      const sendArray = [];

      for (post of databaseQuery.rows) {
        //here is where i convert milliseconds to time elapsed since posted
        const timeStamp = post.time_stamp;
        let measurement = timeElapsed(timeStamp);

        if (post.public_comments !== null) {
          post.public_comments.forEach(function (comment, i) {
            if (typeof comment == "string")
              post.public_comments[i] = JSON.parse(comment);
          });
        }

        // i send the get object here
        const getObject = {
          caption: post.caption,
          file_upload: post.file_upload,
          user_id: post.user_id,
          post_id: post.post_id,
          users_read: post.users_read,
          time_stamp: post.time_stamp,
          comments: post.public_comments,
          convertedTime: measurement,
        };
        sendArray.push(getObject);
      }
      res.send(sendArray);
    }
    displayPosts();
  } catch (error) {
    res.status(404).json("could not GET items!");
    return [];
  }
});

router.get("/:id", authenticateToken, (req, res) => {
  try {
    async function fetchOne() {
      const decodedUserId = res.locals.userId;
      const client = await pool.connect();
      let databaseQuery;
      if (req.params.id === "userId") {
        databaseQuery = await pool.query(
          `SELECT * FROM posts WHERE user_id = '${decodedUserId}' ORDER BY time_stamp DESC`
        );
      } else {
        databaseQuery = await client.query(
          `SELECT * FROM posts WHERE post_id = '${req.params.id}' ORDER BY time_stamp DESC LIMIT 1;`
        );
      }
      client.release();
      const sendArray = [];

      for (post of databaseQuery.rows) {
        const timeStamp = post.time_stamp;
        let measurement = timeElapsed(timeStamp);

        if (post.public_comments !== null) {
          post.public_comments.forEach(function (comment, i) {
            if (typeof comment == "string")
              post.public_comments[i] = JSON.parse(comment);
          });
        }

        // i send the get object here
        const getObject = {
          caption: post.caption,
          file_upload: post.file_upload,
          user_id: post.user_id,
          post_id: post.post_id,
          users_read: post.users_read,
          time_stamp: post.time_stamp,
          comments: post.public_comments,
          convertedTime: measurement,
        };
        sendArray.push(getObject);
      }

      res.send(sendArray);
    }
    fetchOne();
  } catch (error) {
    res.status(404).json("could not GET one item!");
    return [];
  }
});

router.post("/posts", authenticateToken, (req, res) => {
  multer(req, res, function (err) {
    if (err) {
      res.status(404).json({ error: req.fileValidationError });
      return;
    }
    async function storePostInDatabase() {
      try {
        const decodedUserId = res.locals.userId;
        const imageUrl =
          req.protocol +
          "://" +
          req.get("host") +
          "/uploads/" +
          req.file.filename;
        const postIdRandStr = randomstring.generate(16);
        const timestamp = new Date();
        const timestampMilliseconds = timestamp.getTime();

        const client = await pool.connect();
        const databaseQuery = await client.query(
          `INSERT INTO posts (caption, user_id, file_upload, post_id, time_stamp, users_read, public_comments) VALUES ('${req.body.caption}', '${req.body.userId}', '${imageUrl}', '${postIdRandStr}', '${timestampMilliseconds}', '{${decodedUserId}}', '{}') RETURNING post_id;`
        );
        client.release();

        const postId = databaseQuery.rows[0].post_id;
        res.json({
          postId: postId,
          status: "post submitted sucessfully",
        });
      } catch (error) {
        console.log(error);
        res
          .status(404)
          .json({ error: "did you fill out all fields and upload a gif?" });
      }
    }
    storePostInDatabase();
  });
});

router.put("/posts", authenticateToken, (req, res) => {
  multer(req, res, function (err) {
    if (err) {
      res.status(404).json({ error: req.fileValidationError });
      return;
    }
    async function modifyPost() {
      try {
        const decodedUserId = res.locals.userId;
        const imageUrl =
          req.protocol +
          "://" +
          req.get("host") +
          "/uploads/" +
          req.file.filename;
        const client = await pool.connect();
        const result = await pool.query(
          `SELECT * FROM posts WHERE post_id = '${req.body.postId}'`
        );
        const databaseUpload = result.rows[0].file_upload;
        const filename = databaseUpload.split("/uploads/")[1];
        const databaseId = result.rows[0].user_id;

        if (databaseId === decodedUserId) {
          await client.query(
            `UPDATE posts SET caption = '${req.body.caption}', file_upload = '${imageUrl}' WHERE post_id = '${req.body.postId}';`
          );
          client.release();
          fs.unlink("uploads/" + filename, (err) => {
            if (err) throw err;
          });
          res.json({
            status: "post modified sucessfully",
          });
        } else {
          res.status(403).json({
            error: "id does not match the administrator",
          });
        }
      } catch (error) {
        console.log(error);
        res
          .status(404)
          .json({ error: "Are all fields filled out and image uploaded?" });
      }
    }
    modifyPost();
  });
});

router.put("/posts/markAllAsRead", authenticateToken, (req, res) => {
  async function markAllAsRead() {
    try {
      //this is stupid code since databaseId will always === decodedUserId - make secure
      const decodedUserId = res.locals.userId;
      const client = await pool.connect();
      const result = await pool.query(
        `SELECT user_id FROM users WHERE user_id = '${decodedUserId}'`
      );
      console.log(result.rows);
      const databaseId = result.rows[0].user_id;

      if (databaseId === decodedUserId) {
        await client.query(
          `UPDATE posts SET users_read = array_append(users_read,'${decodedUserId}') WHERE NOT ('${decodedUserId}' = ANY (users_read));`
        );
        client.release();
        res.json({
          status: "added userId to all posts. Marked all as read",
        });
      } else {
        res.status(403).json({
          error: error,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: error });
    }
  }
  markAllAsRead();
});

router.delete("/posts", authenticateToken, (req, res) => {
  async function deletePost() {
    try {
      const decodedUserId = res.locals.userId;
      const client = await pool.connect();
      const result = await client.query(
        `SELECT * FROM posts WHERE post_id = '${req.body.postId}'`
      );
      const databaseId = result.rows[0].user_id;
      const databaseUpload = result.rows[0].file_upload;
      const filename = databaseUpload.split("/uploads/")[1];
      if (databaseId === decodedUserId) {
        const postId = req.body.postId;
        await client.query(`DELETE FROM posts WHERE post_id = '${postId}';`);
        client.release();
        fs.unlink("uploads/" + filename, (err) => {
          if (err) throw err;
        });
        res.json({
          message: "post deleted successfully",
        });
      } else {
        res.status(403).json({
          error: "You are not authorised to delete this post",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  deletePost();
});

module.exports = router;
