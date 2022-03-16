import './MyHome.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Modal from './Modal';

/* 마이페이지 */
export default function MyHome(){

    const baseUrl = "http://localhost:8090";
    
    const user_id = sessionStorage.getItem("user_id");
    const user_name = sessionStorage.getItem("user_name");

    var userType;
    if(sessionStorage.getItem('classification')==1) userType = "회원";
    else userType = "코치";


    const [modalOn , setModalOn] = useState(false);
    const onOpenModal = ()=>{
        setModalOn(!modalOn);
    }

    const deleteId = async() => {
        
        await axios
         .post(baseUrl + '/member/deleteId',  {user_id:user_id})
         .then( (response) => {
             sessionStorage.removeItem('user_name');
             sessionStorage.removeItem('success');
             sessionStorage.removeItem('user_id');
             sessionStorage.removeItem('phone');
             sessionStorage.removeItem('classification');
             sessionStorage.removeItem('survey_code');
             alert('탈퇴가 완료 되었습니다. 그 동안 감사했습니다.');
            document.location.href='/member/login';
         })
         .catch((error)=> {
            console.log(error);
        })

    }

    const Modal  = (props) => {
        const { children, onClick } = props;

        return (
            
            <div className="modal"> 
                        <div className="bg"></div>
                         <div className="modalBox"> 
                            <p> 회원 탈퇴 하시겠습니까? </p> 
                            <button className="closeBtn" onClick={deleteId}>예</button> 
                            <button className="closeBtn" onClick={onOpenModal}>아니오</button> 
                        </div> 
            </div>
          )
    }


    
    return (
        <div>
            <h1 className="myhome-title">마이페이지</h1>
            <div className='content'>
                <div className='box profile'>
                    <div className='box_header'>
                        <h2>내 정보</h2>
                        <Link to='/myhome/edit' className='manage'>내 정보 수정<img className="arrow" src='/img/arrow.png'/></Link>
                    </div>
                    <div className="profile_content">
                        <img src='/img/profile.png'/>
                        <p style={{fontSize:17,fontWeight: 600,margin:20}}>{user_name}</p>
                        <span>{userType}님 반갑습니다!</span>
                    </div>
                </div>
                <button className='delAccount' onClick={onOpenModal} >회원 탈퇴</button>
                {modalOn ? <Modal ></Modal> : ''}
                
                <please />
            </div>
        </div>
    );

}