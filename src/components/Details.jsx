import React, { Component } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import FontAwesome from 'react-fontawesome'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

export default class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      currentMedia: {},
      isMouseInside: false,
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
    : null
  }

  closeModal(name) {
    this.props.close(name)
  }

  render() {
    console.log(this.props.media)
    return (
      <div>
        <Modal
          isOpen={this.props.open}
          onRequestClose={this.closeModal.bind(this, 'imageClicked')}
          contentLabel='mediaDetails'
        >
        <FontAwesome
          className='details-close-button'
          name='times'
          size='3x'
          onClick={this.closeModal.bind(this, 'imageClicked')}
        />
        {this.state.type === 'animeOrManga' ?
          <div>
            <img className='anime-manga-poster' src={this.props.media.image_url_lge} />
            <div className='anime-manga'>
              <p><strong>Title: </strong> {this.state.currentMedia.title_english}</p>
              <p><strong>Type: </strong>{this.state.currentMedia.type}</p>
              <p><strong>Description: </strong><i dangerouslySetInnerHTML={{__html: this.state.currentMedia.description}} /></p>
              {
                this.state.currentMedia.series_type === 'manga' ?
                  <p><strong>Total Chapters: </strong>{this.state.currentMedia.total_chapters}</p>
                : null
              }
              {
                this.state.currentMedia.series_type === 'anime' ?
                <div>
                  <p><strong>Total Episodes: </strong>{this.state.currentMedia.total_episodes}</p>
                  <iframe width="560" height="315"
                    src={`https://www.youtube.com/embed/${this.state.currentMedia.youtube_id}`}>
                  </iframe>
                </div>
                : null

              }
            </div>
          </div>
          :
          <div>
            <img
              className='league-bg-picture'
              src={`https://lolstatic-a.akamaihd.net/game-info/1.1.9/images/champion/backdrop/bg-${this.props.media.name.toLowerCase().replace(/\s+/, "")}.jpg`}
            />
            <h2 className='champion-title'>{this.props.media.name} {this.props.media.title}</h2>
            <i className='champion-blurb' dangerouslySetInnerHTML={{__html: this.props.media.blurb}}></i>
            <br/>
            <br/>
            <div>
              {
                this.props.media.spells.map((spell, index) => {
                  return (
                    <Tooltip key={index} placement='bottom' overlay={spell.description}>
                      <img
                        className='spell-image'
                        src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${spell.image.full}`}
                      />
                    </Tooltip>
                  )
                })
              }
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h3 className='lore-title'>Champion Lore </h3>
            <span dangerouslySetInnerHTML={{__html: this.props.media.lore}}></span>
          </div>
        }
        </Modal>
      </div>
    )
  }
}

//http://ddragon.leagueoflegends.com/cdn/6.24.1/img/passive/Ahri_SoulEater.png
//url('https://lolstatic-a.akamaihd.net/game-info/1.1.9/images/champion/backdrop/bg-ahri.jpg'