import React, { Component } from 'react'
import './Button.scss'

class Button extends Component {
    
    handleClick = () => {
        console.log('Clicked')
    }
    
    render() {
        return (
            <button
            className={`btn-${this.props.type}`}
            onClick={this.handleClick}
            >{this.props.text}</button>
        )
    }
}

export default Button