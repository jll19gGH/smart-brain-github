import './App.css';
import React from 'react';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import FaceRecognition from './components/FaceRecognition';
import ParticlesBg from 'particles-bg';
import Signin from './components/Signin';
import Register from './components/Register';

const initialState = {
      input: '',
      imageUrl: '',
      box: '',
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: '',
      }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
    }})
  }

  //componentDidMount() {
  //  fetch('http://localhost:3000')
  //    .then(response => response.json())
  //    .then(data => console.log(data))
  //} 

  calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});

    if(this.state.input !== '') {
    fetch('https://smart-brain-api-5loe.onrender.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {

        console.log(response.status.code);
        if (response.status.code === 10000) {
          fetch('https://smart-brain-api-5loe.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
      }
    }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState);
    }
    else if(route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
    console.log("-----STATE-----\n");
    console.log(this.state);
    console.log("\n---------------\n");

  }

  render() {
    //const {isSignedIn, imageUrl, route, box} = this.state;
    if(this.state.route === 'signin' || this.state.route === 'signout')
    {
      return (
      <div className="App">
       <ParticlesBg color='#FFFFFF' type="cobweb" bg={true} />
        <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      </div>
    );  
    }
    else if(this.state.route === 'register')
    {
      return (
      <div className="App">
       <ParticlesBg color='#FFFFFF' type="cobweb" bg={true} />
        <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      </div>
    );  
    }
    else {
    return (
      <div className="App">
       <ParticlesBg color='#FFFFFF' type="cobweb" bg={true} />
        <Navigation onRouteChange={this.onRouteChange}/>
        <Logo/>
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
  }
}

export default App;
