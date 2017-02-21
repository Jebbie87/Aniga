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
      heroLevel: 0,
      lowLevelError: false,
      highLevelError: false,
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
      console.log("currentmedia", this.state.currentMedia)
    })
    : null
  }

  closeModal(name) {
    this.props.close(name)
  }

  handleChange = (event) => {
    console.log(Number(event.target.value) === 21 ? 'hello' : 'world')
    if (Number(event.target.value) < 0) {
      this.setState({
        lowLevelError: true,
        heroLevel: 0
      })
    } else if (Number(event.target.value) > 20) {
      this.setState({
        highLevelError: true,
        heroLevel: 20
      })
    } else {
      this.setState({
        lowLevelError: false,
        highLevelError: false,
        heroLevel: Number(event.target.value)
      })
    }
  }

  render() {
    console.log("props media", this.props.media)
    return (
      <div>
        <Modal
          isOpen={this.props.open}
          onRequestClose={this.closeModal.bind(this, 'imageClicked')}
          contentLabel='mediaDetails'
          className='modal-class'
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
              <p><strong>Title: </strong>{this.state.currentMedia.title_english}</p>
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
                  {this.state.currentMedia.youtube_id !== null ?
                    <iframe width="560" height="315"
                      src={`https://www.youtube.com/embed/${this.state.currentMedia.youtube_id}`}>
                    </iframe> : null
                  }
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
            <div>
                <h2 className='stats-title'>{this.props.media.name}'s Stats</h2>
              <table className='champion-stats'>
                <tbody>
                  <tr>
                    <td>Armor: <strong>{Math.round(this.props.media.stats.armor + (this.state.heroLevel * this.props.media.stats.armorperlevel))}</strong></td>
                    <td>Damage: <strong>{Math.round(this.props.media.stats.attackdamage + (this.state.heroLevel * this.props.media.stats.attackdamageperlevel))}</strong></td>
                    <td>Attack Speed: <strong>{Math.round(this.props.media.stats.attackspeedoffset + (this.state.heroLevel * this.props.media.stats.attackspeedperlevel))}</strong></td>
                  </tr>
                  <tr>
                    <td>Crit: <strong>{Math.round(this.props.media.stats.crit + (this.state.heroLevel * this.props.media.stats.critperlevel))}</strong></td>
                    <td>HP: <strong>{Math.round(this.props.media.stats.hp + (this.state.heroLevel * this.props.media.stats.hpperlevel))}</strong></td>
                    <td>MP: <strong>{Math.round(this.props.media.stats.mp + (this.state.heroLevel * this.props.media.stats.mpperlevel))}</strong></td>
                  </tr>
                  <tr>
                    <td>HP Regen: <strong>{Math.round(this.props.media.stats.hpregen + (this.state.heroLevel * this.props.media.stats.hpregenperlevel))}</strong></td>
                    <td>MP Regen: <strong>{Math.round(this.props.media.stats.mpregen + (this.state.heroLevel * this.props.media.stats.mpregenperlevel))}</strong></td>
                    <td>Spell Block: <strong>{Math.round(this.props.media.stats.spellblock + (this.state.heroLevel * this.props.media.stats.spellblockperlevel))}</strong></td>
                  </tr>
                </tbody>
              </table>
              <label className='level-box'>Hero level: <input type='text' name='heroLevel' onChange={this.handleChange}/></label>
              {this.state.lowLevelError ? <p className='error-message'>Lowest hero level is 0</p> : this.state.highLevelError ? <p className='error-message'>Max hero level is 20</p> : false}
            </div>
            <br/>
            <div>
              <h2 className='champion-spell-name'>{this.props.media.name}'s Spells</h2>
              <p className='champion-spell-name-hint'><i>(Hover over an icon to see the spell description)</i></p>
              {
                this.props.media.spells.map((spell, index) => {
                  const spellInfo = <div><h2 className='spell-name'>{spell.name}</h2><p className='spell-description'><i>{spell.description}</i></p></div>
                  return (
                    <Tooltip key={index} placement='bottom' overlay={spellInfo}>
                      <img className='spell-image' src={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/spell/${spell.image.full}`} />
                    </Tooltip>
                  )
                })
              }
            </div>
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