import React, { Component } from 'react'
import PropTypes from 'prop-types'

const containerStyle = {
  width: '100%',
  height: '100%'
}

// Stretch canvas to size of window by Zachary Johnson
// http://www.zachstronaut.com/
// https://gist.github.com/zachstronaut/1184900
const fitToScreen = (canvas) => {
  const style = canvas.getAttribute('style') || ''
  let scale = { x: 1, y: 1 }
  scale.x = window.innerWidth / canvas.width
  scale.y = window.innerHeight / canvas.height
  if (scale.x < 1 || scale.y < 1) {
    scale = '1, 1'
  } else if (scale.x < scale.y) {
    scale = scale.x + ', ' + scale.x
  } else {
    scale = scale.y + ', ' + scale.y
  }

  canvas.setAttribute('style', `${style}
    -ms-transform-origin: center top;
    -webkit-transform-origin: center top;
    -moz-transform-origin: center top;
    -o-transform-origin: center top;
    transform-origin: center top;
    -ms-transform: scale(${scale});
    -webkit-transform: scale3d(${scale}, 1);
    -moz-transform: scale(${scale});
    -o-transform: scale(${scale});
    transform: scale(${scale});
  `)
}

class Player extends Component {
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

    setInterval(() => fitToScreen(canvas), 16 * 4)
    window.addEventListener('resize', () => fitToScreen(canvas), false)
  }

  render () {
    return (
      <div style={containerStyle}>
        <canvas
          id='video-canvas'
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    )
  }
}

Player.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired
}

export default Player
