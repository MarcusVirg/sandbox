const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const { randomBytes } = require('crypto')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { content } = req.body
  const postId = req.params.id
  const comment = { id, postId, content, status: 'pending' }
  const comments = commentsByPostId[postId] || []
  comments.push(comment)
  commentsByPostId[postId] = comments

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'COMMENT_CREATED',
    data: comment
  })

  res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
  const { type, data } = req.body
  switch (type) {
    case 'COMMENT_MODERATED':
      let moderatedComment = commentsByPostId[data.postId].find(
        c => c.id === data.id
      )
      moderatedComment.status = data.status
      await axios.post('http://event-bus-srv:4005/events', {
        type: 'COMMENT_UPDATED',
        data: moderatedComment
      })
    default:
  }
  res.status(200)
})

app.listen(4001, () => {
  console.log('Listening on 4001')
})
