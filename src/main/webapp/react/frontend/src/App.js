
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

//Servey

import Survey from './components/Survey'


//board
import WriteBoard from './components/board/writeboard';
import BoardList from './components/board/boardList';
import ViewBoard from './components/board/viewboard';
import TeacherBoard from './components/board/teacherBoard';
import ModifyBoard from './components/board/ModifyBoard';

//Notice
import NoticePage from './components/notice/NoticePage';
import MyEditor from './components/notice/MyEditor';
import NoticeView from './components/notice/NoticeView';
import NoticeEdit from './components/notice/NoticeEdit';


//Product
import AdminProductList from './product/AdminProductList';
import UploadProduct from './product/UploadProduct';
import AdminViewProduct from './product/AdminViewProduct';
import UserProductList from './product/UserProductList';
import UserViewProduct from './product/UserViewProduct';



function App() {


  return (
    <BrowserRouter>
    <div className="App">
    
      <MainNav />   

      <Switch>
      <Route path="/survey" component={Survey}/>
      
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
        <Route path="/board/modifyBoard/:board_code" component={ModifyBoard} />
        
        <Route exact path="/notice"><NoticePage/></Route>
        <Route exact path="/notice/new"><MyEditor/></Route>
        <Route path="/notice/edit/:notice_code"><NoticeEdit/></Route>
        <Route path="/notice/:notice_code"><NoticeView/></Route>
        
        <Route exact path="/product"><AdminProductList/></Route>
        <Route exact path="/product/new"><UploadProduct/></Route>
        <Route path="/product/view/:pro_code"><AdminViewProduct/></Route>
        
        <Route exact path="/shop"><UserProductList/></Route>
        <Route path="/shop/view/:pro_code"><UserViewProduct/></Route>
        
        <MypageRoute/>

      </Switch>

    </div>
    </BrowserRouter>
  );
}


export default App;