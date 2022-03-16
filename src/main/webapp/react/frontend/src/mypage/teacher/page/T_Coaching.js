import { useEffect, useRef } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';

//코칭 하기(전문가)
export default function T_Coaching(){
    const baseUrl = "http://localhost:8090";
    const [signupList,setSignUpList] = useState([]);
    const user_id = sessionStorage.getItem("user_id");

    return (
        <>
        <h1 className="myhome-title">코칭 하기</h1>
        <div className='content'>
            <div className='box table-section'>
            <table class="tb" style={{cellspacing:"0",border:"1"}}>
                <colgroup>
                    <col width="150"/>
                    <col width="40"/>
                    <col width="40"/>
                    <col width="40"/>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">회원</th>
                        <th scope="col">시작 날짜</th>
                        <th scope="col">종료 날짜</th>
                        <th scope="col">코칭</th>                  
                    </tr>
                </thead>

                <tbody>
                    {signupList.length===0 ?
                    <tr height="10">
                        <td colSpan="4">
                            <p style={{align:"center"}}>
                                <b><span style={{fontSize:"9pt"}}>수강중인 회원이 없습니다.</span></b>
                            </p></td>
                    </tr>
                    :
                    signupList.map((list,key) => {
                        return(
                            <tr>
                                <td>{}</td>
                                <td>{}</td>
                                <td>{}</td>
                                <td><button><Link to="/teacher/coachingform">코칭하기</Link></button></td>
                            </tr>
                        )
                    })
                    }
                    <button><Link to="/teacher/coachingform">코칭하기임시버튼</Link></button>
                </tbody>
            </table>
                
            </div>
        </div>
    </>
    );

}