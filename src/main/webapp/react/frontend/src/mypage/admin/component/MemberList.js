import { useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import './MemberList.css';

const MemberList = () => {
    const [ memberList,setMemberList] = useState([]);

    useEffect(()=>{
        axios
        .get('/admin/listMembers')
        .then((response)=>{
            console.log(response.data);
            setMemberList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);

    return (
        <div className="box table-section">
            <div className="box_header">
                <h2>회원 목록</h2>
            </div>
            <table class="tb" style={{cellspacing:"0",border:"1"}}>
                <colgroup>
                    <col width="90"/>
                    <col width="40"/>
                    <col width="90"/>
                    <col width="100"/>
                    <col width="90"/>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">회원ID</th>
                        <th scope="col">이름</th>
                        <th scope="col">생일</th>
                        <th scope="col">주소</th>
                        <th scope="col">번호</th>
                    </tr>
                </thead>

                <tbody>
                    {memberList.length===0 ?
                    <tr height="10">
                        <td colSpan="5">
                            <p style={{align:"center"}}>
                                <b><span style={{fontSize:"9pt"}}>등록된 회원이 없습니다.</span></b>
                            </p></td>
                    </tr>
                    :
                    memberList.map((member,key) => {
                        return(
                            <tr>
                                <td id='id'>{member.user_id}</td>
                                <td id='name'>{member.user_name}</td>
                                <td id='birth'>{member.birth}</td>
                                <td id='addr_1'>{member.addr_1}</td>
                                <td id='phone'>{member.phone}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MemberList;