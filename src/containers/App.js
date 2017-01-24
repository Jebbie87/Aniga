import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Anime from './Anime.jsx'
import Manga from './Manga.jsx'
import Register from '../components/Register.jsx'
import Login from '../components/Login.jsx'

const db = [
  {
    id: 1,
    username: 'jebbie-dev',
    email: 'jeff@test.com',
    client_id: 'jebbie-czlct',
    client_secret: 'QnlzF9MVPxBubyYDElOeLa',
  },
  {
    id: 2,
    username: 'jebbie',
    email: 'jeff2@test.com',
    client_id: 'jebbie-h5van',
    client_secret: 'KTvjRDlbUWlFzrfDq5MeM3O3HYDmW'
  }
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anime: false,
      manga: false,
      registerForm: false,
      loginForm: false,
      access_token: '',
      currentUser: '',
    }
  }

  // componentDidMount() {
  //   axios.post('https://anilist.co/api/auth/access_token', {
  //     grant_type: "client_credentials",
  //     client_id: client_id,
  //     client_secret: client_secret,
  //   })
  //   .then((response) => {
  //     this.setState({access_token: response.data.access_token,})
  //   })
  // }

  componentWillUpdate(newUser) {
    console.log(newUser)
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

  handleFakeDBSubmit = (email) => {
    db.forEach((person) => {
      if (person.email === email) {
        console.log(person.client_id, person.client_secret)
        axios.post('https://anilist.co/api/auth/access_token', {
          grant_type: "client_credentials",
          client_id: person.client_id,
          client_secret: person.client_secret,
        })
        .then((response) => {
          this.setState({access_token: response.data.access_token,})
        })
        .catch((error) => {
          console.log(error)
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="http://images4.fanpop.com/image/photos/19600000/Bleach-Chibi-Banner-bleach-chibis-19651855-800-100.jpg" className="App-logo" alt="logo" />
          <h1>Welcome to Aniga</h1>
        </div>
        <button onClick={this.formOpen} name="loginForm">Login</button>
        <button onClick={this.formOpen} name="registerForm">Register</button>
        <button onClick={this.animeButton}>Anime</button>
        <button onClick={this.mangaButton}>Manga</button>

        {this.state.registerForm ? <Register open={this.state.registerForm} close={this.formClose}/> : null}
        {this.state.loginForm ? <Login open={this.state.loginForm} close={this.formClose} fakeSubmit={this.handleFakeDBSubmit} /> : null}
        {this.state.anime ? <Anime clientToken={this.state.access_token} /> : null}
        {this.state.manga ? <Manga clientToken={this.state.access_token} /> : null}
      </div>
    );
  }
}

export default App;
