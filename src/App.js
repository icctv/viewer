import React, { Component } from 'react'
import './App.css'
import Viewer from './Viewer'

const url = `ws://localhost:3000/out/unicornes`

class App extends Component {
  render () {
    return (
      <div>
        <Viewer
          width={360}
          height={240}
          url={url} />
      </div>
    )
  }
}

export default App
