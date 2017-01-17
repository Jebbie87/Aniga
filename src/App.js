import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Anime from './containers/Anime.jsx'
import Manga from './containers/Manga.jsx'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anime: false,
      manga: false,
      access_token: '',
    }
  }

  componentWillMount() {
    axios.post('https://anilist.co/api/auth/access_token', {
      grant_type: "client_credentials",
      client_id: "jebbie-czlct",
      client_secret: "QnlzF9MVPxBubyYDElOeLa",
    })
    .then((response) => {
      this.setState({access_token: response.data.access_token,})
    })
  }

  animeButton = () => {
    this.setState({anime: true, manga: false})
  }

  mangaButton = () => {
    this.setState({manga: true, anime: false})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="http://images4.fanpop.com/image/photos/19600000/Bleach-Chibi-Banner-bleach-chibis-19651855-800-100.jpg" className="App-logo" alt="logo" />
          <h2>Welcome to my website</h2>
        </div>
        <button onClick={this.animeButton}>Anime</button>
        <button onClick={this.mangaButton}>Manga</button>
        {Math.floor((Date.now() / 1000) + 3600)}
        {this.state.anime ? <Anime clientToken={this.state.access_token} /> : null}
        {this.state.manga ? <Manga clientToken={this.state.access_token} /> : null}
      </div>
    );
  }
}

export default App;
