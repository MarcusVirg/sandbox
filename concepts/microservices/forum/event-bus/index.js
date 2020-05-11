const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

const events = []

app.post('/events', (req, res) => {
  const event = req.body

  axios.post('http://posts-service-cip-srv:4000/events', event)
  axios.post('http://comments-service-srv:4001/events', event)
  axios.post('http://query-service-srv:4002/events', event)
  axios.post('http://moderation-service-srv:4003/events', event)

  events.push(event)
  console.log('\nNew Event:', event.type)
  console.log(event.data)
  res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(4005, () => {
  console.log('Listening on 4005')
})
