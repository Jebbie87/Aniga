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
        {this.state.steam ? <img src='../../public/LoL-button.png' className='league-button' onClick={this.leagueButton} /> : null}
        {this.state.league ? <img src='../../public/steam-button.jpg' className='steam-button' onClick={this.steamButton} /> : null}
        {this.state.league ? <League /> : <Steam />}
      </div>
    )
  }
}