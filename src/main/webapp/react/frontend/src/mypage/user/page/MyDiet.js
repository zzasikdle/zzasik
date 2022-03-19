import './MyDiet.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SurveyResult from "../component/SurveyResult.js";
import axios from 'axios';
import { baseUrl } from '../../../config';

function MyDiet(){

    const  [surveyCode ,  setSurveyCode] = useState("");

    const survey_code = sessionStorage.getItem("survey_code");
    

    const handleSurveyCode  = (e) => {
        setSurveyCode(e.target.value);
    }

    const inputSurveyCode  = (surveyCode) => {
        sessionStorage.setItem("survey_code",surveyCode);
        document.location.href='/myhome/myDiet'; 
    }

    const handelSurveyBtn = () => {
        window.location.href = "/survey"
    }

    return (
        <>
           <h1 className="myhome-title">나의 식단</h1>
           <div className="content">
               <div id="MyDietbox"> 
                    <div className='MyDietBox_header'>
                        <h2>식단 추천</h2>  
                        <h5>{ survey_code === "0" ? 
                            <div>
                                <div>
                                    <input id="inputSurveyCode" onChange={handleSurveyCode} placeholder="부여받은 설문 코드를 입력하세요."/>
                                    <button id="buttonSurveyCode" onClick={ () => inputSurveyCode(surveyCode)} >입력</button>
                                </div>
                                
                                <div>
                                    <button className="surveyButton" onClick={handelSurveyBtn}> 지금 설문조사 하러가기 </button>
                                </div>
                                
                            </div>
                        : <SurveyResult/> }
                        </h5>
                    </div>
               </div>
           </div>
        </>
    )
}

export default MyDiet;