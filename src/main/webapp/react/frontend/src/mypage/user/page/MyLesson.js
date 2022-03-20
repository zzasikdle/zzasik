/*eslint-disable*/

import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { baseUrl } from "../../../config";

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import moment from 'moment';
import { AnimatedCircle } from '../../teacher/page/App.styles';

//jquery 추가
import $ from "jquery";

export default function MyLesson(){
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [userBoardList, setUserBoardList] = useState([]); //유저가 신청한 코칭 서비스 리스트
    const [currentBoard,setCurrentBoard] = useState([]); //현재 선택된 코칭 서비스(BoardVO)
    const [mealList,setMealList] = useState([]); //식단 리스트
    const [dayCount,setDayCount] = useState(1); //몇일차 인지 저장하는 변수 
    const [startdate,setStartDate] = useState(Date); //코칭 서비스 시작 날짜
    const [endDate, setEndDate] = useState(Date); //코칭 서비스 종료 날짜
    const [isExist,setIsExist] = useState(false); //신청한 코칭 서비스 존재하는 지
    const [nDayMeal,setNDayMeal] = useState([]); //선택한 n일차 식단 정보
    const [n,setN] = useState();
    const user_id = sessionStorage.getItem('user_id');

    /* 유저가 신청한 서비스 모두 가져오기 */
    useEffect(() => {  
      axios
        .get(baseUrl+"/board/userBoardList", { params: { user_id: sessionStorage.getItem('user_id') } })
        .then((response) => {
            if(response.data.length!==0){
                setIsExist(true);
                setUserBoardList(response.data); 
                setCurrentBoard(response.data[0]);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    /* 에디터 */
    const onEditorStateChange = (editorState) => {
      // editorState에 값 설정
      setEditorState(editorState);
    };

    const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  
    const openSendModal = async() => {    
        $(".j_modal").attr("style","display:block");
        $(".send_content").css({
                "top": (($(window).height()-$(".send_content").outerHeight())/2+$(window).scrollTop())+"px",
                "left": (($(window).width()-$(".send_content").outerWidth())/2+$(window).scrollLeft())+"px"
                //팝업창을 가운데로 띄우기 위해 현재 화면의 가운데 값과 스크롤 값을 계산하여 팝업창 CSS 설정     
        });    

    }

    $("#btn_close_modal").on("click",function(){
        $(".j_modal").attr("style","display:none");
    });
    $("#meal_close").on("click",function(){
        $(".meal_modal").attr("style","display:none");
    });
    

     //코칭 서비스 선택 시, 표시되는 내용 바뀜
     const onChangeOption = () => {
        var optVal = $(".userboard-select option:selected").val();

        if(optVal==="default"){
            $(".content").attr("style","display:none");
            return false;
        }

        $(".content").attr("style","display:block");

        
        axios
        .get(baseUrl+"/board/viewBoard", { params: { board_code: optVal } })
        .then((response) => {
            setCurrentBoard(response.data);
            getMealInfo(optVal);
            getStartDate(optVal,response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    //코칭 서비스 시작 날짜 가져오기
    const getStartDate = (board_code,board) => {
        axios
        .get(baseUrl+"/board/startdate", {
             params: {
                user_id : user_id,
                board_code: board_code,
                } 
        })
        .then((response) => {
            setStartDate(response.data.start_date);
            console.log(board.board_period);
            setEndDate(moment(startdate).add(board.board_period, "d").format("YYYY-MM-DD"));
            setDayCount(dateDiff(response.data.start_date,new Date()));

        })
        .catch((error) => {
            console.log(error);
        })
    }

    //몇일차인지 계산하는 함수
    function dateDiff(_date1, _date2) {
        var diffDate_1 = _date1 instanceof Date ? _date1 :new Date(_date1);
        var diffDate_2 = _date2 instanceof Date ? _date2 :new Date(_date2);
     
        diffDate_1 =new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
        diffDate_2 =new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
     
        var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
        diff = Math.ceil(diff / (1000 * 3600 * 24));
     
        return diff + 1;
    }

    function dountList() {
        var per = dayCount/currentBoard.board_period;
        console.log(currentBoard.board_period+" "+dayCount+" "+per);
        const donut = () => (
            <div style={{ marginLeft: '50px' }}>
                <div style={{ width: '100px', height: '100px' }}>
                    <svg viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="90" fill="none" stroke="beige" strokeWidth="20" />
                        <AnimatedCircle
                            cx="100"
                            cy="100"
                            r="90"
                            fill="none"
                            stroke="green"
                            strokeWidth="20"
                            strokeDasharray={`${2 * Math.PI * 90 * per} ${2 * Math.PI * 90 * (1-per)}`}
                            strokeDashoffset={140}
                        />
                    </svg>
                </div>
            </div>
        );
        return donut()
    }

    

    //coachingtbl에 등록된 식단 가져오기 
    const getMealInfo = (board_code) => {
        axios
        .get(baseUrl+"/board/mealinfo", {
             params: {
                user_id : user_id,
                board_code: board_code,
                coaching_num: dayCount
            } 
        })
        .then((response) => {
            setMealList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // 메시지 보내기
    const onClickSend = () => {
        if(window.confirm( "코치에게 작성한 메시지를 보내시겠습니까?")){
        //글 서버로 보내기
         axios 
            .get(baseUrl+'/board/sendtocoach',{
                params:{
                user_id : user_id,
                board_code : currentBoard.board_code,
                coaching_num : dayCount,
                useranswer: editorToHtml
                }
            })
            .then(()=>{
            alert("코치에게 메시지를 보냈습니다!");
            $(".j_modal").attr("style","display:none");
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else return false;
  };

    //취소 버튼 클릭 시 작동
    const onClickCancel = () => {
        setEditorState("");
        $(".j_modal").attr("style","display:none");
    };

    const onClickDayBtn = (meal,key) => {
        setN(key);
        setNDayMeal(meal);
        $(".meal_modal").attr("style","display:block");
    }

    const onClickDayCancel = () => {
        $(".meal_modal").attr("style","display:none");
    };


    return (
        <>
        {isExist === true ? 
        <>
            <h1 className="myhome-title">나의 코칭 서비스
            <select class="userboard-select" onChange={onChangeOption}>
                <option value="default">코칭서비스를 선택해주세요.</option>
                {userBoardList.map((board,key) => {
                        return(
                            <option value={board.board_code}>[{board.board_code}]{board.board_title}</option>
                        )
                    })}
            </select>
            </h1>
            {currentBoard.length !== 0 ? 
            <>
            <div className='content' style={{display:"none"}}>
                <div style={{display:"flex",flexDirection:"row"}}>
                    <div className='box smallbox'>
                        <div className='box_header'>
                            <h2>내가 수강중인 서비스</h2>
                        </div>
                        {mealList.length!==0 ? 
                        mealList[0].breakfast!==null ?
                        <div className="meal-table">
                        <tr>
                        <th><div className="thcell">서비스명</div></th>
                        <td><div className="tdcell"><p className="contxt_desc">{currentBoard.board_title}</p></div></td>
                        </tr>
                        <tr>
                        <th><div className="thcell">기간</div></th>
                        <td><div className="tdcell"><p className="contxt_desc">{startdate} ~ {endDate}</p></div></td>
                        </tr>
                        <tr>
                        <th><div className="thcell">진행률</div></th>
                        <td><div className="tdcell" style={{width:140,height:140}}>{dountList()}</div></td>
                        </tr> 
                        </div>
                        :<p style={{margin:"150px auto",color:"#F9B514",fontWeight:700}}>코칭 서비스 승인 대기 상태입니다</p>
                        :<p style={{margin:"150px auto",color:"#F9B514",fontWeight:700}}>코칭 서비스 승인 대기 상태입니다</p>}
                    </div>
                    <div className='box smallbox'>
                        <div className='box_header'>
                            <h2>진행된 식단</h2>
                        </div>
                        <div className="buttonlist">
                            <ul>{
                            mealList.length !== 0 ?
                                mealList.map((meal,key)=>{
                                if(key===0&&meal.breakfast===null) return <p style={{margin:"150px auto",color:"#F9B514",fontWeight:700}}>아직 진행된 식단이 없습니다</p>;
                                else if(key+1===dayCount) return false;
                                return(
                                    <li class="item"><button className="dayBtn" onClick={()=>onClickDayBtn(meal,key+1)}>{key+1}일차</button></li>
                                    )
                                })
                                :
                                <p style={{margin:"150px auto",color:"#F9B514",fontWeight:700}}>아직 진행된 식단이 없습니다</p>
                        } 
                            </ul>
                        </div>
                    </div>
                </div>
                {mealList.length!==0 ?
                mealList[0].breakfast !== null ?
                <div className="box table-section" style={{width:870,margin:"50px auto"}}>
                    <div className='box_header'>
                            <h2 style={{display:"flex",flexDirection:"row"}}>오늘의 식단<p className="day">{dayCount}일차</p></h2>
                    </div>
                    {mealList.length === dayCount ?
                        mealList.map((meal,key)=>{
                        if((key+1)!==dayCount) return false;
                        return(
                            <>
                            <div className="meal-table">
                            <tr>
                                <th><div className="thcell">아침</div></th>
                                <td><div className="tdcell"><p class="contxt_tit" >{meal.breakfast}</p></div></td>
                            </tr>
                            <tr>
                                <th><div className="thcell">점심</div></th>
                                <td><div className="tdcell"><p class="contxt_tit" >{meal.lunch}</p></div></td>
                            </tr>
                            <tr>
                                <th><div className="thcell">저녁</div></th>
                                <td><div className="tdcell"><p class="contxt_tit" >{meal.dinner}</p></div></td>
                            </tr>
                            <tr>
                                <th><div className="thcell">간식</div></th>
                                <td><div className="tdcell"><p class="contxt_tit" >{meal.snack_1}&emsp;{meal.snack_2}&emsp;{meal.snack_3}</p></div></td>
                            </tr>
                            <tr>
                                <th><div className="thcell">총칼로리</div></th>
                                <td><div className="tdcell"><p class="contxt_tit" >{meal.calorie}kcal</p></div></td>
                            </tr>
                            <tr>
                                <th><div className="thcell">코멘트</div></th>
                                <td><div className="tdcell"><p class="contxt_tit" dangerouslySetInnerHTML={{__html: meal.coaching_answer}}></p></div></td>
                            </tr>
                            </div>
                            <div className="button-area">
                                    <button className="setting_btn green_bg" onClick={openSendModal} style={{float:"right"}}>코치에게 메시지 보내기</button>
                            </div>
                        </>)
                    })
                    :<p style={{margin:"100px auto 130px auto",color:"black"}}>아직 식단이 등록되지 않았습니다.</p>
                        
                }
                </div>
                :false
                :false
            }
                    
            </div>
            <div class = "j_modal">
                <div class= "send_content">
                    <div class= "modal_title">
                        <h3 style={{color:"black",fontSize:25,margin:17}}>메시지 보내기</h3>
                    </div>
                    <div style={{margin:50}}>
                    <Editor
                    wrapperClassName="wrapper-class"
                    editorClassName="send-editor"
                    toolbarClassName="toolbar-class"
                    toolbar={{
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: false },
                    }} 
                    placeholder="내용을 작성해주세요."
                    localization={{
                    locale: 'ko',
                    }}
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                />
                <button className="noticeBtn" onClick={onClickSend}>보내기</button>
                <button className="noticeBtn" onClick={onClickCancel} >취소</button>
                    </div>
                </div>	
                <div class="modal_layer"></div>
            </div>
            <div class = "meal_modal">
            <div class= "meal_modal_content">
                <div class= "modal_title">
                    <h3 style={{color:"black",fontSize:25,margin:"25px 40px"}}>{n}일차</h3>
                    <img src='/img/close.png' id="meal_close" style={{width:30,height:30,marginLeft:380}}/>
                </div>
                <div className="meal-table">
                            <tr>
                                <th><div className="thcell">아침</div></th>
                                <td><div className="tdcell"><p class="contxt_tit" >{nDayMeal.breakfast}</p></div></td>
                            </tr>
                            <tr>
                                <th><div className="thcell">점심</div></th>
                                <td><div className="tdcell"><p class="contxt_tit" >{nDayMeal.lunch}</p></div></td>
                            </tr>
                            <tr>
                                <th><div className="thcell">저녁</div></th>
                                <td><div className="tdcell"><p class="contxt_tit" >{nDayMeal.dinner}</p></div></td>
                            </tr>
                            <tr>
                                <th><div className="thcell">간식</div></th>
                                <td><div className="tdcell"><p class="contxt_tit" >{nDayMeal.snack_1}&emsp;{nDayMeal.snack_2}&emsp;{nDayMeal.snack_3}</p></div></td>
                            </tr>
                            <tr>
                                <th><div className="thcell">총칼로리</div></th>
                                <td><div className="tdcell"><p class="contxt_tit" >{nDayMeal.calorie}kcal</p></div></td>
                            </tr>
                            <tr>
                                <th><div className="thcell">코멘트</div></th>
                                <td><div className="tdcell"><p class="contxt_tit" dangerouslySetInnerHTML={{__html: nDayMeal.coaching_answer}}></p></div></td>
                            </tr>
                            </div>
            
            </div>	
            <div class="modal_layer"></div>
            </div>
            </>
            :false}
        </>
        :
        <>
        <h1 className="myhome-title">나의 코칭 서비스</h1>
        <div className="content">
               <div className="box" style={{height:300}}>
                 <p style={{fontSize:17,paddingTop:120}}>신청한 코칭 서비스가 없습니다. 코칭 서비스를 신청해주세요 !</p>
               </div>
        </div>
        </>

        }
        </>
    );
}