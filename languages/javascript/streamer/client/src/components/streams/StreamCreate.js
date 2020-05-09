import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStream } from '../../actions'

import StreamForm from './StreamForm'

class StreamCreate extends Component {
  onSubmit = formValues => {
    // with redux form, they call e.preventDefault() for us and then pass
    // the form values as an object to our function... really handy!
    this.props.createStream(formValues)
  }

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default connect(
  null,
  { createStream }
)(StreamCreate)
