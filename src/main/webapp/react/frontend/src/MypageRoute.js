
import React, {useState, useEffect} from 'react';

//ROUTE
import {Link, Route, Switch,BrowserRouter} from 'react-router-dom';

import MyHome from './mypage/user/page/MyHome';
import MyDiet from './mypage/user/page/MyDiet';
import MyLesson from './mypage/user/page/MyLesson';
import MyOrder from './mypage/user/page/MyOrder';
import MyCart from './mypage/user/page/MyCart';
import Edit from './mypage/user/component/Edit';


import Admin from './mypage/admin/page/Admin';
import Cs from './mypage/admin/page/Cs';
import Lesson from './mypage/admin/page/Lesson';
import Notice from './mypage/admin/page/Notice';
import Product from './mypage/admin/page/Product';

import Sidebar from './mypage/user/common/Sidebar';
import Sidebar_Admin from './mypage/admin/common/Sidebar';

import './MypageRoute.css';

function MypageRoute() {
  //const user_id = sessionStorage.getItem('user_id');
  const user_id = "hong";
  const classification = 1; //0: 관리자 페이지, 1: 마이페이지
  return (
    <div className='myhome-container'>
      <div className='myhome-wrap'>
        {classification===1 ? <Sidebar/> : <Sidebar_Admin/>} 
        <main>
          <Route path='/myhome' exact component={MyHome}/>
          <Route path='/myhome/edit' component={Edit}/>
          <Route path='/myhome/myDiet' component={MyDiet}/>
          <Route path='/myhome/myLesson' component={MyLesson}/>
          <Route path='/myhome/myOrder' component={MyOrder}/>
          <Route path='/myhome/myCart' component={MyCart}/>
          <Route path='/admin' exact component={Admin}/>
          <Route path='/admin/notice' component={Notice}/>
          <Route path='/admin/cs' component={Cs}/>
          <Route path='/admin/product' component={Product}/>
          <Route path='/admin/lesson' component={Lesson}/>
        </main>
      </div>
    </div>
      
  );
}


export default MypageRoute;