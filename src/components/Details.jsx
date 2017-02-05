import React, { Component } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import FontAwesome from 'react-fontawesome'

export default class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      currentMedia: {},
    }
  }

  componentWillMount() {
    this.setState({type: this.props.type})
  }

  componentDidMount() {
    this.state.type === 'animeOrManga' ?
    axios.get(`https://anilist.co/api/${this.props.media.series_type}/${this.props.media.id}?access_token=${this.props.clientToken}`)
    .then((response) => {
      this.setState({currentMedia: response.data})
      console.log(this.state.currentMedia)
    })
    : 'hello'
  }

  closeModal(name) {
    this.props.close(name)
  }

  render () {
    return (
      <div>
        <Modal
          isOpen={this.props.open}
          onRequestClose={this.closeModal.bind(this, 'imageClicked')}
          contentLabel='mediaDetails'
        >
        {this.state.type === 'animeOrManga' ?
          <div>
            <img src={this.props.media.image_url_lge} />
            <div className='anime-manga'>
              <p>Title: {this.state.currentMedia.title_english}</p>
              <p>Type: {this.state.currentMedia.type}</p>
              <p>Description: <span dangerouslySetInnerHTML={{__html: this.state.currentMedia.description}} /></p>
              {this.state.currentMedia.series_type === 'manga' ?
              <p>Total Chapters: {this.state.currentMedia.total_chapters}</p>
              : null}
            </div>
          </div>
            : 'hello'
        }
          <FontAwesome
            name='times'
            size='3x'
          />
        </Modal>
      </div>
    )
  }
}