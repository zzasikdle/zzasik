import { useEffect } from "react";
import axios from 'axios';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Pagination from "./Pagination";

const NoticeList = () => {
    const [ noticeList,setNoticeList] = useState([]);   //공지사항 리스트
    const limit= 10;    //한 페이지당 표시할 게시물 개수
    const [ page, setPage] = useState(1);
    const offset = (page - 1) * limit;



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
        <>
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
                    noticeList.slice(offset, offset + limit).map((notice,key) => {
                        return(
                            <tr>
                                <td id='notice_code'>{offset+key+1}</td>
                                <td id='notice_title'><Link to={`/notice/${notice.notice_code}`}>{notice.notice_title}</Link></td>
                                <td id='notice_regdate'>{notice.notice_regdate}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            <footer>
            <Pagination
                total={noticeList.length}
                limit={limit}
                page={page}
                setPage={setPage}
            />
        </footer>
        </>
    )
}

export default NoticeList;