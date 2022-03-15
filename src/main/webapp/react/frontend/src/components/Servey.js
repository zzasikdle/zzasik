import React ,{useState, useEffect} from 'react';
import {Button,ProgressBar,Spinner,Form } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import axios from 'axios'

function Servey() {
    

 const [code,setCode] = useState('');
 const baseUrl = "http://localhost:8090";

 const [survey,setSurvey] = useState(new Map());
 const [inputText,setInputText] = useState('');
 const [userName,setUserName] = useState('');
 const [progress,setProgress] = useState(1);
 const [page,setPage] = useState(0);
 const [sickness,setSickness] = useState('');
 const [psickness,setPsickness] = useState('');
 const [check,setCheck] = useState(false);



 const add = (key, value) => {
  setSurvey((prev) => new Map([...prev,[key,value]]));
  const nowPage = page + 1;
  setPage(nowPage);
 };


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
  

function intCheck(e){
  const checkText = e.target.value;
  const intStyle = /(^\d+$)|(^\d{1,}.\d{0,2}$)/; 

  if(intStyle.test(checkText)){
    setCheck(true);
  }else{
    setCheck(false);
  }

}

function emailCheck(e){
  const checkText = e.target.value;
  const emailStyle = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if(emailStyle.test(checkText)){
    setCheck(true);
  }else{
    setCheck(false);
  }
}


function ageReject(e) {
  if(check == true){
    add('age', inputText);
    setCheck(false);
  }else{
    e.preventDefault();
  }
}

function heightReject(e) {

  if(check == true){
    add('height', inputText);
    setCheck(false);
  }else{
    e.preventDefault();
  }
}

function weightReject(e){
  if(check == true){
    add('wieght', inputText);
    setCheck(false);
  }else{
    
    e.preventDefault();
  }
}


function emailReject(e){
  if(check == true){
    add('email', inputText)
    setCheck(false);
  }else{
    
    e.preventDefault();
  }
}

function Submit1(e) {
        
  const Submit1 = async() => { //await 키워드가 비동기 코드를 호출할 수 있게 하기 위해서 async()로 함수를 먼저 비동기함수로 만든다.
      
      await axios
          .post(baseUrl+'/survey1', survey)
          .then((response)=>{
          })
          .catch((error) => {
              console.log(error);
          });
  }
  console.log(survey);
  Submit1();
  setSurvey();
 // 로그인 후 빈칸으로 초기화 
}

function Submit2(e) {
        
  const Submit2 = async(e) => { //await 키워드가 비동기 코드를 호출할 수 있게 하기 위해서 async()로 함수를 먼저 비동기함수로 만든다.
      e.preventDefault();
      await axios
          .post(baseUrl+'/survey2', survey)
          .then((response)=>{
          })
          .catch((error) => {
              console.log(error);
          });
  }
  console.log(survey);
  Submit2();
  setSurvey();
 // 로그인 후 빈칸으로 초기화 
}

function Submit3(e) {
        
  const Submit3 = async(e) => { //await 키워드가 비동기 코드를 호출할 수 있게 하기 위해서 async()로 함수를 먼저 비동기함수로 만든다.
      e.preventDefault();
      await axios
          .post(baseUrl+'/survey3', survey)
          .then((response)=>{
          })
          .catch((error) => {
              console.log(error);
          });
  }
  console.log(survey);
  Submit3();
  setSurvey();
 // 로그인 후 빈칸으로 초기화 
}

function Submit4(e) {
        
  const Submit4 = async(e) => { //await 키워드가 비동기 코드를 호출할 수 있게 하기 위해서 async()로 함수를 먼저 비동기함수로 만든다.
      e.preventDefault();
      await axios
          .post(baseUrl+'/survey4', survey)
          .then((response)=>{
          })
          .catch((error) => {
              console.log(error);
          });
  }
  console.log(survey);
  Submit4();
  setSurvey();
 // 로그인 후 빈칸으로 초기화 
}

function Submit5(e) {
        
  const Submit5 = async(e) => { //await 키워드가 비동기 코드를 호출할 수 있게 하기 위해서 async()로 함수를 먼저 비동기함수로 만든다.
      e.preventDefault();
      await axios
          .post(baseUrl+'/survey5', survey)
          .then((response)=>{
            setCode(response.data.survey_code);
          })
          .catch((error) => {
              console.log(error);
          });
  }
  console.log(survey);
  console.log(code);
  Submit5()
  setSurvey();
 // 로그인 후 빈칸으로 초기화 
}



    return(
      <div className="servey">

      { page === 0 
      ?    
      <div className='servey-btn'>
        <div className='servey-title'>
        <h4>당신의 성별은 어떻게 되세요?</h4>
        </div>
      <Button className="btn" onClick={() => {add('gender','여성')}} >여자</Button> 
      <Button className="btn" onClick={() => {add('gender','남성')}} >남자</Button> 
      </div>
      : null
      }
       

       
      { page === 1
      ?  
      <Fade bottom>  
      <div className='servey-input'>
      <div className='servey-title'>
        <h4>당신의 나이는 어떻게 되세요?</h4>
        {check === false

        ? 
        <div>
        <p>숫자만 입력해 주세요.</p>
        </div>
        : <p className='alert-none'>공백</p>
        }
        </div>
        <input  onChange={(e) =>{setInputText(e.target.value); intCheck(e)} }></input>
    
        <Button className="btn btn-primary" onClick={(e) => {ageReject(e);}} >확인</Button>
      </div>
      </Fade>
      :null
      }
     
      
      { page === 2
      ?
      <Fade bottom>  
      <div className='servey-input'>
      <div className='servey-title'>
      <h4>이름을 알려주세요!</h4>
      </div>
        <input onChange={(e) =>{setInputText(e.target.value)} } name="userName"></input>
    
        <Button type="submit" className="btn btn-primary" onClick={() => {add('userName', inputText);
      function SliceName(){
        setUserName(inputText.slice(1));
      };
      SliceName();
      }} >확인</Button> 
      </div>
      </Fade>
      :null
      }
        

      { page === 3

      ?
      <Fade bottom>  
      <div className='servey-input'>
      <div className='servey-title'>
      <h4>{ survey.get('userName')}님, 반갑습니다</h4>
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
        <input onChange={(e) =>{setInputText(e.target.value); intCheck(e)} }></input>
    
        <Button className="btn btn-primary" onClick={(e) => {heightReject(e)}} >확인</Button> 
      </div>
      </Fade>


      :null
      }


      { page === 4

      ?
      <Fade bottom>
      <div className='servey-input'>
      <div className='servey-title'>
      <h4>감사합니다. 실례지만 몸무게도 알려주세요!</h4>
      {check === false
        ? <p >숫자만 입력해 주세요.</p>
        : <p className='alert-none'>공백</p>
        }
      </div>
        <input onChange={(e) =>{setInputText(e.target.value); intCheck(e)} }></input>
        <Button className="btn btn-primary"  onClick={(e) => {weightReject(e)}} >확인</Button> 
      </div>
      </Fade>

      :null
      }


      { page === 5
      
      ? 
      
      <Loading progress={progress} setProgress={setProgress} page={page} setPage={setPage} loading={25}/>
      
      :null
      }


       { page === 6

      ? 
      <Fade bottom>
      <div className='servey-input'>
      <div className='servey-title'>
      <h4>평소에 운동이나 직업에 관한 활동량이 어떻게 되시나요?</h4>
      </div>
      <Button className="btn btn-primary" onClick={() => {add('activity',1); Submit1();}} >가벼운 활동</Button> 
      <Button className="btn btn-primary" onClick={() => {add('activity',2); Submit1();}} >보통 활동</Button> 
      <Button className="btn btn-primary" onClick={() => {add('activity',3); Submit1();}} >힘든 활동</Button> 
      </div>
      </Fade>
      :null
      }
        
      { page === 7
      
      ?
      <Fade bottom>
      <div className='servey-btn'>
      <div className='servey-title'>
      <h4>평소에 운동을 하신다면 빈도가 어떻게 되시나요?</h4>
      </div>
      <Button className="btn btn-primary" onClick={() => {add('frequency','안함'); Submit2();}} >하지 않음</Button> 
      <Button className="btn btn-primary" onClick={() => {add('frequency','주1~2회'); Submit2();}} >주1~2회</Button> 
      <Button className="btn btn-primary" onClick={() => {add('frequency','주3~4회'); Submit2();}} >주3~4회</Button>
      <Button className="btn btn-primary" onClick={() => {add('frequency','주5회 이상'); Submit2();}} >주5회 이상</Button> 
      </div>
      </Fade>

      :null
      }

      { page === 8
      
      ?
      <Fade bottom>
      <div className='servey-btn'>
      <div className='servey-title'>
      <h4>식단관리의 목적이 무엇인가요?</h4>
      </div>
      <Button className="btn btn-primary" onClick={() => {add('goal','근력증진'); Submit3();}} >근력증진</Button> 
      <Button className="btn btn-primary" onClick={() => {add('goal','건강유지'); Submit3();}} >건강유지</Button> 
      <Button className="btn btn-primary" onClick={() => {add('goal','질병치료'); Submit3();}} >질병치료</Button>
      </div>
      </Fade>

      :null
      }



      


      { page === 9
      ? <Loading progress={progress} setProgress={setProgress} page={page} setPage={setPage} loading={50}/>
      :null
      }

      { page === 10
      ? 
      <Fade bottom>
      <div className='servey-btn'>
      <div className='servey-title'>
      <h4>현재 겪고 계신 질환 중에 해당되는 사항이 있으신가요?</h4>
      </div>
      
      <div className='servey-checkbox-wrap'>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='sickness' 
       value='당뇨병'
       onClick={()=> {getCheckboxValue()}}/> 당뇨병
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='sickness' 
       value='저혈압'
       onClick={()=> {getCheckboxValue()}}/> 저혈압
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='sickness' 
       value='고혈압'
       onClick={()=> {getCheckboxValue()}}/> 고혈압
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='sickness' 
       value='신장질환'
       onClick={()=> {getCheckboxValue()}}/> 신장질환
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='sickness' 
       value='빈혈'
       onClick={()=> {getCheckboxValue()}}/> 빈혈
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='sickness' 
       value='통풍'
       onClick={()=> {getCheckboxValue()}}/> 통풍
       </div>
       <div className='servey-checkbox'>
      <input type='checkbox'
       name='sickness' 
       value='심장병'
       onClick={()=> {getCheckboxValue()}}/> 심장병
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='sickness' 
       value='해당 없음'
       onClick={()=> {getCheckboxValue()}}/> 해당 없음
       </div>
       <Button className="btn" onClick={() => {add('sickness',sickness); Submit4();}} >확인</Button> 
       </div>
      </div>
      </Fade>
      : null
      }





{ page === 11
      ? 
      <Fade bottom>
      <div className='servey-btn'>
      <div className='servey-title'>
      <h4>과거에 겪으신 질환 중에 해당되는 사항이 있으신가요?</h4>
      </div>
      
      <div className='servey-checkbox-wrap'>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='p_sickness' 
       value='당뇨병'
       onClick={()=> {getCheckboxValue2()}}/> 당뇨병
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='p_sickness' 
       value='저혈압'
       onClick={()=> {getCheckboxValue2()}}/> 저혈압
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='p_sickness' 
       value='고혈압'
       onClick={()=> {getCheckboxValue2()}}/> 고혈압
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='p_sickness' 
       value='신장질환'
       onClick={()=> {getCheckboxValue2()}}/> 신장질환
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='p_sickness' 
       value='빈혈'
       onClick={()=> {getCheckboxValue2()}}/> 빈혈
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='p_sickness' 
       value='통풍'
       onClick={()=> {getCheckboxValue2()}}/> 통풍
       </div>
       <div className='servey-checkbox'>
      <input type='checkbox'
       name='p_sickness' 
       value='심장병'
       onClick={()=> {getCheckboxValue2()}}/> 심장병
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='p_sickness' 
       value='해당 없음'
       onClick={()=> {getCheckboxValue2()}}/> 해당 없음
       </div>
       <Button className="btn" onClick={() => {add('p_sickness',psickness); Submit5();}} >확인</Button> 
       </div>
      </div>
      </Fade>
      : null
      }

      { page === 12
      ? <FinalLoading userName={userName} servey={survey}  page={page} setPage={setPage} />
      : null
      } 

      { page === 13
      ? 
      <Fade bottom>
      <div className='servey-input'>
      <div className='servey-title'>
      <h4>고객님의 결과 확인을 위해 이메일을 남겨주세요!</h4>

        {check === false

        ? 
        <div>
        <p>이메일을 올바르게 입력해주세요.</p>
        </div>
        : <p className='alert-none'>공백</p>
        }
      </div>
        <input onChange={(e) =>{setInputText(e.target.value); emailCheck(e)} }></input>
        <Button className="btn btn-primary" id='emailInput' onClick={(e) => {emailReject(e)}} >확인</Button> 
        <Button className="btn" onClick={() => {console.log(survey)}} >저장된 값 보기</Button> 
      </div>
      </Fade>
      :null
      }

      { page === 14
      ?
      <div className='servey-input'>
      <div className='servey-title'>
      <h4>결과 확인</h4>
      </div>
        <Button className="btn" onClick={() => {console.log(survey)}} >저장된 값 보기</Button> 
      </div>
      :null
      }

      { page === 15
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
    <div className='servey-btn'>
    <div className='servey-title'>
      <h4>잠시만 기다려 주세요...</h4>
      <Spinner animation="border" />
    </div>

  <ProgressBar animated now={props.progress} />
  </div>
  )
}



function FinalLoading(props){
  
  const [finalProgress,setFinalProgress] = useState(0);
  const [progressText,setProgressText] = useState('최적화된 식단 검색중..');

  useEffect(()=> {
    let timer1 = setTimeout(()=> {

      setFinalProgress(10);
    }, 500);


    let timer2 = setTimeout(()=> {

     setProgressText('공장 갈구는중...');
     setFinalProgress(40);
    }, 1500);


    let timer3 = setTimeout(()=> {

      setProgressText('계란 구워 삶는 중....');
      setFinalProgress(72);
     }, 3000);

     let timer4 = setTimeout(()=> {

      setProgressText('개발자 조지는 중....');
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
    <div className='servey-btn'>
    <div className='servey-title'>
      <h4>{props.userName}님께 꼭 맞는 식단을 찾고 있어요!</h4>
      <ProgressBar now={finalProgress} />
      <Spinner animation="border" />
      <h5>{progressText}</h5>
    </div>
  </div>
  )

}



export default Servey;