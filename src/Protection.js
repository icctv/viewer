import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import PasswordPrompt from './PasswordPrompt'

class Protection extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: null,
      isAuthorizing: null,
      isProtected: null,
      isAuthorized: null,
      password: props.password
    }

    this.getProtectionStatus = this.getProtectionStatus.bind(this)
    this.handleSetPassword = this.handleSetPassword.bind(this)
  }

  componentDidMount () {
    this.getProtectionStatus()

    if (this.state.password) {
      this.handleSetPassword(this.state.password)
    }
  }

  async getProtectionStatus () {
    const { channel } = this.props

    this.setState({
      isLoading: true
    })

    const isProtected = await this.props.relay.isProtected({ channel })

    this.setState({
      isProtected,
      isLoading: false
    })
  }

  async handleSetPassword (password) {
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
    const { children, channel, relay } = this.props
    const {
      password,
      isLoading,
      isProtected,
      isAuthorizing,
      isAuthorized
    } = this.state

    const url = relay.getStreamUrl({ channel, password })

    if (isLoading) {
      return <Loading />
    } else if (isAuthorizing) {
      return <Loading />
    }

    if (!isProtected) {
      return children
    }

    if (isProtected && isAuthorized === false) {
      return <PasswordPrompt onSubmit={this.handleSetPassword} wrongPassword />
    } else if (isProtected && !password) {
      return <PasswordPrompt onSubmit={this.handleSetPassword} />
    } else {
      return React.cloneElement(children, { url })
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
