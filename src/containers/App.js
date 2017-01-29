import React, { Component } from 'react';
import './App.scss';
import Aniga from './Aniga.jsx'
import Gaming from './Gaming.jsx'
// import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anime: true,
      gaming: false,
    }
  }

  handleSite(site) {
    site === 'gaming' ? this.setState({anime: false, gaming: true}) : this.setState({anime: true, gaming: false})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <button onClick={this.handleSite.bind(this, 'anime')}>Anime/Manga</button>
          <button onClick={this.handleSite.bind(this, 'gaming')}>Gaming</button>
          {this.state.anime ?
            <div>
              <img
                src='http://images4.fanpop.com/image/photos/19600000/Bleach-Chibi-Banner-bleach-chibis-19651855-800-100.jpg'
                className='App-logo'
                alt='logo'
              />
              <h1>Welcome to Aniga</h1>
            </div>
          :
            <div>
              <img
                src='http://lolesports.co.za/wp-content/uploads/2015/01/lol-banner.jpg'
                className='App-logo'
                alt='logo'
              />
              <h1>Welcome to the gaming portion of this website</h1>
            </div>
          }
        </div>
      {this.state.anime ? <Aniga /> : <Gaming />}
      </div>
    );
  }
}
