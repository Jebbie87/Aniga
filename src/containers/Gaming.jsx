import React, { Component } from 'react'
import Steam from './Steam.jsx'
import League from './League.jsx'

export default class Gaming extends Component {

  state = {
    league: true,
    steam: true,
    showGame: false,
  }

  leagueButton = () => {
    this.props.media('league')
    this.setState({league: true, steam: false, showGame: true,})
  }

  steamButton = () => {
    this.props.media('steam')
    this.setState({league: false, steam: true, showGame: true})
  }

  render() {
    return (
      <div>
        {this.state.steam ? <img src='../../public/LoL-button.png' className='league-button' onClick={this.leagueButton} /> : false}
        {this.state.league ? <img src='../../public/steam-button.jpg' className='steam-button' onClick={this.steamButton} /> : false}
        {this.state.showGame ? this.state.league ? <League /> : <Steam /> : false}
      </div>
    )
  }
}