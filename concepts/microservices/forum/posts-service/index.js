const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const { randomBytes } = require('crypto')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body
  posts[id] = { id, title }

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'POST_CREATED',
    data: posts[id]
  })

  res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
  const event = req.body
  console.log('\nRecieved:', event.type)
  res.status(200)
})

app.listen(4000, () => {
  console.log('v1.2')
  console.log('Listening on 4000')
})
