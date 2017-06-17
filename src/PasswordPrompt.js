import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PasswordPrompt extends Component {
  constructor (props) {
    super(props)

    this.state = {
      password: ''
    }

    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handlePasswordChange (e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state.password)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        Password:
        <input type='password' onChange={this.handlePasswordChange} />
        <button onClick={this.handleSubmit} />
      </form>
    )
  }
}

PasswordPrompt.PropTypes = {
  onSubmit: PropTypes.func.isRequired,
  wrongPassword: PropTypes.bool
}

export default PasswordPrompt
