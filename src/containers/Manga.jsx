import React, {Component} from 'react'
import axios from 'axios'

export default class Manga extends Component {

  constructor(props) {
    super(props)
    this.state = {
      manga: [],
    }
  }

  componentDidMount() {
    axios.get(`https://anilist.co/api/browse/manga?access_token=${this.props.clientToken}`, {
      params: {
        genre: "Comedy"
      }
    })
    .then((response) => {
      console.log(response.data)
      this.setState({manga: response.data})
    })
  }

  render() {
    return (
      <div>
        {
          this.state.manga.map(function(manga, index) {
            return (
              <img key={index} role="presentation" src={manga.image_url_lge} />
            )
          })
        }
      </div>
    )
  }
}