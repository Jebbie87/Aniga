import React, {Component} from 'react'
import axios from 'axios'
import Details from '../components/Details.jsx'

export default class Manga extends Component {

  constructor(props) {
    super(props)
    this.state = {
      manga: [],
      imageClicked: false,
      clickedManga: {},
    }
  }

  componentDidMount() {
    this.props.clientToken ? axios.get(`https://anilist.co/api/browse/manga?access_token=${this.props.clientToken}`, {
      params: {
        genre: 'Comedy'
      }
    })
    .then((response) => {
      this.setState({manga: response.data})
    })
    : null
  }

  clickedManga(manga) {
    this.setState({imageClicked: true, clickedManga: manga})
  }

  closeModal = (name) => {
    this.setState({[name]: false,})
  }

  render() {
    return (
      <div>
        {
          this.state.manga.map((manga, index) => {
            return (
              <img
                className='manga-poster'
                key={index}
                role='presentation'
                src={manga.image_url_lge}
                onClick={this.clickedManga.bind(this, manga)}
              />
            )
          })
        }
        {this.state.imageClicked ?
          <Details
            open={this.state.imageClicked}
            close={this.closeModal}
            media={this.state.clickedManga}
            clientToken={this.props.clientToken}
            type='animeOrManga'
          />
          : null
        }
      </div>
    )
  }
}