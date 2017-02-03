import React, { Component } from 'react'
import Steam from './Steam.jsx'
import League from './League.jsx'

export default class Gaming extends Component {

  state = {
    league: true,
    steam: false,
  }

  leagueButton = () => {
    this.props.media('league')
    this.setState({league: true, steam: false,})
  }

  steamButton = () => {
    this.props.media('steam')
    this.setState({league: false, steam: true,})
  }

  render() {
    return (
      <div>
        <button onClick={this.leagueButton}>League of Legends</button>
        <button onClick={this.steamButton}>Steam</button>
        <h1>Gaming part of the website</h1>
        {this.state.league ? <League /> : <Steam />}
      </div>
    )
  }
}