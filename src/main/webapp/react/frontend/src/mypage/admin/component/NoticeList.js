import { useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import './MemberList.css';

const NoticeList = () => {
    const [ noticeList,setNoticeList] = useState([]);

    useEffect(()=>{
        axios
        .get('/notice')
        .then((response)=>{
            console.log(response.data);
            setNoticeList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);

    return (
        <div className="box table-section">
            <div className="box_header">
            <h2>공지 사항</h2>
            <Link to='/' className='manage'>관리하기<img style={{height:16,width:16,marginTop:5}} src='/img/arrow.png'/></Link>
            </div>
            <table class="tb" style={{cellspacing:"0",border:"1"}}>
                <colgroup>
                    <col width="40"/>
                    <col width="200"/>
                    <col width="40"/>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">글번호</th>
                        <th scope="col">제목</th>
                        <th scope="col">작성일</th>
                    </tr>
                </thead>

                <tbody>
                    {noticeList.length===0 ?
                    <tr height="10">
                        <td colSpan="3">
                            <p style={{align:"center"}}>
                                <b><span style={{fontSize:"9pt"}}>등록된 공지글이 없습니다.</span></b>
                            </p></td>
                    </tr>
                    :
                    noticeList.map((notice,key) => {
                        return(
                            <tr>
                                <td id='notice_code'>{notice.notice_code}</td>
                                <td id='notice_title'>{notice.notice_title}</td>
                                <td id='notice_regdate'>{notice.notice_regdate}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default NoticeList;