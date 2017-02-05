import React, { Component } from 'react';
import './App.scss';
import Aniga from './Aniga.jsx'
import Gaming from './Gaming.jsx'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      media: {
        anime: false,
        manga: false,
      },
      gaming: {
        league: true,
        steam: false,
      },
      // url: 'http://images4.fanpop.com/image/photos/19600000/Bleach-Chibi-Banner-bleach-chibis-19651855-800-100.jpg',
      // title: 'Welcome to Aniga',
      url: 'http://big-rooster.com/wp-content/uploads/2016/05/cropped-i_love_gaming_banner_by_drshmeb-d6p7hsq.jpg',
      title: 'Welcome to the gaming part of the website',
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
          url: 'http://big-rooster.com/wp-content/uploads/2016/05/cropped-i_love_gaming_banner_by_drshmeb-d6p7hsq.jpg',
          title: 'Welcome to the gaming part of the website',
        })
        break
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
            <div>
              <img
                src={this.state.url}
                className='App-logo'
                alt='logo'
              />
              <h1 className='main-title'>{this.state.title}</h1>
              <button onClick={this.handleBanner.bind(this, 'media')}>Anime/Manga</button>
              <button className='gaming-button' onClick={this.handleBanner.bind(this, 'gaming')}>Gaming</button>
            </div>
          </div>
      {this.state.media.anime ? <Aniga media={this.handleBanner} /> : <Gaming media={this.handleBanner} />}
      </div>
    );
  }
}
