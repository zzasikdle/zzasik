/*eslint-disable*/
import React from 'react';

//ROUTE
import {Route} from 'react-router-dom';

import MyHome from './mypage/user/page/MyHome';
import MyDiet from './mypage/user/page/MyDiet';
import MyLesson from './mypage/user/page/MyLesson';
import MyOrder from './mypage/user/page/MyOrder';
import MyCart from './mypage/user/page/MyCart';
import Edit from './mypage/user/component/Edit';


import Admin from './mypage/admin/page/Admin';
import Lesson from './mypage/admin/page/Lesson';
import Notice from './mypage/admin/page/Notice';
import Product from './mypage/admin/page/Product';

import Teacher from './mypage/teacher/page/Teacher';
import T_Lesson from './mypage/teacher/page/T_Lesson';
import T_SignUpList from './mypage/teacher/page/T_SignUpList';
import T_Coaching from './mypage/teacher/page/T_Coaching';
import T_CoachingForm from './mypage/teacher/page/T_CoachingForm';

import Sidebar from './mypage/user/common/Sidebar';
import SidebarAdmin from './mypage/admin/common/Sidebar';
import SidebarTeacher from './mypage/teacher/common/Sidebar';

import './MypageRoute.css';
import MyAddress from './mypage/user/page/MyAddress';
import addAddress from './mypage/user/page/addAddress';
import UpdateAddress from './mypage/user/page/UpdateAddress';
import UpdateAddressAdmin from './mypage/user/page/UpdateAddressAdmin';

import WriteBoard from './components/board/Writeboard';
import BoardList from './components/board/BoardList';
import ViewBoard from './components/board/Viewboard';
import ModifyBoard from './components/board/ModifyBoard';

function MypageRoute() {

  return (
    <>
    <div className='myhome-mainbar' ></div>
    <div className='myhome-container'>
      <div className='myhome-wrap'>
        {sessionStorage.getItem('classification')==='0' ? <SidebarAdmin/> :
         sessionStorage.getItem('classification')==='1' ? <Sidebar/>:
         <SidebarTeacher/>
        }
        <main>
          <Route path='/Writeboard' component={WriteBoard} />
          <Route path='/myhome' exact component={MyHome}/>
          <Route path='/myhome/edit' component={Edit}/>
          <Route path='/myhome/myAddress' component={MyAddress}/>
          <Route path='/myhome/addAddress' component={addAddress}/>
          <Route path='/myhome/UpdateAddress/:addr_receiver' component={UpdateAddress}/>
          <Route path='/myhome/UpdateAddressAdmin/:params' component={UpdateAddressAdmin}/>
          <Route path='/myhome/myDiet' component={MyDiet}/>
          <Route path='/myhome/myLesson' component={MyLesson}/>
          <Route path='/myhome/myOrder' component={MyOrder}/>
          <Route path='/myhome/myCart' component={MyCart}/>
          <Route path='/admin' exact component={Admin}/>
          <Route path='/admin/notice' component={Notice}/>
          <Route path='/admin/product' component={Product}/>
          <Route path='/admin/lesson' component={Lesson}/>
          <Route path='/teacher' exact component={Teacher}/>
          <Route path='/teacher/lesson' exact component={T_Lesson}/>
          <Route path='/teacher/signuplist' exact component={T_SignUpList}/>
          <Route path='/teacher/coaching' exact component={T_Coaching}/>
          <Route path='/teacher/coachingform/:board_code/:user_id' exact component={T_CoachingForm}/>
        </main>
      </div>
    </div>
    </>
      
  );
}

export default MypageRoute;