import React, { Component } from 'react'

import LanguageContext from '../contexts/LanguageContext'
import UserCreate from './UserCreate'

export default class App extends Component {
  static contextType = LanguageContext

  state = { language: 'english' }

  onLanguageChange = language => {
    this.setState({ language })
  }

  render() {
    const text =
      this.context === 'deutsch' ? 'Wähle eine Sprache:' : 'Select a language:'
    return (
      <div className="ui container">
        <div>
          {text}
          <i
            className="flag us"
            onClick={() => this.onLanguageChange('english')}
          />
          <i
            className="flag de"
            onClick={() => this.onLanguageChange('deutsch')}
          />
        </div>
        <LanguageContext.Provider value={this.state.language}>
          <UserCreate />
        </LanguageContext.Provider>
      </div>
    )
  }
}
