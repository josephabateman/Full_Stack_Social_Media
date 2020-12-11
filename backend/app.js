const express = require('express');
const app = express();
const {Pool} = require('pg')

const PORT = process.env.PORT || 5001;

const pool = new Pool({
    user: "postgres",
    password: "password",
    host: "Josephs-MacBook-Pro.local",
    port: 1003,
    database: "postgres"
})

app.get('/', async (req, res) => {
    const rows = await displayDatabase();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
});

//Start server listening
app.listen(PORT, () => console.log(`server started on ${PORT}`))

start()

async function start() {
    await connect();
}

//connect to DB
async function connect() {
    try {
        await pool.connect();
    }
    catch(e) {
        console.error(`failed to connect ${e}`)
    }
}

// pool.connect()
// .then(() => console.log('connected successfully'))
// // .then(() => pool.query(
// //     "SELECT * FROM users"
// //     ))
// // .then(results => console.table(results.rows))
// .catch(e => console.log(e))
// .finally(() => pool.end())

//CRUD functions

async function displayDatabase() {
    try {
        const results = await pool.query("SELECT * FROM users");
        return results.rows
    }
    catch(error) {
        return [];
    }
}