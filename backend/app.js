const express = require('express');
const app = express();

const PORT = process.env.PORT || 5001;

//Start server listening
app.listen(PORT, () => console.log(`server started on ${PORT}`))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
//below line is ESSENTIAL to serve static images (ie, instead of just text)
app.use("/uploads", express.static(__dirname + '/uploads'));
app.use(express.json())

const router = require('./routes/users')
const postsRouter = require('./routes/posts')
const commentsRouter = require('./routes/comments')

app.use(router)
app.use(postsRouter)
app.use(commentsRouter)