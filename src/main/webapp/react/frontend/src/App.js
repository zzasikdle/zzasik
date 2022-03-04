
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
import {Link, Route, Switch,BrowserRouter} from 'react-router-dom';

//Member
import Login from './components/member/Login';
import Join from './components/member/Join';

//MyPage
import MypageRoute from './MypageRoute';



function App() {


  return (
    <BrowserRouter>
    <div className="App">
    
      <MainNav />   

      <Switch>
        <Route exact path="/">
          <Home />
          <Question/>
          <Footer/>
        </Route>
        <Route path="/member/login" component={Login} />
        <Route path="/member/Join" component={Join} />
        <MypageRoute/>

      </Switch>

    </div>
    </BrowserRouter>
  );
}


export default App;