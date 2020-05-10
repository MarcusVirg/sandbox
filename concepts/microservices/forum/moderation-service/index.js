const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

const moderateContent = content => {
  return content.includes('orange') ? 'rejected' : 'approved'
}

app.post('/events', async (req, res) => {
  const { type, data } = req.body
  switch (type) {
    case 'COMMENT_CREATED':
      await axios.post('http://localhost:4005/events', {
        type: 'COMMENT_MODERATED',
        data: {
          ...data,
          status: moderateContent(data.content)
        }
      })
      break
    default:
  }

  res.status(200)
})

app.listen(4003, () => {
  console.log('Listening on 4003')
})
