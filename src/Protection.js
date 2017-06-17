import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Loading = () => <div>Loading...</div>

class PasswordPrompt extends Component {
  constructor (props) {
    super(props)

    this.state = {
      password: ''
    }

    this.handlePasswordChange = this.handlePasswordChange.bind(this)
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

class Protection extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      isProtected: false,
      isAuthorizing: false,
      isAuthorized: false,
      password: this.props.password
    }

    this.getMetadata = this.getMetadata.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    if (!this.state.password) {
      this.getMetadata()
    }
  }

  async getMetadata () {
    const { channel } = this.props
    const isProtected = await this.props.relay.isProtected({ channel })
    this.setState({
      isProtected,
      isLoading: false
    })
  }

  async onSubmit (password) {
    const { channel } = this.props

    this.setState({
      isAuthorizing: true
    })

    const isAuthorized = await this.props.relay.isAuthorized({ channel, password })

    this.setState({
      password,
      isAuthorized,
      isAuthorizing: false
    })
  }

  render () {
    const { children } = this.props
    const {
      password,
      isLoading,
      isProtected,
      isAuthorizing,
      isAuthorized
    } = this.state

    if (isLoading) {
      return <Loading />
    } else if (isAuthorizing) {
      return <Loading />
    } else if ((!isProtected) || (password && isAuthorized)) {
      return React.cloneElement(children, { password })
    } else if (isProtected || !isAuthorized) {
      return <PasswordPrompt onSubmit={this.onSubmit} />
    } else {
      return children
    }
  }
}

Protection.propTypes = {
  relay: PropTypes.object.isRequired,
  channel: PropTypes.string.isRequired,
  password: PropTypes.string,
  children: PropTypes.element.isRequired
}

export default Protection
