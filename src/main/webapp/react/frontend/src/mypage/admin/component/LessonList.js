import { useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import Pagination from "../../../components/notice/Pagination";

const LessonList = () => {
    const [ lessonList,setLessonList] = useState([]);
    const [ limit, setLimit] = useState(10);    //한 페이지당 표시할 게시물 개수
    const [ page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    useEffect(()=>{
        axios
        .get('/board/listBoards')
        .then((response)=>{
            console.log(response.data);
            setLessonList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);

    

    return (
        <div className="box table-section">
            <div className="box_header">
                <h2>코칭 서비스 목록</h2>
                <Link to='/' className='manage'>관리하기<img className="arrow" src='/img/arrow.png'/></Link>
            </div>
            <table class="tb" style={{cellspacing:"0",border:"1"}}>
                <colgroup>
                    <col width="40"/>
                    <col width="120"/>
                    <col width="40"/>
                    <col width="40"/>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">서비스코드</th>
                        <th scope="col">코칭서비스명</th>
                        <th scope="col">등록일</th>
                        <th scope="col">코치ID</th>
                    </tr>
                </thead>

                <tbody>
                    {lessonList.length===0 ?
                    <tr height="10">
                        <td colSpan="4">
                            <p style={{align:"center"}}>
                                <b><span style={{fontSize:"9pt"}}>등록된 코칭 서비스가 없습니다.</span></b>
                            </p></td>
                    </tr>
                    :
                    lessonList.slice(offset, offset + limit).map((lesson,key) => {
                        return(
                            <tr>
                                <td>{lesson.board_code}</td>
                                <td><Link to={`/notice/${lesson.board_code}`}>{lesson.board_title}</Link></td>
                                <td>{lesson.board_regdate}</td>
                                <td>{lesson.user_id}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            <footer>
            <Pagination
                total={lessonList.length}
                limit={limit}
                page={page}
                setPage={setPage}
            />
            </footer>
        </div>
    )
}

export default LessonList;