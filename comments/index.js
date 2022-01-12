const express = require('express')
const  bodyParser = require('body-parser')
const {randomBytes} = require('crypto')
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
app.use(bodyParser.json())
app.use(cors())
const commentsByPostId = {}

app.get('/posts/:id/comments', (req,res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req,res) => {
    const postId = req.params.id;
    const postComment = commentsByPostId[postId] ? [...commentsByPostId[postId]] : [];
    const commentId =  randomBytes(4).toString('hex');
    const content = req.body.content;

    const newComment = {
        id: commentId,
        content
    }

    postComment.push(newComment)

    commentsByPostId[postId] = postComment

    await axios.post('http://localhost:4005/events',{
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId,        
        }
    })

    res.status(201).send(postComment)
})

app.post('/events', (req, res) =>{
    console.log('received event in comments: ', req.body.type)

    res.send({})
})

app.listen(4001,() => {
    console.log('Comments service listening on 4001')
})