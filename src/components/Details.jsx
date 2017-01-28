import React, { Component } from 'react'
import Modal from 'react-modal'

export default class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: this.props.clicked,
    }
  }

  handleClose = () => {
    this.setState({clicked: false,})
  }

  render () {
    return (
      <div>
        <Modal
          isOpen={this.props.clicked}
          onRequestClose={this.handleClose}
          contentLabel='mediaDetails'
        >
          <img src={this.props.media.image_url_lge} />
          <button onClick={this.handleClose}>Close</button>
        </Modal>
      </div>
    )
  }
}