import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Loading = () => <div>Loading...</div>

class PasswordPrompt extends Component {
  render () {
    const { onSubmit } = this.props
    return (
      <div>
        Password:
        <input type='password' />
        <button onClick={onSubmit} />
      </div>
    )
  }
}

class Protection extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      isProtected: true,
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
    const { isProtected } = await this.props.relay.getMetadata({ channel })
    this.setState({
      isProtected,
      isLoading: false
    })
  }

  onSubmit (password) {
    this.setState({
      password
    })
  }

  render () {
    const { children } = this.props
    const { password, isLoading, isProtected } = this.state

    if (password) {
      return React.cloneElement(children, { password })
    } else if (isLoading) {
      return <Loading />
    } else if (isProtected) {
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
