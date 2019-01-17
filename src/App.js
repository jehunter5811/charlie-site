import React, { Component } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { checkRoute } from './helpers/router';
import { loadContent } from './helpers/content';
import {signUserOut, loadUserData} from 'blockstack';
import './App.css';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import logo from './images/logo.png'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: true,
      about: false,
      admin: false,
      contact: false,
      publications: [],
      email: "",
      aboutContent: "",
      twitter: "",
      other: ""
    }

    this.checkRoute = checkRoute.bind(this);
    this.loadContent = loadContent.bind(this);
  }

  componentDidMount() {
    this.checkRoute();
  }

  handleSignOut = (e) => {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  renderPage() {
    const { home, about, contact, publications, admin, email, twitter, other, aboutContent } = this.state;
    if(home) {
      return (
        <Home
          publications={publications}
          loadContent={this.loadContent}
        />
      );
    } else if(about) {
      return(
        <About
          email={email}
          twitter={twitter}
          aboutContent={aboutContent}
          other={other}
          loadContent={this.loadContent}
        />
      )

    } else if(contact) {
      return(
        <Contact
          email={email}
          twitter={twitter}
          aboutContent={aboutContent}
          other={other}
          loadContent={this.loadContent}
        />
      )
    } else if(admin) {
      return (
        <Admin />
      )
    }
  }

  render() {
    const { publications } = this.state;
    return (
      <div>
        <nav className="white" role="navigation">
          <div className="nav-wrapper container">
            <a id="logo-container" href="/" className="brand-logo black-text"><img style={{height: "50px", marginTop: "5px"}} src={logo} alt='logo' /></a>
            <ul className="right hide-on-med-and-down">
              <li><a className='black-text' href="/about">About</a></li>
              <li><a className='black-text' href="/contact">Contact</a></li>
              {loadUserData() ? <li><a className='black-text' onClick={this.handleSignOut}>Sign Out</a></li> : <li style={{display: "none"}} />}
            </ul>
          </div>
        </nav>
        <div>
          {this.renderPage()}
        </div>
      </div>
    )
  }
}

export default App;
