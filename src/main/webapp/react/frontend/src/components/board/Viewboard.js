
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './viewboard.css';
const ViewBoard = () => {
    const baseUrl = "http://localhost:8090";
    const [board, setBoard] = useState({});
    const { board_code } = useParams();



    useEffect(() => {


        async function call() {
            await axios
                .get(baseUrl + '/board/viewBoard', { params: { board_code: board_code } })
                .then((response) => {
                    setBoard(response.data);



                })
                .catch((error) => {
                    console.log(error);
                })
        }

        call();

    }, [board_code,]);


    const joinBtn = async () => {
   
        console.log("user_id: " + sessionStorage.getItem('user_id'))
        console.log("board_code : " + board.board_code)
        console.log("teacher_id : " + board.user_id)

        await axios
            .get(baseUrl + "/board/joinBoard", {
                params:
                {
                    board_code: board_code,
                    user_id: sessionStorage.getItem('user_id'),
                    teacher_id: board.user_id
                }
            }

            ).then((response) => {
                alert(response.data.message);




            })

            .catch((error) => {
                alert("프로그램은 한개만 신청이 가능합니다.")


            })

    }


    const modifyBtn = async () => {
        alert("해당 글을 수정하시겠습니까?")
        document.location.href = `/board/modifyBoard/${board.board_code}`;

    }



    const delBtn = async () => {
        alert("정말 삭제하시겠습니까? ")


        await axios
            .get(baseUrl + "/board/delBoard", {
                params:
                {
                    board_code: board_code,

                }
            }

            ).then(() => {
                document.location.href = '/board/list';

            })

            .catch((error) => {



            })

    }


    let codes = board.board_content;
    return (


        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div class="first_div">
                <div class="firimg_div">
                    <div class="secimg_div">

                        <img class="head_img" src={`${baseUrl}/download?board_code=${board_code}&imageFilename=${board.imageFilename}`} alt={board.imageFilename} />

                    </div>
                </div>
                <div class="content_box">
                    <div class="title_box">{board.board_title}</div>
                    <div class="event">
                        <div class="event_div_1">
                            <div class="zzsik">ZZASIK</div>
                            <br />
                            <div class="evenet_div_2"><p class="temp_3">가격</p><p class="temp_4">{board.board_price}원</p></div>
                            <div class="evenet_div_2"><p class="temp_3">카드혜택</p><p class="temp_4">무이자할부 최대 6개월</p></div>
                            <div class="evenet_div_2"><p class="temp_3">제공</p><p class="temp_4">맞춤플랜 + 1:1피드백</p></div>
                            <div class="evenet_div_2"><p class="temp_3">유형</p><p  class="temp_4">{board.meal_type}</p></div>
                            <div class="evenet_div_2"><p class="temp_3">코치</p><p   class="temp_4">{board.teacher_name}강사님</p></div>


                            <div>
                                {
                                    board.user_id === sessionStorage.getItem('user_id')
                                        ?
                                        <>  <div class="join_btn"><button class="join_btn" onClick={modifyBtn}>수정하기</button></div>
                                            <div class="join_btn"><button class="join_btn" onClick={delBtn}>삭제하기</button></div>
                                        </>

                                        : <div class="join_btn"><button class="join_btn" onClick={joinBtn}>신청하기</button></div>
                                }
                            </div>

                            <br />
                            <br />






                        </div>




                    </div>

                    <div class="exp_box">
                        <div class="part_1">
                            <div class="exp_box_1">맞춤 커리큘럼</div>
                            <div class="exp_box_2">
                                <img class="zz" src='/img/calendar.png'  alt="preview" />
                                <div class="text_1">1주 식사플랜</div>
                                <br />
                                <div class="text_2">건강한 맞춤 식사 플랜제공</div>
                            </div>
                            <div class="exp_box_2">
                                <img class="zz" src='/img/phone.png'  alt="preview"/>

                                <div class="text_1">1:1 전화 코칭</div>
                                <br />
                                <div class="text_2">다이어트 솔루션 제공</div>
                            </div>
                        </div>
                        <div class="part_1">
                            <div class="exp_box_1">상담과 피드백</div>
                            <div class="exp_box_2">
                                <img class="zz" src='/img/survey.png'  alt="preview" />
                                <div class="text_1">진단 설문</div>
                                <br />
                                <div class="text_2">맞춤 커리큘럼<br></br>제작을 위한 설문</div>
                            </div>
                            <div class="exp_box_2">
                                <img class="zz" src='/img/paper.png' alt="preview"   />

                                <div class="text_1">일지</div>
                                <br />
                                <div class="text_2">수행 내용 점검과 <br></br>1:1 피드백</div>
                            </div>
                        </div>
                    </div>
                    <div class="asdasd">
                        <div dangerouslySetInnerHTML={{ __html: codes }}></div>

                    </div>
                </div>
            </div>



        </div>

    )


}

export default ViewBoard;