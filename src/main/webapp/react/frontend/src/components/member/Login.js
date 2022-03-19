/*eslint-disable*/
import { baseUrl } from '../../config';
import './Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import {Button } from 'react-bootstrap';



const Login = ( ) => {
    
    

    const [user_id, setId] = useState(''); // state를 사용하는 이유: front 에서 정보를 저장하여 backend로 보내주기 위함.
    const [user_pwd, setPwd] = useState('');

    const handleId = (e) => {
        setId(e.target.value);
    }

    const handlePwd = (e) => {
        setPwd(e.target.value);
    }

    function handleSubmit(e) {
        
        const handleSubmit = async() => { //await 키워드가 비동기 코드를 호출할 수 있게 하기 위해서 async()로 함수를 먼저 비동기함수로 만든다.
            e.preventDefault();
            await axios
                .post(baseUrl+'/member/login', {user_id:user_id, user_pwd:user_pwd})
                .then((response)=>{
                    console.log(response.status);

                    if(response.data.success===true){
                        alert('로그인되었습니다.');
                        sessionStorage.setItem('user_name', response.data.user_name);
                        sessionStorage.setItem('success', response.data.success);
                        sessionStorage.setItem('user_id', response.data.user_id);
                        sessionStorage.setItem('phone', response.data.phone);
                        sessionStorage.setItem('classification', response.data.classification);
                        sessionStorage.setItem('survey_code', response.data.survey_code);
                        
                        document.location.href='/';
                    }else {
                        alert('존재하지 않는 아이디 또는 비밀번호 입니다.');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        handleSubmit();
        setId('');
        setPwd(''); // 로그인 후 빈칸으로 초기화 
    }
        
    return (
        <div className='loginForm'>
            <div className='login-div'>
                <div className='login-head'>
                <h4>로그인</h4>
                </div>
            <p><FontAwesomeIcon icon={faUser} className='login-icon' /> <input type="text" placeholder="ID" onChange={handleId} value={user_id} className="login-input" /></p>
            <p><FontAwesomeIcon icon={faLock} className='login-icon' /> <input type="password" placeholder="PW" onChange={handlePwd} value={user_pwd} className="login-input"/></p>
            <Button className="login-btn" onClick={handleSubmit}>LOGIN</Button>
            <Link to="/member/Join"><Button className="login-btn join">JOIN</Button></Link>

            </div>
        </div>
    );
};

export default Login;