import { useEffect, useRef } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './SignUpList.css';

//신청 내역
const SignUpList = () => {

 

    const baseUrl = "http://localhost:8090";
    const [signupList, setSignUpList] = useState([]);
    const [teacherBoard, setTeacherBoard] = useState([]);
    const [selectBox, setselectBox] = useState([]);
    const user_id = sessionStorage.getItem("user_id");
    const [usersubit, setUsersubit] = useState([]);
    const [userlist, setUserList] = useState([]);
    const [Selected, setSelected] = useState("");





    /* 신청 내역 가져오기 */
    useEffect(() => {
        async function call() {
            await axios
                .get(baseUrl + "/board/teacherBoard", { params: { user_id: sessionStorage.getItem('user_id') } })
                .then((response) => {
                    console.log(response.data);
                    setTeacherBoard(response.data);
                    console.log(setTeacherBoard.board_code)

                })
                .catch((error) => {
                    console.log(error);
                })
        }


        call();


    }, []);

//수강인원 검색버튼
    const search_btn = async () => {
        var i = 0;
        var search_boardNum = "";
        var index = selectBox.indexOf("]");
        search_boardNum = selectBox.substring(1, index);
        // console.log(search_boardNum);
        //회원목록 조회
        await axios
            .get(baseUrl + "/board/searchboard", {
                params:
                {
                    board_code: search_boardNum,

                }
            }

            ).then((response) => {
             
                setUserList(response.data)
                for (i = 0; i < response.data.length; i++) {
                    setUsersubit(response.data[i].user_id);
                    console.log(i+"번:"+response.data[i].user_id)


                }

            })

            .catch((error) => {
                console.log(error)
                alert("조회된 데이터가 없습니다.");



            })
        };


            


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


    

    //수강확인 버튼 
    const onClickHandler = (name) =>{
        var i = 0;
        var search_boardNum = "";
        var index = selectBox.indexOf("]");
        search_boardNum = selectBox.substring(1, index);
     
        console.log(name)
        console.log(search_boardNum)

        axios
            .get(baseUrl + "/board/subinsert", {
                params:
                {
                    user_id: name,
                    board_code:search_boardNum
                        
                   



                }
            }

            ).then((response) => {
                document.location.href = '/'
                alert("승인완료")





            })

            .catch((error) => {
                console.log(error)




            })
    };


   
    return (
        <>
            <div className="box_header">
                <h2>신청 내역</h2>

            </div>
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
                        <th scope="col">신청인</th>
                        <th scope="col">신청 날짜</th>
                        <th scope="col">승인 여부</th>
                        <th scope="col"></th>
                    </tr>
                </thead>


                {userlist.length === 0 ?
                    <tbody>
                        <tr height="10">
                            <td colSpan="4">
                                <p style={{ align: "center" }}>
                                    <b><span style={{ fontSize: "9pt" }}>신청 내역이 없습니다.</span></b>
                                </p></td>
                        </tr>
                    </tbody>
                    :
                    userlist.map((user,key)=>{
                        return(
                        <tbody>
                            <tr>
                                <td>{user.user_id}</td>
                                <td>날짜</td>
                                <td>미 승인</td>
                                <td>
                                    <button onClick={e =>onClickHandler(user.user_id)}>승인</button></td>
                                    <input type="hidden"value={user.user_id}></input>
                            </tr>
                        </tbody>



                            )
                    })
                   
                }

            </table>

        </>
    )
}

export default SignUpList;