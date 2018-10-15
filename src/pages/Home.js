import React from 'react'
import Layout from '../components/Layout'
import Navigation from '../components/Navigation'

export default () => {
  return (
    <div>
      <h1>Home</h1>
      {[...Array(44).keys()].map(k => (
        <div>Hello word</div>
      ))}
    </div>
  )
}
