import React, { Component } from 'react'
import Modal from 'react-modal'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.close()
    //send to backend
  }

  closeModal(name) {
    this.props.close(name)
  }

  render() {
    return (
      <Modal
        isOpen={this.props.open}
        onRequestClose={this.closeModal.bind(this, 'registerForm')}
        contentLabel='Register Form'
      >
        <form onSubmit={this.handleSubmit} className="registerForm">
          <label>Username: <input onChange={this.handleChange} type="text" name="username"></input></label>
          <br/>
          <label>Email: <input onChange={this.handleChange} type="text" name="email"></input></label>
          <br/>
          <label>Password: <input onChange={this.handleChange} type="text" name="password"></input></label>
          <button onClick={this.closeModal.bind(this, 'registerForm')}>Close</button>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    )
  }
}