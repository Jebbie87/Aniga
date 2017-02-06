import React, { Component } from 'react'
import axios from 'axios'

export default class Steam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: process.env.STEAM_API_KEY
    }
  }

  // componentWillMount() {
  //   axios({
  //     method: 'get',
  //     url: 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/',
  //     params: {
  //       key: this.state.apiKey,
  //       steamids: 76561197960435530
  //     },
  //     headers: {'Content-type': 'application/x-www.form-urlencoded'},
  //   })
  //   .then((response) => {
  //     console.log(response)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  //   // axios.get(`http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=${this.state.apiKey}&steamid=76561197960435530&relationship=friend`)
  //   // .then((response) => {
  //   //   console.log(response)
  //   // })
  //   // .catch((error) => {
  //   //   console.log(error)
  //   // })
  // }

  render() {
    return (
      <div>
        <h1>Steam part of the website</h1>
        <h1> This page does not work yet. Can't make API call to steam </h1>
      </div>
    )
  }
}

//my steam id = 209000244