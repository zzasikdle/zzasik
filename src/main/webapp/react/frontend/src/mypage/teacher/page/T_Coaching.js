import { useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Pagination from "../../../components/notice/Pagination";
import './T_Coaching.css';
import { baseUrl } from '../../../config'
//코칭 하기(전문가)
export default function T_Coaching() {



    useEffect(() => {
        async function call() {
            await axios
                .get(baseUrl + "/board/teacherBoard", { params: { user_id: sessionStorage.getItem('user_id') } })
                .then((response) => {
                    console.log(response.data);
                    setTeacherBoard(response.data);


                })
                .catch((error) => {
                    console.log(error);
                })
        }


        call();


    }, []);

    const [signupList, setSignUpList] = useState([]);
    
 
    const [selectBox, setselectBox] = useState([]);
    const [teacherBoard, setTeacherBoard] = useState([]);
    const [board_code, setBoard_code] = useState([]);
 
    const [limit, setLimit] = useState(10); // eslint-disable-line no-unused-vars
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;




    function Boardlist() {
        var i = 0;
        var boardList = [];
        for (i = 0; i < teacherBoard.length; i++) {
            boardList.push(<option>[{teacherBoard[i].board_code}]{teacherBoard[i].board_title}</option>)

        }

        return (
            boardList
        )
    }

    const search_btn = async () => {

        var search_boardNum = "";
        var index = selectBox.indexOf("]");
        search_boardNum = selectBox.substring(1, index);
        setBoard_code(search_boardNum);
        // console.log(search_boardNum);
        //회원목록 조회
        await axios
            .get(baseUrl + "/board/coachingList", {
                params:
                {
                    board_code: search_boardNum,


                }
            }

            ).then((response) => {
                setSignUpList(response.data);




            })

            .catch((error) => {
                console.log(error)
                alert(error)



            })
    };

















    return (
        <>
            <h1 className="myhome-title">코칭 하기</h1>

            <div className="box_header">


            </div>

            <div className='content'>

                <div className='box table-section'>
                    <div class="head_h2">신청 내역</div>
                    <select class="Board_list_e" onChange={(e) => { setselectBox(e.target.value) }} >
                        <option >코칭서비스</option>
                        {Boardlist()}

                    </select>
                    <img class="search" src='/img/search_1.png' onClick={search_btn} alt="preview" />
                    <table class="tb" style={{ cellspacing: "0", border: "1" }}>

                        <colgroup>
                            <col width="150" />
                            <col width="40" />
                            <col width="40" />
                            <col width="40" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">회원</th>
                                <th scope="col">시작 날짜</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>


                        {signupList.length === 0 ?
                            <tbody>
                                <tr height="10">
                                    <td colSpan="4">
                                        <p style={{ align: "center" }}>
                                            <b><span style={{ fontSize: "9pt" }}>수강중인 회원이 없습니다.</span></b>
                                        </p></td>
                                </tr>
                            </tbody>
                            :
                            signupList.slice(offset, offset + limit).map((user, key) => {

                                return (

                                    <tbody>
                                        <tr>
                                            <td>{user.user_id}</td>
                                            <td>{user.start_date}</td>
                                            <td></td>

                                            <td><button class="coachingBtn"><Link to={`/teacher/coachingform/${board_code}/${user.user_id}`}>코칭하기</Link></button></td>

                                            <input type="hidden" value={user.user_id}></input>
                                        </tr>
                                    </tbody>



                                )
                            })
                        }
                         </table>
                        <footer>
                            <Pagination
                                total={teacherBoard.length}
                                limit={limit}
                                page={page}
                                setPage={setPage}
                            />
                        </footer>


                 

                </div>
            </div>
        </>
    );

}