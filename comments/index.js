
const express = require('express') 
const  bodyParser = require('body-parser')
const {randomBytes} = require('crypto')
const cors = require('cors');
const axios = require('axios');

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
        content,
        status:'pending',
        postId
    }

    postComment.push(newComment)

    commentsByPostId[postId] = postComment

    await axios.post('http://event-bus-srv:4005/events',{
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId, 
            status:'pending'       
        }
    })

    res.status(201).send(postComment)
})

app.post('/events', async (req, res) =>{
    const {type, data} = req.body

    if (type === 'CommentModerated') {
       const {postId, id, content, status} = data;

       const comments = commentsByPostId[postId]
       const comment = comments.find((cmmt) => cmmt.id === id );

       comment.status = status;

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                postId,
                id,
                content,
                status
            } 
        }).catch(err => console.log('error in comments service event 1', err))
        
    }

    res.send({})
})

app.listen(4001,() => {
    console.log('Comments service listening on 4001')
})