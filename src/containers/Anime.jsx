import React, {Component} from 'react'
import axios from 'axios'

export default class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anime: [],
      image: '',
    }
  }

  componentWillMount() {
    // axios.get(`https://anilist.co/api/anime/21355?access_token=${this.props.clientToken}`)
    //   .then((response) => {
    //     this.setState({image: response.data.image_url_lge})
    //   })

    axios.get(`https://anilist.co/api/browse/anime?access_token=${this.props.clientToken}`, {
      params: {
        genres: "Comedy",
        year: "2016"
      }
    })
    .then((response) => {
      this.setState({anime: response.data})
    })
  }

  render(){
    return (
      <div>
      {
        this.state.anime.map(function(anime, index) {
          return (
            <img key={index} role="presentation" src={anime.image_url_lge} />
          )
        })
      }
      </div>
    )
  }
}

