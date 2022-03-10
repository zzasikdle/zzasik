
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
import {Link, Route,  Switch,BrowserRouter} from 'react-router-dom';


//Member
import Login from './components/member/Login';
import Join from './components/member/Join';

//MyPage
import MypageRoute from './MypageRoute';
import MemberList from './mypage/admin/component/MemberList'

//board
import WriteBoard from './components/board/writeboard';
import BoardList from './components/board/boardList';
import ViewBoard from './components/board/viewboard';
import TeacherBoard from './components/board/teacherBoard';

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
        <Route path="/mypage/admin/member" component={MemberList} />
        <Route path="/writeboard" component={WriteBoard} />
        <Route path="/board/list" component={BoardList} />
        <Route path="/board/viewboard/:board_code" component={ViewBoard} />
        <Route path="/board/teacherBoard" component={TeacherBoard} />
        
        <MypageRoute/>

      </Switch>

    </div>
    </BrowserRouter>
  );
}


export default App;