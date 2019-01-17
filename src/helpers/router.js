export function checkRoute() {
  if(window.location.pathname === '/about') {
    this.setState({ about: true, home: false, admin: false, contact: false })
  } else if(window.location.pathname === '/') {
    this.setState({ home: true, about: false, admin: false, contact: false })
  } else if(window.location.pathname === '/admin') {
    this.setState({ admin: true, home: false, about: false, contact: false })
  } else if(window.location.pathname === '/contact') {
    this.setState({ admin: false, home: false, contact: true, about: false })
  } else {
    this.setState({ home: true, admin: false, about: false, contact: false })
  }

  this.loadContent();
}
