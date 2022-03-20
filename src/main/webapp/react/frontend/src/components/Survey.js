/*eslint-disable*/


import React ,{useState, useEffect, useRef} from 'react';
import {Button,ProgressBar,Spinner,Form } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { CopyToClipboard } from "react-copy-to-clipboard";

import { baseUrl } from "../config";


function Survey() {


 const[gender,setGender] = useState('');
 const[age,setAge] = useState('');
 const[height,setHeight] = useState('');
 const[weight,setWeight] = useState('');
 const[activity,setActivity] = useState('');
 const[frequency,setFrequency] = useState('');
 const[goal,setGoal] = useState('');

 const [code,setCode] = useState('');


 const [Survey,setSurvey] = useState(new Map());
 const [inputText,setInputText] = useState('');
 const [userName,setUserName] = useState('');
 const [progress,setProgress] = useState(1);
 const [page,setPage] = useState(0);
 const [sickness,setSickness] = useState('');
 const [psickness,setPsickness] = useState('');
 const [check,setCheck] = useState(false);

 const[clicked,setClicked] = useState(false);

 const[copy,setCopy] = useState("Copy");




 //next page
 const next = () => {
  const nowPage = page+1;
  setPage(nowPage);
}

 //handle


 const handleGender = (text1) => {
  setGender(text1);
  next();
}

function ageReject(e) {
}
const handleAge = (e) => {
  if(check === true){
    setAge(inputText);
    setCheck(false);
    next();
  }else{
    e.preventDefault();
  }
 
}

const handleHeight = (e) => {
  if(check === true){
    setHeight(inputText);
    setCheck(false);
    next();
  }else{
    e.preventDefault();
  }
}

const handleWeight = (e) => {
  if(check === true){
    setWeight(inputText);
    setCheck(false);
    next();
  }else{
    e.preventDefault();
  }
}

const handleActivity = (text2) => {
  setActivity(text2);
}


const handleFrequency = (text3) => {
  console.log(activity);
  setFrequency(text3);
 }

const handleGoal = (text4) => {
  setGoal(text4);
 }



//


 function getCheckboxValue()  {
  const query = 'input[name="sickness"]:checked';
  const selectedEls = 
      document.querySelectorAll(query);
  
  let result = [''];
  selectedEls.forEach((el) => {
    result += el.value + ' ';
  });
  setSickness(result);
}


function getCheckboxValue2()  {
  const query = 'input[name="p_sickness"]:checked';
  const selectedEls = 
      document.querySelectorAll(query);
  
  let result = [''];
  selectedEls.forEach((el) => {
    result += el.value + ' ';
  });
  setPsickness(result);
}
  //



  //input check
  function nameCheck(e){
    const checkText = e.target.value;
    const nameStyle = /^[가-힣a-zA-Z]+$/;
  
    if(nameStyle.test(checkText)){
      setCheck(true);
    }else{
      setCheck(false);
    }
  
  }

  

function intCheck(e){
  const checkText = e.target.value;
  const intStyle = /(^\d+$)|(^\d{1,}.\d{0,2}$)/; 

  if(intStyle.test(checkText)){
    setCheck(true);
  }else{
    setCheck(false);
  }

}

function nameReject(e){
  if(check == true){
    setUserName(inputText.slice(1));
    setCheck(false);
    next();
  }else{
    
    e.preventDefault();
  }
}


function copyClicked(e){
  if(clicked === false){
    setClicked(true);
    setCopy("Copied");
  }else{
    e.preventDefault();
  }
}


function Submit1(e) {
       console.log(gender);
       console.log(activity);
 const Submit1 = async() => { //await 키워드가 비동기 코드를 호출할 수 있게 하기 위해서 async()로 함수를 먼저 비동기함수로 만든다.
     await axios
         .post(baseUrl+'/survey1', {gender:gender, age:age, height:height, weight:weight, activity:activity, 
                                    frequency:frequency, goal:goal, sickness:sickness, p_sickness:psickness})
         .then((response)=>{
          setCode(response.data.survey_code);
         })
         .catch((error) => {
             console.log(error);
         });
 }
 console.log(code);
 Submit1();
// 로그인 후 빈칸으로 초기화 
}



    return(
      <div className="Survey">

    { page === 0
      ?
      <Fade bottom>  
      <div className='Survey-input'>
      <div className='Survey-title'>
      <h4>안녕하세요, 성함을 알려주시겠어요?</h4>
        {check === false
        ? 
        <div>
        <p>올바른 성함을 입력해주세요.</p>
        </div>
        : <p className='alert-none'>공백</p>
        }
      </div>
      
        <input onChange={(e) =>{setInputText(e.target.value); nameCheck(e)} }></input>
    
        <Button type="submit" className="btn btn-primary" onClick={(e) => {nameReject(e);}} >확인</Button> 
      </div>
      </Fade>
      :null
      }



      { page === 1
      ?    
      <div className='Survey-btn'>
        <div className='Survey-title'>
        <h4>{userName}님, 반갑습니다</h4>
        <h4>{userName}님의 성별은 무엇인가요?</h4>
        </div>
      <Button className="btn" onClick={() => {handleGender("여성")}} >여성</Button> 
      <Button className="btn" onClick={() => {handleGender("남성")}} >남성</Button> 
      </div>
      : null
      }
       

   


      { page === 2
      ?  
      <Fade bottom>  
      <div className='Survey-input'>
      <div className='Survey-title'>
        <h4>{userName}님의 나이는요?</h4>
        {check === false

        ? 
        <div>
        <p>숫자만 입력해 주세요.</p>
        </div>
        : <p className='alert-none'>공백</p>
        }
        </div>
        <input  onChange={(e) =>{setInputText(e.target.value); intCheck(e);}}></input>
    
        <Button className="btn btn-primary" onClick={(e)=> {handleAge(e)}} >확인</Button>
      </div>
      </Fade>
      :null
      }
     
      
  
        

      { page === 3

      ?
      <Fade bottom>  
      <div className='Survey-input'>
      <div className='Survey-title'>
      
      <h4> {userName}님의 신장을 알려주세요. </h4>

      {check === false
        ? 
        <div>
        <p >숫자만 입력해 주세요.</p>
          <p>예 ) 180.3</p>
        </div>
        : <p className='alert-none'>공백</p>
        }
      </div>
        <input onChange={(e)=>{setInputText(e.target.value); intCheck(e)}}></input>
    
        <Button className="btn btn-primary" onClick={(e)=>{handleHeight(e)}}  >확인</Button> 
      </div>
      </Fade>


      :null
      }


      { page === 4

      ?
      <Fade bottom>
      <div className='Survey-input'>
      <div className='Survey-title'>
      <h4>감사합니다. 실례지만 몸무게도 알려주세요!</h4>
      {check === false
        ? 
        <div>
        <p >숫자만 입력해 주세요.</p>
        <p>예 ) 180.3</p>
        </div>
        : <p className='alert-none'>공백</p>
        }
      </div>
        <input onChange={(e)=>{setInputText(e.target.value); intCheck(e)}}></input>
        <Button className="btn btn-primary"  onClick={(e)=>{handleWeight(e)}} >확인</Button> 
      </div>
      </Fade>

      :null
      }


      { page === 5
      
      ? 
      
      <Loading progress={progress} setProgress={setProgress} page={page} setPage={setPage} loading={32}/>
      
      :null
      }


       { page === 6

      ? 
      <Fade bottom>
      <div className='Survey-input'>
      <div className='Survey-title'>
      <h4>평소에 운동이나 직업에 관한 활동량이 어떻게 되시나요?</h4>
      </div>
      <Button className="btn btn-primary" onClick={() => {handleActivity("가벼운 활동"); next();}} >가벼운 활동</Button> 
      <Button className="btn btn-primary" onClick={() => {handleActivity("보통 활동"); next();}} >보통 활동</Button> 
      <Button className="btn btn-primary" onClick={() => {handleActivity("힘든 활동");next();}} >힘든 활동</Button> 
      </div>
      </Fade>
      :null
      }
        
      { page === 7
      
      ?
      <Fade bottom>
      <div className='Survey-btn'>
      <div className='Survey-title'>
      <h4>평소에 운동을 하신다면 빈도가 어떻게 되시나요?</h4>
      </div>
      <Button className="btn btn-primary" onClick={() => {handleFrequency("하지 않음"); next();}} >하지 않음</Button> 
      <Button className="btn btn-primary" onClick={() => {handleFrequency("주1~2회");  next();}} >주1~2회</Button> 
      <Button className="btn btn-primary" onClick={() => {handleFrequency("주3~4회");  next();}} >주3~4회</Button>
      <Button className="btn btn-primary" onClick={() => {handleFrequency("주5회 이상"); next();}} >주5회 이상</Button> 
      </div>
      </Fade>

      :null
      }

      { page === 8
      
      ?
      <Fade bottom>
      <div className='Survey-btn'>
      <div className='Survey-title'>
      <h4>식단관리의 목적이 무엇인가요?</h4>
      </div>
      <Button className="btn btn-primary" onClick={() => {handleGoal('근력증진'); next();}} >근력증진</Button> 
      <Button className="btn btn-primary" onClick={() => {handleGoal('건강유지'); next();}} >건강유지</Button> 
      <Button className="btn btn-primary" onClick={() => {handleGoal('질병치료'); next();}} >질병치료</Button>
      <Button className="btn btn-primary" onClick={() => {handleGoal('다이어트'); next();}} >다이어트</Button>

      </div>
      </Fade>

      :null
      }


      { page === 9
      ? <Loading progress={progress} setProgress={setProgress} page={page} setPage={setPage} loading={75}/>
      :null
      }

      { page === 10
      ? 
      <Fade bottom>
      <div className='Survey-btn'>
      <div className='Survey-title'>
      <h4>현재 겪고 계신 질환 중에 해당되는 사항이 있으신가요?</h4>
      </div>
      
      <div className='Survey-checkbox-wrap'>
      <div className='Survey-checkbox'>
      <input type='checkbox'
       name='sickness' 
       value='당뇨병'
       onClick={()=> {getCheckboxValue()}}/> 당뇨병
       </div>
      <div className='Survey-checkbox'>
      <input type='checkbox'
       name='sickness' 
       value='저혈압'
       onClick={()=> {getCheckboxValue()}}/> 저혈압
       </div>
      <div className='Survey-checkbox'>
      <input type='checkbox'
       name='sickness' 
       value='고혈압'
       onClick={()=> {getCheckboxValue()}}/> 고혈압
       </div>
      <div className='Survey-checkbox'>
      <input type='checkbox'
       name='sickness' 
       value='신장질환'
       onClick={()=> {getCheckboxValue()}}/> 신장질환
       </div>
      <div className='Survey-checkbox'>
      <input type='checkbox'
       name='sickness' 
       value='빈혈'
       onClick={()=> {getCheckboxValue()}}/> 빈혈
       </div>
      <div className='Survey-checkbox'>
      <input type='checkbox'
       name='sickness' 
       value='통풍'
       onClick={()=> {getCheckboxValue()}}/> 통풍
       </div>
       <div className='Survey-checkbox'>
      <input type='checkbox'
       name='sickness' 
       value='심장병'
       onClick={()=> {getCheckboxValue()}}/> 심장병
       </div>
      <div className='Survey-checkbox'>
      <input type='checkbox'
       name='sickness' 
       value='해당없음'
       onClick={()=> {getCheckboxValue()}}/> 해당없음
       </div>
       <Button className="btn" onClick={() => {next();}} >확인</Button> 
       </div>
      </div>
      </Fade>
      : null
      }





{ page === 11
      ? 
      <Fade bottom>
      <div className='Survey-btn'>
      <div className='Survey-title'>
      <h4>과거에 겪으신 질환 중에 해당되는 사항이 있으신가요?</h4>
      </div>
      
      <div className='Survey-checkbox-wrap'>
      <div className='Survey-checkbox'>
      <input type='checkbox'
       name='p_sickness' 
       value='당뇨병'
       onClick={()=> {getCheckboxValue2()}}/> 당뇨병
       </div>
      <div className='Survey-checkbox'>
      <input type='checkbox'
       name='p_sickness' 
       value='저혈압'
       onClick={()=> {getCheckboxValue2()}}/> 저혈압
       </div>
      <div className='Survey-checkbox'>
      <input type='checkbox'
       name='p_sickness' 
       value='고혈압'
       onClick={()=> {getCheckboxValue2()}}/> 고혈압
       </div>
      <div className='Survey-checkbox'>
      <input type='checkbox'
       name='p_sickness' 
       value='신장질환'
       onClick={()=> {getCheckboxValue2()}}/> 신장질환
       </div>
      <div className='Survey-checkbox'>
      <input type='checkbox'
       name='p_sickness' 
       value='빈혈'
       onClick={()=> {getCheckboxValue2()}}/> 빈혈
       </div>
      <div className='Survey-checkbox'>
      <input type='checkbox'
       name='p_sickness' 
       value='통풍'
       onClick={()=> {getCheckboxValue2()}}/> 통풍
       </div>
       <div className='Survey-checkbox'>
      <input type='checkbox'
       name='p_sickness' 
       value='심장병'
       onClick={()=> {getCheckboxValue2()}}/> 심장병
       </div>
      <div className='Survey-checkbox'>
      <input type='checkbox'
       name='p_sickness' 
       value='해당없음'
       onClick={()=> {getCheckboxValue2()}}/> 해당없음
       </div>
       <Button className="btn" onClick={() => {next();}} >확인</Button> 
       </div>
      </div>
      </Fade>
      : null
      }

      { page === 12
      ? <Loading progress={progress} setProgress={setProgress} page={page} setPage={setPage} loading={100}/>
      :null
      }




      { page === 13
      ? <FinalLoading userName={userName} page={page} setPage={setPage} />
      : null
      } 

      { page === 14
      ? 
      <Fade bottom>
      <div className='Survey-input'>
      <div className='Survey-title'>
      <h4>결과를 확인하세요!</h4>
      </div>


      
        <Button className="btn" onClick={() => {Submit1(); next();}} >결과확인</Button>
      </div>
      
      </Fade>
      :null
      }

      { page === 15
      ?
      <div className='Survey-btn'>
      <div className='Survey-title'>
      <h4 >설문코드 : {code} </h4>
      <CopyToClipboard text={code} onCopy={()=>{copyClicked();}}>
          <Button disabled={clicked} className={clicked === false ? 'btn btn-copy' : 'btn-copy btn-copy-clicked'}>{copy}</Button>
      </CopyToClipboard>  

      <p>발급된 코드를 입력하여 회원 가입을 해주세요! 
        <br/>고객님께 맞춰진 완벽한 식단을 제공합니다.</p>
      </div>
      <Link to={'/member/join'}><Button className="btn btn-primary btn-bug">가입 시작</Button> </Link>

      </div>
      :null
      }

      { page === 16
      ? null
      :null
      }
        

        
</div>
    )
}




function Loading(props) {

  useEffect(()=> {
    let timer1 = setTimeout(()=> {

      props.setProgress(props.loading);
    }, 500);


    let timer2 = setTimeout(()=> {

      props.setPage(props.page+1);
    }, 3000);
    return ()=> {clearTimeout(timer1,timer2);}

  },[]);

  return(
    <div className='Survey-btn'>
    <div className='Survey-title'>
      <h4>잠시만 기다려 주세요...</h4>
      <Spinner animation="border" />
    </div>

  <ProgressBar animated now={props.progress} />
  </div>
  )
}



function FinalLoading(props){
  
  const [finalProgress,setFinalProgress] = useState(0);
  const [progressText,setProgressText] = useState(props.userName+'님의 설문을 분석하고 있습니다..');

  useEffect(()=> {
    let timer1 = setTimeout(()=> {

      setFinalProgress(10);
    }, 500);


    let timer2 = setTimeout(()=> {

     setProgressText('최적화된 식단을 검색중입니다..');
     setFinalProgress(40);
    }, 1500);


    let timer3 = setTimeout(()=> {

      setProgressText('최적화된 식단을 검색중입니다..');
      setFinalProgress(72);
     }, 3000);

     let timer4 = setTimeout(()=> {

      setProgressText('코드를 생성하고 있습니다..');
      setFinalProgress(92);
     }, 5000);


     let timer5 = setTimeout(()=> {

      setFinalProgress(100);
      
     }, 7000);

     let timer6 = setTimeout(()=> {
      props.setPage(props.page+1);

     }, 7500);

    return ()=> {clearTimeout(timer1,timer2,timer3,timer4,timer5,timer6);}
  },[]);

  return(
    <div className='Survey-btn'>
    <div className='Survey-title'>
      <h4>{props.userName}님께 꼭 맞는 식단을 찾고 있어요!</h4>
      <ProgressBar now={finalProgress} />
      <Spinner animation="border" />
      <h5>{progressText}</h5>
    </div>
  </div>
  )

}



export default Survey;