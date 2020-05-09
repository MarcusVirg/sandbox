import React, { Component } from 'react'
import './Title.scss'

import Button from '../Button/Button'

class Title extends Component {
	render() {
		return (
			<header className="ed-title">
				<h1>Welcome to Elf Dig!</h1>
				<Button type="primary" text="Play" />
			</header>
		)
	}
}

export default Title