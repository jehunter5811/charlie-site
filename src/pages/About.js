import React, { Component } from 'react';
import '../App.css';
import charlie from '../images/charlie.jpg';

class About extends Component {
  componentDidMount() {
    this.props.loadContent()
  }

  render() {
    const {aboutContent} = this.props;
    return (
      <div className="container">
        <div className="center-align">
          <img src={charlie} className='circle' style={{maxWidth: "20%", margin: "auto", marginTop: "45px"}} alt='profile' />
        </div>
        <h1 className="center-align" style={{marginBottom: "25px"}}>About Charlie</h1>
        <div style={{maxWidth: "50%", margin: "auto", marginBottom: "35px"}}>
          <div dangerouslySetInnerHTML={{__html: aboutContent}} />
        </div>
      </div>
    );
  }
}

export default About;
