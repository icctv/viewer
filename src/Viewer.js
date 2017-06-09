import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Viewer extends Component {

  constructor (props) {
    super(props)

    this.state = {
      jsmpeg: null
    }
  }

  shouldComponentUpdate () {
    return false
  }

  willReceiveProps () {
    // TODO: Implement props change
  }

  componentDidMount () {
    // TODO: Get canvas via ref instead of id
    const canvas = document.getElementById('video-canvas')
    this.setState({
      jsmpeg: new window.JSMpeg.Player(this.props.url, { canvas })
    })
  }

  render () {
    return (
      <div>
        <canvas
          id='video-canvas'
          width={this.props.width}
          height={this.props.height} />
      </div>
    )
  }
}

Viewer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired
}

export default Viewer
