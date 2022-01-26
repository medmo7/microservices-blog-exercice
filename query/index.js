const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {

    if (type === 'PostCreated') {
        const { id, title } = data
        posts[id] = {
            id,
            title,
            comments: []
        }
    }

    if (type === 'CommentCreated') {
        const { postId, id, content, status } = data;
        posts[postId].comments.push(
            {
                id,
                content,
                status,
            }
        )
    }

    if (type === 'CommentUpdated') {
        const { postId, id, content, status } = data;


        const comment = posts[postId].comments.find(cmmt => cmmt.id === id);
        comment.status = status;
        comment.content = content;

    }
}

app.get('/posts', (req, res) => {
    res.send(posts)
});

app.post('/events', (req, res) => {
    const { type, data } = req.body

    handleEvents(type, data);

    res.send({})


})



app.listen(4002, async () => {
    console.log('Query service listening on 4002')

    try {
        const res = await axios.get('http://event-bus-srv:4005/events');

        for (let event of res.data) {
            console.log('Processing event:', event.type);

            handleEvents(event.type, event.data)
        }
    } catch (err) {
        console.log('err in query service', err)
    }
})