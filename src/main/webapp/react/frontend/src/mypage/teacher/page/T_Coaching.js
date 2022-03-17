import { useEffect, useRef } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

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
    const baseUrl = "http://localhost:8090";
    const [signupList, setSignUpList] = useState([]);
    const user_id = sessionStorage.getItem("user_id");
    const [userlist, setUserList] = useState([]);
    const [selectBox, setselectBox] = useState([]);
    const [teacherBoard, setTeacherBoard] = useState([]);
    const [board_code, setBoard_code] = useState([]);

    
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
        var i = 0;
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
                <h2>신청 내역</h2>

            </div>

            <div className='content'>
                <div className='box table-section'>
                    <select class="Board_list" onChange={(e) => { setselectBox(e.target.value) }} >
                        <option >코칭서비스</option>
                        {Boardlist()}

                    </select>
                    <img class="search_img" src='/img/search_1.png' onClick={search_btn} />
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
                                <th scope="col">종료 날짜</th>
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
                                signupList.map((user,key)=>{
                                    return(
                                    <tbody>
                                        <tr>
                                            <td>{user.user_id}</td>
                                            <td>몰랑</td>
                                            <td>몰랑</td>
                                            <td>몰링</td>
                                            <td>
                                            <td><button><Link to={`/teacher/coachingform/${board_code}/${user.user_id}`}>코칭하기</Link></button></td>
                                              </td>
                                                <input type="hidden"value={user.user_id}></input>
                                        </tr>
                                    </tbody>
            
            
            
                                        )
                                })
                            }

                       
                    </table>

                </div>
            </div>
        </>
    );

}