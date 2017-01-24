import React, { Component } from 'react'
import Modal from 'react-modal'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.props.fakeSubmit(this.state.email)
    this.props.close('loginForm')
    //send to backend
  }

  closeModal(name) {
    this.props.close(name)
  }

  render() {
    return (
      <Modal
        isOpen={this.props.open}
        onRequestClose={this.closeModal.bind(this, 'loginForm')}
        contentLabel='Login Form'
      >
        <form onSubmit={this.handleSubmit}>
          <label>Email: <input onChange={this.handleChange} type="text" name="email"></input></label>
          <br/>
          <label>Password: <input onChange={this.handleChange} type="text" name="password"></input></label>
          <button type="submit">Submit</button>
        </form>
          <button onClick={this.closeModal.bind(this, 'loginForm')} className="loginForm">Close</button>
      </Modal>
    )
  }
}