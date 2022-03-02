import React, {useState, useEffect} from 'react';
import './Main.scss';
import MainNav from './components/MainNav';

import Home from './components/Home';
import Main from './components/Main';
import Question from './components/Accordion';
import Footer from './components/Footer';



import {Link, Route, Switch} from 'react-router-dom';
import { } from 'react-bootstrap';
import {CSSTransition} from 'react-transition-group'

function App() {

  let[aniSwitch,setAniSwitch] = useState(false);

  
 
  return(  

<div className="App">
<CSSTransition in={aniSwitch} classNames="ani" timeout={500}>
<MainNav setAniSwitch={setAniSwitch} />    
</CSSTransition>

<Home />

<Switch>


<Route path="/main">
    <Main />
</Route>
</Switch>


<Question/>

<Footer/>
    </div> 
  )
};


export default App;
