import { combineReducers } from 'redux'

const songsReducer = () => {
    return [
        {
            title: 'Leaving Earth 2',
            duration: '3:13'
        },
        {
            title: 'Nothings into Somethings',
            duration: '2:15'
        },
        {
            title: 'Wobble Master',
            duration: '5:30'
        },
        {
            title: 'One Dance',
            duration: '3:45'
        }
    ]
}

const selectedSongReducer = (selectedSong = null, action) => {
    return action.type === 'SONG_SELECTED' ? action.payload : selectedSong
}

export default combineReducers({
    songs: songsReducer,
    selectedSong: selectedSongReducer
})