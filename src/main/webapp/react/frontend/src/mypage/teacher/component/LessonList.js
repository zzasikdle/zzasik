import { useEffect, useRef } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';

const LessonList = () => {

    const baseUrl = "http://localhost:8090";
    const [lessonList,setLessonList] = useState([]);
    const user_id = sessionStorage.getItem("user_id");


    /* 코칭 목록 가져오기 */
    useEffect(()=>{
        axios
        .get('/teacher/listLessons',{
            user_id : user_id
          })
        .then((response)=>{
            console.log(response.data);
            setLessonList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);


    return (
        <>
            <div className="box_header">
                <h2>나의 코칭 목록</h2>
            </div>
            {lessonList.length===0 ? 
            <div style={{padding:"100px 0"}}>등록된 코칭 서비스가 없습니다. 코칭 서비스를 등록해주세요 !</div>
            :
            <div>
                코칭 리스트~~
            </div>
            }
            <div className="button-area">
                <button className="setting_btn green_bg">등록하기</button>
            </div>
                
        </>
    )
}

export default LessonList;