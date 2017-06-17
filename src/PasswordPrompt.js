import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { containerStyle } from './App'

const padlockStyle = {
  height: 58,
  width: 'auto',
  marginBottom: 15,
  opacity: 0.3
}

const submitStyle = {
  width: '100%',
  height: 'auto'
}

const buttonContainerStyle = {
  width: 40,
  height: 40,
  margin: '15px auto',
  cursor: 'pointer'
}

const notHoveringStyle = {
  ...buttonContainerStyle,
  opacity: 0.8
}

const hoveringStyle = {
  ...buttonContainerStyle,
  opacity: 1
}

const wrongPasswordStyle = {
  borderBottomColor: 'red'
}

class PasswordPrompt extends Component {
  constructor (props) {
    super(props)

    this.state = {
      password: '',
      hoveringSubmit: false
    }

    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitMouseEnter = this.handleSubmitMouseEnter.bind(this)
    this.handleSubmitMouseLeave = this.handleSubmitMouseLeave.bind(this)
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

  handleSubmitMouseEnter () {
    this.setState({ hoveringSubmit: true })
  }

  handleSubmitMouseLeave () {
    this.setState({ hoveringSubmit: false })
  }

  render () {
    const { wrongPassword } = this.props

    return (
      <div style={containerStyle}>
        <img
          src='/padlock.svg'
          style={padlockStyle}
          alt='Please enter the password to watch this stream'
        />
        <form onSubmit={this.handleSubmit}>
          <input
            type='password'
            onChange={this.handlePasswordChange}
            style={wrongPassword && wrongPasswordStyle}
            autoComplete='off'
            autoFocus
          />
        </form>
        <div
          style={this.state.hoveringSubmit ? hoveringStyle : notHoveringStyle}
          onMouseEnter={this.handleSubmitMouseEnter}
          onMouseLeave={this.handleSubmitMouseLeave}
          onClick={this.handleSubmit}>
          <img
            src='/submit.svg'
            style={submitStyle}
            alt='Submit'
          />
        </div>
      </div>
    )
  }
}

PasswordPrompt.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  wrongPassword: PropTypes.bool
}

export default PasswordPrompt
