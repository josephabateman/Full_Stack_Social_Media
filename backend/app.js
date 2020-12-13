const express = require('express');
const app = express();
const {Pool} = require('pg')
const PORT = process.env.PORT || 5001;

//Start server listening
app.listen(PORT, () => console.log(`server started on ${PORT}`))

//replace all below names in env variables
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
    }
    catch(e) {
        console.error(`failed to connect ${e}`)
    }
}
connect()

//database functions - make modular
async function displayPosts() {
    try {
        const results = await pool.query("SELECT * FROM posts");
        return results.rows
    }
    catch(error) {
        return [];
    }
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.use(express.json())

app.get('/posts', async (req, res) => {
    const rows = await displayPosts();
    res.send(rows)
});

app.post('/submitPost', (req, res) => {
    console.log(req.body.caption)
    const caption = req.body.caption

    async function storePostInDatabase() {
        try {
            const addValuesToDatabase = await pool.query(`INSERT INTO posts (caption, comments) VALUES ('${caption}', 'up')`)
            return addValuesToDatabase.rows
        } 
        catch(error) {
            return [];
        }
    }
    storePostInDatabase()

    res.json({
        status: 'post submitted sucessfully'
    })
})