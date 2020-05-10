const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body
  switch (type) {
    case 'POST_CREATED':
      posts[data.id] = {
        id: data.id,
        title: data.title,
        comments: []
      }
      break
    case 'COMMENT_CREATED':
      posts[data.postId].comments.push({
        id: data.id,
        content: data.content,
        status: data.status
      })
      break
    case 'COMMENT_UPDATED':
      let updatedComment = posts[data.postId].comments.find(
        c => c.id === data.id
      )
      updatedComment.status = data.status
      updatedComment.content = data.content
      break
    default:
  }
  console.log(posts)
  res.status(200)
})

app.listen(4002, () => {
  console.log('Listening on 4002')
})
