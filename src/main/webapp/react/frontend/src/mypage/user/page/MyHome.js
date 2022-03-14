import './MyHome.css';
import React from 'react';
import { Link } from 'react-router-dom';

/* 마이페이지 */
export default function MyHome(){

    //로그인 연동 후 가져오기
    const user_name = sessionStorage.getItem('user_name');

    return (
            <>
            <h1>마이페이지</h1>
            <div className='content'>
                <div className='box profile'>
                    <div className='box_header'>
                        <h2>내 정보</h2>
                        <Link to='/myhome/edit' id='edit'>내 정보 수정<img style={{height:17,width:17,marginBottom:3}} src='/img/arrow.png'/></Link>   
                    </div>
                    <div className="profile_content">
                        <img src='/img/profile.png'/>
                        <p style={{fontSize:17,fontWeight: 600,marginTop:10}}>{user_name}</p>
                        <span>회원님 반갑습니다!</span>
                    </div>
                </div>
                <button className='delAccount'>회원 탈퇴</button>
            </div>
            </>
    );
}