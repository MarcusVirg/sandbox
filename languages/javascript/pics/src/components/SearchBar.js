import React, { Component } from 'react'

class SearchBar extends Component {
    state = {
        query: ''
    }

    onFormSubmit = e => {
        e.preventDefault() // keeps the form from submitting automatically
        this.props.onSubmit(this.state.query)
    }

    render() {
        return (
            <div className="ui segment">
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="field">
                        <label>Image Search</label>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={this.state.query}
                            onChange={e => this.setState({ query: e.target.value })}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBar