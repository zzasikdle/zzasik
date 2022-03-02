import React, {useState, useEffect} from 'react';
import './Main.scss';
import MainNav from './components/MainNav';

import Home from './components/Home';
import Question from './components/Accordion';
import Footer from './components/Footer';



import {Link, Route, Switch} from 'react-router-dom';
import { } from 'react-bootstrap';

function App() {


  
 
  return(  

<div className="App">
<MainNav />    

<Home />

<Question/>

<Footer/>
    </div> 
  )
};


export default App;
