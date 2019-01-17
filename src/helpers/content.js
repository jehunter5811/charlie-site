import { getFile } from 'blockstack';

export function loadContent() {
  const file = 'charlie.json';
  const options = { username: "callison.id.blockstack", zoneFileLookupURL: "https://core.blockstack.org/v1/names", decrypt: false}
    getFile(file, options)
     .then((file) => {
       if(file) {
         this.setState({
           publications: JSON.parse(file).publications,
           aboutContent: JSON.parse(file).aboutContent,
           email: JSON.parse(file).email,
           twitter: JSON.parse(file).twitter,
           other: JSON.parse(file).other
         });
       } else {
         this.setState({
           publications: [],
           aboutContent: "",
           email: "",
           twitter: "",
           other: ""
         });
       }

     })
      .catch(error => {
        console.log(error);
      });
}
