import React, {Component} from 'react'
import axios from 'axios'
import Details from '../components/Details.jsx'

export default class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anime: [],
      imageClicked: false,
      clickedAnime: {},
    }
  }

  componentWillMount() {
    axios.get(`https://anilist.co/api/browse/anime?access_token=${this.props.clientToken}`, {
      params: {
        genres: 'Comedy',
        year: "2016"
      }
    })
    .then((response) => {
      this.setState({anime: response.data})
    })
  }

  clickedAnime(anime) {
    this.setState({imageClicked: true, clickedAnime: anime})
  }

  closeModal = (name) => {
    this.setState({[name]: false,})
  }

  render(){
    return (
      <div>
        {
          this.state.anime.map((anime, index) => {
            return (
              <img
                key={index}
                role='presentation'
                src={anime.image_url_lge}
                onClick={this.clickedAnime.bind(this, anime)}
              />
            )
          })
        }
        {this.state.imageClicked ?
          <Details
            open={this.state.imageClicked}
            close={this.closeModal}
            media={this.state.clickedAnime}
            clientToken={this.props.clientToken}
            type='animeOrManga'
          />
          : null
        }
      </div>
    )
  }
}

