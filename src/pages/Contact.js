import React, { Component } from 'react';
import '../App.css';

class Contact extends Component {
  componentDidMount() {
    this.props.loadContent()
  }

  render() {
    const { other, twitter, email} = this.props;
    return (
      <div className="container">
        <div className='center-align'>
          <h3>Contact Charlie</h3>
          {
            email ?
            <p><i className="material-icons prefix contact-icon">email</i> <a href={"mailto:" + email}>{email}</a></p> :
            null
          }
          {
            twitter ?
            <p><i className="material-icons prefix contact-icon">insert_link</i> <a href={twitter}>{twitter}</a></p> :
            null
          }
          {
            other ?
            <p><i className="material-icons prefix contact-icon">insert_link</i> <a href={other}>{other}</a></p> :
            null
          }
        </div>
      </div>
    );
  }
}

export default Contact;
