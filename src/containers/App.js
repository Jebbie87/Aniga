import React, { Component } from 'react';
import './App.scss';
import Aniga from './Aniga.jsx'
import Gaming from './Gaming.jsx'
// import axios from 'axios'

//change banner according to whichever portion of the site user is on

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      media: {
        anime: true,
        manga: false,
      },
      gaming: {
        league: false,
        steam: false,
      },
      url: 'http://images4.fanpop.com/image/photos/19600000/Bleach-Chibi-Banner-bleach-chibis-19651855-800-100.jpg',
      title: 'Welcome to Aniga',
    }
  }

  handleBanner = (type) => {
    switch(type) {
      case 'media':
        this.setState({
          media: {anime: true,},
          gaming: {league: false,},
          url: 'http://images4.fanpop.com/image/photos/19600000/Bleach-Chibi-Banner-bleach-chibis-19651855-800-100.jpg',
          title: 'Welcome to Aniga',
        })
        break
      case 'anime':
        this.setState({
          url: 'https://theglorywhole.files.wordpress.com/2012/02/banner.jpg'
        })
        break
      case 'manga':
        this.setState({
          url: 'https://i.stack.imgur.com/ylsTn.png'
        })
        break
      case 'league':
        this.setState({
          url: 'http://stuffpoint.com/league-of-legends/image/155148-league-of-legends-lol-fan-club-banner.jpg'
        })
        break
      case 'steam':
        this.setState({
          url: 'http://www.highpants.net/wp-content/uploads/2012/09/technoid-valve-steam-update-banner.jpg'
        })
        break
      case 'gaming':
        this.setState({
          media: {anime: false,},
          gaming: {league: true,},
          url: 'http://lolesports.co.za/wp-content/uploads/2015/01/lol-banner.jpg',
          title: 'Welcome to the gaming part of the website',
        })
        break
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <button onClick={this.handleBanner.bind(this, 'media')}>Anime/Manga</button>
          <button onClick={this.handleBanner.bind(this, 'gaming')}>Gaming</button>
            <div>
              <img
                src={this.state.url}
                className='App-logo'
                alt='logo'
              />
              <h1>{this.state.title}</h1>
            </div>
          </div>
      {this.state.media.anime ? <Aniga media={this.handleBanner} /> : <Gaming media={this.handleBanner} />}
      </div>
    );
  }
}
