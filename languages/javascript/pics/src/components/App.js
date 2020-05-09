import React, { Component } from 'react'
import api from '../api'
import SearchBar from './SearchBar'
import ImageList from './ImageList'

class App extends Component {
    state = { images: [] }

    onSearchSubmit = async query => {
        const response = await api.get('/search/photos', {
            params: { query }
        })

        this.setState({
            images: response.data.results
        })
    }

    render() {
       return (
            <div className="ui container" style={{marginTop: '25px'}}>
                <SearchBar onSubmit={this.onSearchSubmit} />
                <ImageList images={this.state.images}/>
            </div>
        ) 
    }
}

export default App