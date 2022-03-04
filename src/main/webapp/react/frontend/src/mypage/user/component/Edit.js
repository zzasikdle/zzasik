import './Edit.css';
import React, {useState} from 'react';
import { useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

/* 마이페이지 - 내 정보 수정 클릭 시 작동하는 함수 */
function Edit(){
    //로그인 연동 후 가져오기
   //const user_id = sessionStorage.getItem('user_id');
   const user_id = "hong";
   const [ userInfo,setUserInfo] = useState('');

   useEffect(()=>{
       axios 
       .get('/myhome',{
           params:{
               user_id: user_id
           }
       })
       .then((response)=>{
           console.log(response.data);
           setUserInfo(response.data);
       })
       .catch((error) => {
           console.log(error);
       })
   },[]);

   //회원가입 폼 가져오기 
   return (
        <>
           <h1>마이페이지</h1>
           <div className='box profile-edit'>
               <div className='box_header'>
                <h2>내 정보 수정</h2>
               </div>
               <label>이름 </label><input value={userInfo.user_name}/>
               <label>아이디 </label><input value= {userInfo.user_id}/>
               <label>생년월일</label><input value={userInfo.birth}/>
               <label>휴대폰 </label><input value={userInfo.phone}/>
               <label>이메일 </label><input value={userInfo.email}/>
           </div>
       </>
   );
}

export default Edit;