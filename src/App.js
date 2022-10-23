import logo from './logo.svg';
import './App.css';
import { Component } from 'react';


class App extends Component{
  render(){
    return(
    <div className='gray-background'> 
      <img src={logo} lat ="logo" />
      <h2>Let's dev camp site</h2>
    </div>
    );
  }
}

export default App;
