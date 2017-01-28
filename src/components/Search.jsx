import React, { Component } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
// import { Creatable } from 'react-select'
import Select from 'react-select'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genre: '',
      type: '',
      season: '',
      year: '',
      media: 'manga',
      anime: [],
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  closeModal = (name) => {
    this.props.close(name)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios.get(`https://anilist.co/api/browse/${this.state.media}?access_token=${this.props.clientToken}`, {
      params: {
        genre: this.state.genre ? this.state.genre : null,
        type: this.state.type ? this.state.type : null,
        season: this.state.season ? this.state.season : null,
        year: this.state.year ? this.state.year : null,
      }
    })
    .then((response) => {
      this.props.search(response.data)
    })
    this.props.close('searchForm')
  }

  render() {
    return (
      <Modal
        isOpen={this.props.open}
        onRequestClose={this.closeModal.bind(this, 'searchForm')}
        contentLabel="Search Form"
      >
        <form onSubmit={this.handleSubmit}>
          <label>Media:
            <select value={this.state.media} onChange={this.handleChange} name='media'>
              <option value='manga'>Manga</option>
              <option value='anime'>Anime</option>
            </select>
          </label>
          <br/>
          <label>Genre: <input onChange={this.handleChange} type='text' name='genre'></input></label>
          <br/>
          <label>Year: <input onChange={this.handleChange} type='text' name='year'></input></label>
          <br/>
          {this.state.media === 'anime' ?
            <div>
              <label>Type:
                <select value={this.state.type} onChange={this.handleChange} name='type'>
                  <option value='tv'>TV</option>
                  <option value='movie'>Movie</option>
                  <option value='special'>Special</option>
                  <option value='OVA'>OVA</option>
                </select>
              </label>
              <br/>
              <label>Season:
                <select value={this.state.season} onChange={this.handleChange} name='season'>
                  <option value='winter'>Winter</option>
                  <option value='summer'>Summer</option>
                  <option value='spring'>Spring</option>
                  <option value='fall'>Fall</option>
                </select>
              </label>
            </div>
            : null
          }
          <button type='submit'>Submit</button>
        </form>
        <button onClick={this.closeModal.bind(this, 'searchForm')}>Close</button>
      </Modal>
    )
  }
}