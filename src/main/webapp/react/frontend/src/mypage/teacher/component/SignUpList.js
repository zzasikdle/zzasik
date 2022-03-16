import { useEffect, useRef } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';

//신청 내역
const SignUpList = () => {

    const baseUrl = "http://localhost:8090";
    const [signupList,setSignUpList] = useState([]);
    const user_id = sessionStorage.getItem("user_id");


    /* 신청 내역 가져오기 */
    useEffect(()=>{
        /*
        axios
        .get('/teacher/signuplist',{
            user_id : user_id
          })
        .then((response)=>{
            console.log(response.data);
            setSignUpList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        */
    },[]);



    const handleClass = async(user_id) => {
       /* console.log(user_id);

        await axios
         .post(baseUrl + '', {
             user_id:user_id
         })
         .then( (response)=> {
             alert('승인이 완료되었습니다.');
             document.location.href='/teacher/signuplist'; 
         })
         .catch((error)=> {
             console.log(error);
         })
         */
    }


    return (
        <>
            <div className="box_header">
                <h2>신청 내역</h2>
            </div>
            <table class="tb" style={{cellspacing:"0",border:"1"}}>
                <colgroup>
                    <col width="150"/>
                    <col width="40"/>
                    <col width="40"/>
                    <col width="40"/>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">코칭 서비스</th>
                        <th scope="col">신청인</th>
                        <th scope="col">신청 날짜</th>
                        <th scope="col">승인 여부</th>                  
                    </tr>
                </thead>

                <tbody>
                    {signupList.length===0 ?
                    <tr height="10">
                        <td colSpan="4">
                            <p style={{align:"center"}}>
                                <b><span style={{fontSize:"9pt"}}>신청 내역이 없습니다.</span></b>
                            </p></td>
                    </tr>
                    :
                    signupList.map((list,key) => {
                        return(
                            <tr>
                                <td>{}</td>
                                <td>{}</td>
                                <td>{}</td>
                                <td><button onClick={() => handleClass(list.user_id)}>승인하기</button></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
                
        </>
    )
}

export default SignUpList;