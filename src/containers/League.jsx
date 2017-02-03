import React, { Component } from 'react'
import axios from 'axios'

export default class League extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: process.env.LEAGUE_API_KEY,
      image: '',
      sprite: '',
    }
  }

  componentWillMount() {
    axios.get(`https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=all&api_key=${this.state.apiKey}`)
      .then((response) => {
        console.log(response.data.data)
        this.setState({
          image: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${response.data.data.Ahri.image.full}`,
          sprite: `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${response.data.data.Ahri.image.sprite}`})
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <div style={{backgroundImage: 'url(https://lolstatic-a.akamaihd.net/game-info/1.1.9/images/champion/backdrop/bg-ahri.jpg)', width: '100%', height: '100%'}}>
        </div>
        <h1>League part of the website</h1>
        {/*<img src={this.state.image} />
        <img src={this.state.sprite} />*/}
      </div>
    )
  }
}