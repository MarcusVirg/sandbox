import axios from 'axios'

const KEY = 'AIzaSyCqqvG-3FonnPX3gGkPYPQFjDrtpCVqcHs'

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})