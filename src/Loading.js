import React from 'react'
import './Loading.css'
import { containerStyle } from './App'

const Loading = () => (
  <div style={containerStyle}>
    <div className='spinner'>
      <div className='bounce1' />
      <div className='bounce2' />
      <div className='bounce3' />
    </div>
  </div>
)

export default Loading
