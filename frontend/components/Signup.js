import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'
import Router from 'next/router'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    $image: String!
  ) {
    signup(email: $email, name: $name, password: $password, image: $image) {
      id
      email
      name
      image
    }
  }
`

class Signup extends Component {
  state = {
    name: '',
    password: '',
    email: '',
    confirmPassword: '',
    image: '',
  }
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleError = () => {
    const { password, confirmPassword, email, name } = this.state
    if (password !== confirmPassword) {
      return <div style={{ color: 'red' }}>Your Passwords Do Not Match</div>
    }
  }
  uploadFile = async (e) => {
    console.log('uploading file...')
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'stagewood')

    const res = await fetch(
      ' https://api.cloudinary.com/v1_1/dkm4oomv6/image/upload',
      {
        method: 'POST',
        body: data,
      },
    )
    const file = await res.json()
    // console.log(file)
    this.setState({
      image: file.secure_url,
    })
  }
  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state} //array of querries to refetch. when mutation is succesful refetches this querry
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async (e) => {
              const { password, confirmPassword } = this.state

              if (password !== confirmPassword) {
                e.preventDefault()
              } else {
                e.preventDefault()
                await signup()
                this.setState({ name: '', email: '', password: '' })
                Router.push('/')
              }
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up for An Account</h2>
              <Error error={error} />
              {this.handleError()}
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="confirmPassword">
                Confirm Password
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  value={this.state.confirmPassword}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  required
                  onChange={this.uploadFile}
                />
                {this.state.image && (
                  <img
                    width="200"
                    src={this.state.image}
                    alt="Upload Preview"
                  />
                )}
              </label>
              {/* Upload Profile Picture
              <input type="file" accept="image/*" capture="camera"></input> */}
              <button type="submit">Sign Up!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Signup
