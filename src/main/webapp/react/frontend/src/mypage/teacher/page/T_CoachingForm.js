//코칭 하기 버튼 클릭시 나타남(전문가)
/*eslint-disable*/
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState,useLayoutEffect} from "react";
import './T_CoachingForm.css';
import { Link } from "react-router-dom";
 
import moment from 'moment';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { AnimatedCircle } from './App.styles.js';
import zIndex from "@material-ui/core/styles/zIndex";
import { red } from "@material-ui/core/colors";
import { baseUrl } from '../../../config'
   
    
export default function T_CoachingForm() {
 
     

    const [editorState, setEditorState] = useState(EditorState.createEmpty());


    const onEditorStateChange = (editorState) => {

        setEditorState(editorState);
    };


    const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  
    const { board_code } = useParams();
    const { user_id } = useParams();
    const [userdetail, setUserdetail] = useState('');
    const [board, setBoard] = useState(String);
   


    const [breakfast, setbreakfast] = useState(userdetail.breakfast);
    const [Lunch, setLunch] = useState(userdetail.Lunch);
    const [dinner, setdinner] = useState(userdetail.dinner);
    const [snack_1, setsnack_1] = useState(userdetail.snack_1);
    const [snack_2, setsnack_2] = useState(userdetail.snack_2);
    const [calorie, setcalorie] = useState(userdetail.calorie);
    const [userAnswer, setUserAnswer] = useState(String);


    // const nowmonth = String(moment().format('YYYY-MM-DD'));
    // const date_change = moment(userdetail.start_date).format('YYYY-MM-DD'); //시작 날짜 Date Type으로 변환
    // const period = parseInt(board.board_period); // 기간 type String -> int로 변환
    // const [endDate, setEndDate] = useState(Date);
    // const [countDay, setCountDay] = useState(0);
    // const [percentage, setPercentage] = useState(0);// eslint-disable-line no-unused-vars
    // const Dday = period - countDay + 1 //일자 
    // const userAnswerDay = Dday-1;
    // const [isLoading, setLoad] = useState(true); 

    const nowmonth = String(moment().format('YYYY-MM-DD'));
    const date_change = moment(userdetail.start_date).format('YYYY-MM-DD'); //시작 날짜 Date Type으로 변환
    const period = parseInt(board.board_period); // 기간 type String -> int로 변환
    const [endDate, setEndDate] = useState(Date);
    const [countDay, setCountDay] = useState(0);
    const [percentage, setPercentage] = useState(0);// eslint-disable-line no-unused-vars
 
    const Dday = period - countDay + 1 //일자 
    const userAnswerDay = Dday-1;




  
  
    useEffect(() => {
        console.log("userdetail입니다")
        function call() { 
         
             axios
                .get(baseUrl + '/board/userdetail', { params: { 
                    user_id: user_id, 
                    board_code: board_code } }) 
                .then((response) => {
                     console.log(response.data)
                    

                    setUserdetail(response.data[0]);
                   

                    // console.log("date_change :" + date_change);
                    // console.log("period :" + period);
                    // setEndDate(moment(date_change).add(period, "d").format("YYYY-MM-DD"));

                    // // console.log(endDate); //2022-04-15 
                    // // console.log(countDay);
                    // setCountDay(moment(endDate).diff(moment(nowmonth), 'days'));
                    // setPercentage((period - countDay + 1) / period);
                    
                })
                .catch((error) => {
                    console.log(error);
                })

                
               return userdetail;
        }
        call();
       
    } ,[]);

    
   
    useEffect(() => {
        console.log("viewBoard 입니다")
        
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

    },[]);

    useEffect(() => {
        console.log("userMessage입니다")
        console.log(period)
        console.log(countDay)
        async function call() {
             axios
                .get(baseUrl + '/board/userMessage', { 
                    params: { 
                    board_code: board_code ,
                    coaching_num : userAnswerDay,
                    user_id : user_id
                } })
                .then((response) => {
                    console.log(response.data[0].user_answer)
                    setUserAnswer(response.data[0].user_answer)
                   
           
                   
                   
                })
                .catch((error) => {
                    console.log(error);
                })

        }
        call();

    },);


    useEffect (()=>{
            setEndDate(moment(date_change).add(period, "d").format("YYYY-MM-DD"));

    
            // console.log(endDate); //2022-04-15 
            // console.log(countDay);
    
            setCountDay(moment(endDate).diff(moment(nowmonth), 'days'));
    
            setPercentage((period - countDay + 1) / period);
             console.log("layout 입니다")
        
    
            console.log("^^")
        },[date_change,period,endDate,nowmonth,countDay]);

   



    function dountList() {
        const donut = () => (
            <div class="donut_div"style={{ marginTop: '50px', marginLeft: '50px' }}>
              
                
                <div style={{ width: '200px', height: '200px' }}>
                <div class="hidden_div">{percentage.toFixed(2)}%</div>
                    <svg viewBox="0 0 200 200">
                    
                        <circle cx="100" cy="100" r="90" fill="none" stroke="beige" strokeWidth="20" />
                        
                        <AnimatedCircle
                            cx="100"
                            cy="100"
                            r="90"
                            fill="none"
                            stroke="green"
                            strokeWidth="20"
                            strokeDasharray={`${2 * Math.PI * 90 *percentage} , ${(2* Math.PI * 90 )-(2 * Math.PI * 90 * (percentage))}`}// 데이터 해당 길이, 원의 전체 둘레 - 해당 데이터 둘레길이
                             strokeDashoffset={2 * Math.PI * 90 *0.25}
                             
                           
                        />
                   
                         
                    </svg>
                   
                </div>
                
            </div>
        );
        return donut()
    }


    //글쓰기 버튼 
    const writeBtn = async () => {
        const formData = new FormData();
        formData.append("coaching_num", period - countDay + 1);
        formData.append("breakfast", breakfast);
        formData.append("Lunch", Lunch);
        formData.append("dinner", dinner);
        formData.append("snack_1", snack_1);
        formData.append("snack_2", snack_2);
        formData.append("calorie", calorie);
        formData.append("coaching_answer", editorToHtml);
        formData.append("user_id", user_id);
        formData.append("board_code", board_code);




        await axios
            .post(baseUrl + "/board/coachingAnswer", formData, {
                headers: { "Content-Type": "multipart/form-data; boundary=${formData._boundary" }

            }

            ).then((response) => {
               



            })

            .catch((error) => {
                alert(error);

            })

    }

    

    return (
        <>

            <h1 className="myhome-title">코칭 하기</h1> 
            <div className='content'>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className='box smallbox'>
                        <div className='box_header'>
                            <h2>회원 정보</h2>
                           
                            <div class="donut_div">
                                {dountList()}
                                <br />
                            </div>
                        </div>

                        <div class="content_div_1">
                           
                            <div><p herf="{() =>false}"class="text_b">{userdetail.user_name}</p></div>

                            <div><p  class="text_a">이메일   :{userdetail.email}</p></div>
                            <div><p  class="text_a">시작날짜   :{userdetail.start_date}</p></div>



                            <div><p class="text_a">종료일자   :{endDate}</p> </div>

                           
                        </div>

                    </div>
                    <div className='box smallbox'>
                        <div className='box_header'>
                            <h2>회원 수행 메시지</h2>
                        </div> 
                        {Dday== 1 ?
                        <div class="noMessage">메시지가 없습니다.</div>
                        :
                         <div class="userAnswer">{userAnswer}</div>
                        }  


                    
                        

                 
                 

                    </div>
                </div> 
                <div className='box coachform'>
                    <div class="coaching_div_1" className='box_header'>
                        <h2>코칭 글 작성</h2>
                 


                      
                    </div>

 

                    <div class="countDay"><p class="st_day">Day{Dday}</p></div>
                    <div class="Coaching_div">
                        <div class="temp_4"><p class="temp_5">아침</p><p  class="temp_6" ><input class="temp_input" onChange={(e) => { setbreakfast(e.target.value) }}></input></p></div>
                        <div class="temp_4"><p class="temp_5">점심</p><p class="temp_6" ><input class="temp_input" onChange={(e) => { setLunch(e.target.value) }}></input></p></div>
                        <div class="temp_4"><p class="temp_5">저녁</p><p class="temp_6" ><input class="temp_input" onChange={(e) => { setdinner(e.target.value) }} ></input></p></div>
                        <div class="temp_4"><p class="temp_5">간식</p><p class="temp_6" ><input class="temp_input" onChange={(e) => { setsnack_1(e.target.value) }}></input></p></div>
                        <div class="temp_4"><p class="temp_5">기타</p><p class="temp_6" ><input class="temp_input" onChange={(e) => { setsnack_2(e.target.value) }} ></input></p></div>
                        <div class="temp_4"><p class="temp_5">총 칼로리</p><p class="temp_6" ><input class="temp_input" onChange={(e) => { setcalorie(e.target.value) }}></input></p></div>
                        <div class="comment"><p class="temp_5">코멘트</p>
                        
                        <p class="temp_7" >
                        <Editor
                            // 에디터와 툴바 모두에 적용되는 클래스
                            wrapperClassName="edit_all"
                            // 에디터 주변에 적용된 클래스
                            editorClassName="editor_out"
                            // 툴바 주위에 적용된 클래스
                            toolbarClassName="toolbar-class"
                            // 툴바 설정
                            toolbar={{
                                // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true }, 
                                history: { inDropdown: false },
                            }}
                            placeholder="내용을 작성해주세요."
                            // 한국어 설정
                            localization={{
                                locale: 'ko',
                            }}
                            // 초기값 설정
                            editorState={editorState}
                            // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
                            onEditorStateChange={onEditorStateChange}
                        />
                            </p>
                            </div>
                            <Link class="wriBtn"to="/teacher/coaching" onClick={writeBtn}><button class="click">글쓰기</button></Link>
                    </div>
                    




                </div>
               
                
            </div>
           


        </>
    );

} 