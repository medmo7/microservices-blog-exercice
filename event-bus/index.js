const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios');

const app = express();
app.use(bodyParser.json())

const events = [];



app.post('/events',(req, res) => {
    const event = req.body
    
    events.push(event);

    axios.post('http://posts-clusterip-srv:4000/events', event).catch(error => console.log('error in event bus 1', error))
    axios.post('http://comments-srv:4001/events', event).catch(error => console.log('error in event bus 2', error))
    axios.post('http://query-srv:4002/events', event).catch(error => console.log('error in event bus 3', error))
    axios.post('http://moderation-srv:4003/events', event).catch(error => console.log('error in event bus 4', error))

    res.send({ status: 'OK'});
})

app.get('/events', (req, res) =>{
    res.send(events)
})

app.listen(4005, () => {
    console.log('Event bus listening on 4005')
})