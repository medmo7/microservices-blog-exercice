const express = require('express')
const  bodyParser = require('body-parser')
const {randomBytes} = require('crypto')

const app = express();
app.use(bodyParser.json())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req,res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', (req,res) => {
    const postId = req.params.id;
    const postComment = commentsByPostId[postId] ? [...commentsByPostId[postId]] : [];

    const newComment = {
        id: randomBytes(4).toString('hex'),
        content: req.body.content
    }

    postComment.push(newComment)

    commentsByPostId[postId] = postComment

    console.log(commentsByPostId)
    res.status(201).send(postComment)
})

app.listen(4001,() => {
    console.log('Comments service listening on 4001')
})