import React, { Component } from 'react';
import '../App.css';
import background1 from '../images/background1.jpg';
import background2 from '../images/background2.jpg';
import background3 from '../images/background3.jpg';


class Home extends Component {

  componentDidMount() {
    this.props.loadContent();
  }

  render() {
    const { publications } = this.props;
    return (
      <div>
        <div id="index-banner" className="parallax-container">
          <div className="section no-pad-bot">
            <div className="container">
              <br/><br/>
              <h1 style={{color: "#fff"}} className="header center">Charlie Allison</h1>
              <div className="row center">
                <h5 style={{color: "#fff"}} className="header col s12 ">Author, speaker, researcher</h5>
              </div>
              <div className="row center">
                <a href="#pubs" id="download-button" className="btn-large waves-effect" style={{background: "#A50"}}>Publications</a>
              </div>
              <br/><br/>

            </div>
          </div>
          <div className="parallax"><img src={background1} alt="Unsplashed background img 1" /></div>
        </div>


        <div id='pubs' className="container">
          <div className="section">
            <h2>Publications</h2>
            <div className="row">
              {
                publications ?
                publications.reverse().map(pub => {
                  return(
                    <div className="col s12">
                      <a style={{color: "#000", textDecoration: "underline"}} href={pub.link}><h3>{pub.title}</h3></a>
                      <h5>Appears in {pub.source}</h5>
                      <p>{pub.description.length > 100 ? pub.description.substring(0,100) : pub.description}...<a style={{color: "#000",textDecoration: "underline"}} href={pub.link}>READ MORE</a></p>
                    </div>
                  )
                }) :
                <div />
              }

            </div>

          </div>
        </div>


        <div className="parallax-container valign-wrapper">
          <div className="section no-pad-bot">
            <div className="container">
              <div className="row center">
                <h5 className="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
              </div>
            </div>
          </div>
          <div className="parallax"><img src={background2} alt="Unsplashed background img 2" /></div>
        </div>

        <div className="container">
          <div className="section">

            <div className="row">
              <div className="col s12 center">
                <h3><i className="mdi-content-send brown-text"></i></h3>
                <h4>Contact Us</h4>
                <p className="left-align light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat. Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies eros. Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi sem neque, posuere et pretium eget, bibendum sollicitudin lacus. Aliquam eleifend sollicitudin diam, eu mattis nisl maximus sed. Nulla imperdiet semper molestie. Morbi massa odio, condimentum sed ipsum ac, gravida ultrices erat. Nullam eget dignissim mauris, non tristique erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</p>
              </div>
            </div>

          </div>
        </div>


        <div className="parallax-container valign-wrapper">
          <div className="section no-pad-bot">
            <div className="container">
              <div className="row center">
                <h5 className="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
              </div>
            </div>
          </div>
          <div className="parallax"><img src={background3} alt="Unsplashed background img 3" /></div>
        </div>
      </div>
    );
  }
}

export default Home;
