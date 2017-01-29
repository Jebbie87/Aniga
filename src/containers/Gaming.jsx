import React, { Component } from 'react'
import Steam from './Steam.jsx'
import League from './League.jsx'

export default class Gaming extends Component {

  state = {
    league: true,
    steam: false,
  }

  handleGaming(platform) {
    platform === 'league' ? this.setState({league: true, steam: false,}) : this.setState({league: false, steam: true,})
  }

  render() {
    return (
      <div>
        <button onClick={this.handleGaming.bind(this, 'league')}>League of Legends</button>
        <button onClick={this.handleGaming.bind(this, 'steam')}>Steam</button>
        <h1>Gaming part of the website</h1>
        {this.state.league ? <League /> : <Steam />}
      </div>
    )
  }
}