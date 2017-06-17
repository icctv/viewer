import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'
import Player from './Player'
import Protection from './Protection'
import makeRelay from './relay'

class App extends Component {
  constructor (props) {
    super(props)

    const { relayUrl } = this.props

    this.state = {
      relay: makeRelay({ relayUrl })
    }

    this.getUrl = this.getUrl.bind(this)
  }

  getUrl () {
    const { channel, password, relayUrl } = this.props

    const baseUrl = relayUrl.replace(/^http/, 'ws')
    const url = [baseUrl, 'out', channel, password].join('/')

    return url
  }

  render () {
    const { channel, password } = this.props
    const { relay } = this.state

    return (
      <div>
        <Protection relay={relay} channel={channel} password={password}>
          <Player
            width={360}
            height={240}
            url={this.getUrl()} />
        </Protection>
      </div>
    )
  }
}

App.propTypes = {
  channel: PropTypes.string.isRequired,
  password: PropTypes.string,
  relayUrl: PropTypes.string.isRequired
}

App.defaultProps = {
  relayUrl: process.env.NODE_ENV === 'production' ? 'https://relay.icctv.gq' : 'http://localhost:8080'
}

export default App
