import React from 'react'
import './Loading.css'

const containerStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}

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
