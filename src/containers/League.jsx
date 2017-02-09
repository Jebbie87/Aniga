import React, { Component } from 'react'
import axios from 'axios'
import Details from '../components/Details.jsx'

export default class League extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: process.env.LEAGUE_API_KEY,
      currentChampion: '',
      imageClicked: false,
      champions: [],
    }
  }

  componentWillMount() {
    axios.get(`https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=all&api_key=${this.state.apiKey}`)
      .then((response) => {
        Object.keys(response.data.data).sort().map((champion) => {
          this.setState({
            champions: [...this.state.champions, response.data.data[champion]]
          })
        })

      })
      .catch((error) => {
        console.log(error)
      })
  }

  imageClicked(champion) {
    this.setState({imageClicked: true, currentChampion: champion})
  }

  closeModal = (name) => {
    this.setState({[name]: false,})
  }

  render() {
    const imageBaseURL = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/'
    return (
      <div className='all-champion-pictures'>
      <h1> League of Legends Champions </h1>
      <h3> Click on an image to begin </h3>
        {
          this.state.champions.map((champion, index) => {
            return (
              <div key={index} className='champion-icon-box'>
                <img className='champion-icon' key={champion} src={imageBaseURL + (champion.image.full === 'Fiddlesticks.png' ? 'FiddleSticks.png' : champion.image.full)} onClick={this.imageClicked.bind(this, champion)}/>
                <br/>
                <span className='champion-name'>{champion.name}</span>
              </div>
            )
          })
        }
        {this.state.imageClicked ?
          <Details
            open={this.state.imageClicked}
            close={this.closeModal}
            media={this.state.currentChampion}
            type='league'
          />
          : null
        }
        </div>
    )
  }
}

//http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/Ahri.png