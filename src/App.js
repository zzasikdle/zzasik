
import React, {useState, useEffect} from 'react';

// SCSS
import './Main.scss';
import { } from 'react-bootstrap';

// COMPONENT
import MainNav from './components/MainNav';
import Home from './components/Home';
import Question from './components/Accordion';
import Footer from './components/Footer';

//ROUTE
import {Link, Route, Switch} from 'react-router-dom';



function App() {


  return (
    <div className="App">
    
<MainNav />    

<Home />

<Question/>

<Footer/>

  
    </div>
  );
}


export default App;