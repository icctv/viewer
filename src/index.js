import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const props = {
  channel: window.location.hash.substr(1),
  password: null,
  ...window.xprops
}

ReactDOM.render(
  <App {...props} />,
  document.getElementById('root')
)
