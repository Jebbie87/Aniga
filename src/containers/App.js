import React, { Component } from 'react';
import './App.scss';
import axios from 'axios'
import Anime from './Anime.jsx'
import Manga from './Manga.jsx'
import Register from '../components/Register.jsx'
import Login from '../components/Login.jsx'
import Search from '../components/Search.jsx'
import Details from '../components/Details.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anime: false,
      manga: false,
      registerForm: false,
      loginForm: false,
      searchForm: false,
      imageClicked: false,
      access_token: '',
      currentUser: '',
      clickedMedia: {},
      searched: [],
    }
  }

  componentWillMount() {
    axios.post('https://anilist.co/api/auth/access_token', {
      grant_type: "client_credentials",
      client_id: 'jebbie-czlct',
      client_secret: 'QnlzF9MVPxBubyYDElOeLa',
    })
    .then((response) => {
      this.setState({access_token: response.data.access_token,})
    })
    .catch((error) => {
      console.log(error)
    })
  }

  animeButton = () => {
    this.setState({anime: true, manga: false,})
  }

  mangaButton = () => {
    this.setState({manga: true, anime: false,})
  }

  formOpen = (event) => {
    this.setState({[event.target.name]: true,})
  }

  formClose = (name) => {
    this.setState({[name]: false,})
  }

  updateSearched = (searched) => {
    this.setState({searched: searched})
  }

  clickedImage(media) {
    this.setState({imageClicked: true, clickedMedia: media})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="http://images4.fanpop.com/image/photos/19600000/Bleach-Chibi-Banner-bleach-chibis-19651855-800-100.jpg" className="App-logo" alt="logo" />
          <h1>Welcome to Aniga</h1>
        </div>
        {/*<button onClick={this.formOpen} name="loginForm">Login</button>
        <button onClick={this.formOpen} name="registerForm">Register</button>*/}
        <button onClick={this.animeButton}>Anime</button>
        <button onClick={this.mangaButton}>Manga</button>
        <button onClick={this.formOpen} name="searchForm">Search</button>
        <br/>
        {this.state.registerForm ? <Register open={this.state.registerForm} close={this.formClose}/> : null}
        {this.state.loginForm ? <Login open={this.state.loginForm} close={this.formClose} /> : null}
        {this.state.searchForm ? <Search open={this.state.searchForm} close={this.formClose} clientToken={this.state.access_token} search={this.updateSearched}/> : null}
        {this.state.anime ? <Anime clientToken={this.state.access_token} /> : null}
        {this.state.manga ? <Manga clientToken={this.state.access_token} /> : null}
        {this.state.searched ?
          this.state.searched.map((media, index) => {
            return (
              <img key={index} src={media.image_url_lge} onClick={this.clickedImage.bind(this, media)} />
            )
          })
          : null
        }
        {this.state.imageClicked ? <Details open={this.state.imageClicked} close={this.formClose} media={this.state.clickedMedia} clientToken={this.state.access_token} /> : null}
      </div>
    );
  }
}

export default App;