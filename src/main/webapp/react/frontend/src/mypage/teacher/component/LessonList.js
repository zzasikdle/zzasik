/*eslint-disable*/
import { useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import './LessonList.css';
import Pagination from "../../../components/notice/Pagination";
import { baseUrl } from '../../../config'

const LessonList = () => {

    const [ teacherBoard, setTeacherBoard] = useState([]);
    const user_id = sessionStorage.getItem("user_id");
    const [ limit] = useState(10);    //한 페이지당 표시할 게시물 개수
    const [ page, setPage] = useState(1);
    const [isLoading, setLoad] = useState(true); 
    const offset = (page - 1) * limit; 

    
    
  
    /* 코칭 목록 가져오기 */
    useEffect(()=>{
        const  call = async () => {
            await axios
            .get(baseUrl + "/board/teacherBoard",{params:{user_id:sessionStorage.getItem('user_id')}})
                .then((response) => {
                    console.log(response.data);
                    setTeacherBoard(response.data);
                    setLoad(false);
                    console.log(teacherBoard)
                })
                .catch((error) => {
                    console.log(error);
                })
                };
    
           
            call();
        }, []);

        


    return (
        <>
            <div class="haed_div">
                <h2 class="head_title">나의 코칭 목록</h2>
            </div>
            {teacherBoard.length===0 ? 
            <div style={{padding:"100px 0"}}>등록된 코칭 서비스가 없습니다. 코칭 서비스를 등록해주세요 !</div>
            :
           
            teacherBoard.slice(offset, offset + limit).map((board,key) => {
                return( 
              <Link to={`/board/viewboard/${board.board_code}`}>
                    <ul key={key} >
                        <table>
                        <thead>
                       <tr>
                           <th>프로그램명</th>
                          
                       </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="boardTitle">{board.board_title}</td>
                             
                            </tr>
                        </tbody>
                        </table>

                    </ul>
                     </Link>
                     
                  
                )
            })
            }

            <footer>
            <Pagination
                total={teacherBoard.length}
                limit={limit}
                page={page}
                setPage={setPage}
                
            />
            </footer>
           <Link to={"/writeboard"}><div class="pathWriteBtn">글쓰기</div></Link>
                
        </>
    )
}

export default LessonList;