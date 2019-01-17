import React, { Component } from 'react';
import '../App.css';
import { loadUserData, redirectToSignIn, isSignInPending, handlePendingSignIn, putFile, getFile } from 'blockstack';
let quill;

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutContent: "",
      email: "",
      twitter: "",
      other: "",
      publications: [],
      pubTitle: "",
      pubSource: "",
      pubDate: "",
      pubDesc: "",
      pubLink: ""
    }
  }

  componentDidMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then((userData) => {
        window.location = window.location.href.split('?')[0];
      });
    }
    if(loadUserData()) {
      getFile('charlie.json', {decrypt: false})
        .then((file) => {
          if(file) {
            let thisFile = JSON.parse(file);
            this.setState({
              email: thisFile.email,
              twitter: thisFile.twitter,
              other: thisFile.other,
              aboutContent: thisFile.aboutContent,
              publications: thisFile.publications
            }, () => {
                this.setValue(this.state.aboutContent);
            })
          } else {
            this.setState({
              email: "",
              twitter: "",
              other: "",
              aboutContent: "",
              publications: []
            })
          }
        })

      quill = new window.Quill('#editor-about', {
        theme: 'snow',
      })

      quill.on('text-change', (delta) => {
        this.handleAboutChange()
      });

      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        window.M.Modal.init(elems);
      });
    }
  }

  handleAboutChange = () => {
    this.setState({ aboutContent: quill.root.innerHTML });
  }

  handleSave = () => {
    const object = {};
    object.about = this.state.about;
    object.email = this.state.email;
    object.twitter = this.state.twitter;
    object.other = this.state.other;
    object.aboutContent = this.state.aboutContent;
    object.publications = this.state.publications;
    putFile('charlie.json', JSON.stringify(object), {encrypt: false})
      .then(() => {
        console.log("Saved!")
        window.M.toast({html: 'Updated!'})
        var instance = window.M.Modal.getInstance('#modal1');
        instance.close();

      })
      .catch(error => console.log(error));
  }


  handleSignIn = (e) => {
    e.preventDefault();
    const redirect = window.location.href;
    redirectToSignIn(redirect, origin + "/manifest.json", [
      "store_write",
      "publish_data"
    ])
  }

  handleAddNewPub = () => {
    const object = {};
    object.title = this.state.pubTitle;
    object.source = this.state.pubSource;
    object.date = this.state.pubDate;
    object.description = this.state.pubDesc;
    object.link = this.state.pubLink;
    object.id = Date.now();
    this.setState({ publications: [...this.state.publications, object]}, () => {
      this.handleSave();
      this.setState({
        pubTitle: "",
        pubSource: "",
        pubDate: "",
        pubDesc: "",
        pubLink: ""
      })
    })
  }

  setValue = (text) => {
    // resets the editor to empty
    quill.setContents([])
    // initialize the content to exactly what we have in our server (i.e. what we saved the last time as validated/sanitized by our server)
    quill.clipboard.dangerouslyPasteHTML(0, text)
  }

  handleDelete = (id) => {
    let pubs = this.state.publications;
    let index = pubs.findIndex(x => x.id === id)
    if(index > -1) {
      pubs.splice(index, 1);
    }
    this.setState({ publications: pubs }, () => {
      this.handleSave();
    });
  }

  render() {
    const { publications } = this.state;

    if(loadUserData()) {
      return(
        <div className="container" style={{marginTop: "45px"}}>
          <div className="row">
            <div className="col s12 m6">
              <h5>Update About Page</h5>
              <div id="editor-about">
                <p>This is where your about page content goes.</p>
              </div>
              <button onClick={this.handleSave} style={{marginTop: "20px"}} className='btn' style={{background: "#A50"}}>Save</button>
            </div>
            <div className="col s12 m6">
              <h5>Update Contact Info</h5>
              <div id="editor-contact">
                <input value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} type='text' placeholder='email address'/>
                <label>Email</label>
                <input value={this.state.twitter} onChange={(e) => this.setState({ twitter: e.target.value })} type='text' placeholder='twitter'/>
                <label>Twitter</label>
                <input value={this.state.other} onChange={(e) => this.setState({ other: e.target.value })} type='text' placeholder='other...'/>
                <label>Other</label><br/>
                <button onClick={this.handleSave} style={{marginTop: "20px"}} className='btn' style={{background: "#A50"}}>Save</button>
              </div>
            </div>
            <div className="col s12">
              <h5>Manage Publications <button data-target="modal1" className='btn modal-trigger' style={{background: "#A50"}}>New</button></h5>
              <table style={{marginBottom: "45px"}}>
                <thead>
                  <tr>
                      <th>Name</th>
                      <th>Publication</th>
                      <th></th>
                  </tr>
                </thead>

                <tbody>
                {
                  publications.reverse().map((pub) => {
                    return(
                      <tr key={pub.id}>
                        <td>{pub.title}</td>
                        <td>{pub.source}</td>
                        <td className='red-text'><a onClick={() => this.handleDelete(pub.id)} style={{color: "red", cursor: "pointer"}} onClick={() => this.handleDelete(pub.id)}>Delete</a></td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </table>

              <div id="modal1" className="modal">
                <div className="modal-content">
                  <h4>Add Publication</h4>
                  <p>Add a new publication below</p>
                  <input type='text' value={this.state.pubTitle} onChange={(e) => this.setState({pubTitle: e.target.value})} />
                  <label>Title</label>
                  <input type='text' value={this.state.pubSource} onChange={(e) => this.setState({pubSource: e.target.value})} />
                  <label>Name of Magazine or Journal</label>
                  <input type="text" value={this.state.pubDate} onChange={(e) => this.setState({pubDate: e.target.value})} />
                  <label>Date of Publication</label>
                  <input type="text" value={this.state.pubLink} onChange={(e) => this.setState({pubLink: e.target.value})} />
                  <label>Link to Publication</label>
                  <input type="text" value={this.state.pubDesc} onChange={(e) => this.setState({pubDesc: e.target.value})} />
                  <label>Short Description</label>
                </div>
                <div className="modal-footer">
                  <a onClick={this.handleAddNewPub} className="modal-close waves-effect waves-green btn-flat">Add it</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div className='center-align' style={{marginTop: "45px;"}}>
          <h1>Welcome back!</h1>
          <button onClick={this.handleSignIn} className='btn black'>Sign In</button>
        </div>
      )
    }
  }
}

export default Admin;
