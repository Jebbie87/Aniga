import React, { Component } from 'react'

export default class Steam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: process.env.STEAM_API_KEY
    }
  }
  render() {
    return (
      <h1>Steam part of the website</h1>
    )
  }
}