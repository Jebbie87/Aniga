import React, {Component} from 'react'

export default class Champion extends Component {
  render() {
    const imageBaseURL = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/'
    return (
      <img key={this.props.champion} src={imageBaseURL + this.props.champion.image.full} />
    )
  }
}