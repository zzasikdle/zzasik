/*eslint-disable*/

import { baseUrl } from "../../../config";
import { useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import './SurveyResult.css';

/* 설문 결과 -> 추천 상품 리스트 보여주기 */
const SurveyResult = () => {

    const [ surveyList,setSurveyList] = useState([]);
    const survey_code = sessionStorage.getItem("survey_code");
    const user_id = sessionStorage.getItem("user_id");

    useEffect(  ()=>{
        axios.get(baseUrl + '/mypage/surveyresult',{params:{ survey_code : survey_code , user_id:user_id}} )
            .then((response)=>{
                setSurveyList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <div class="list_card" >
                <ul>
                {surveyList.length===0 ?
                    <p style={{margin:"200px auto",color:"#F9B514",fontWeight:700}}>식단을 찾지 못하였습니다.&ensp;전문가와 상의 해보세요.</p>
                    :
                    surveyList.map((product,key) => {
                        return(
                        <li className="item item1" >
                            <img src={product.pro_img} style={{width:200,height:200}}/> 
                            <p><Link to ={`/shop/view/${product.pro_code}`} style={{textDecoration: "none",color:"#353535"}}>{product.pro_name}</Link></p>
                            <strong>{product.pro_price}<span style={{fontSize:16}}>원</span></strong>
                        </li>
                        )
                    })
                    }
                </ul>
            </div>

        </>
        // <div class="list_card">
        //         <ul >
        //         {surveyList.length===0 ?
        //             <li className="item item1" >
        //                 <img src="/img/logo4.png" style={{width:200,height:200}}/> 
        //                 <p><Link to ="/" style={{textDecoration: "none",color:"#353535"}}>허닭 닭가슴살 소시지 그릴후랑크 100g 5종 혼합</Link></p>
        //                 <strong>20,000 <span style={{fontSize:16}}>원</span></strong>
        //             </li>
        //             //<p>설문조사를 완료하지 않았습니다.</p>
        //             :
        //             surveyList.map((product,key) => {
        //                 return(
        //                 /* db에 상품 등록 후 연결해야함
        //                 <li className="item item1" >
        //                     <p>{product.pro_name}</p>
        //                     <strong>{product.pro_class}</strong>
        //                     <p>{product.pro_available}<br/>{product.pro_price}</p>
        //                     <p>{product.pro_img}</p>
        //                     <a href="#">상품보기</a>
        //                 </li>*/
        //                 <p></p>
        //                 )
        //             })
        //             }
        //         </ul>
        //     </div>
    );
};

export default SurveyResult;
