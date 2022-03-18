/*eslint-disable*/


import { useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import './SurveyResult.css';

/* 설문 결과 -> 추천 상품 리스트 보여주기 */
const SurveyResult = () => {
    const [ surveyList,setSurveyList] = useState([]);
    const survey_code = sessionStorage.getItem("survey_code");

    useEffect(()=>{
        axios
        .get('/mypage/surveyresult',{
            survey_code : survey_code
        })
        .then((response)=>{
            console.log(response.data);
            setSurveyList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);

    console.log(surveyList.length);
    return <div class="list_card">
                <ul >
                {surveyList.length===0 ?
                    <li className="item item1" >
                        <img src="/img/logo4.png" style={{width:200,height:200}}/> 
                        <p><Link to ="/" style={{textDecoration: "none",color:"#353535"}}>허닭 닭가슴살 소시지 그릴후랑크 100g 5종 혼합</Link></p>
                        <strong>20,000 <span style={{fontSize:16}}>원</span></strong>
                    </li>
                    //<p>설문조사를 완료하지 않았습니다.</p>
                    :
                    surveyList.map((product,key) => {
                        return(
                        /* db에 상품 등록 후 연결해야함
                        <li className="item item1" >
                            <p>{product.pro_name}</p>
                            <strong>{product.pro_class}</strong>
                            <p>{product.pro_available}<br/>{product.pro_price}</p>
                            <p>{product.pro_img}</p>
                            <a href="#">상품보기</a>
                        </li>*/
                        <p></p>
                        )
                    })
                    }
                </ul>
            </div>
}

export default SurveyResult;
