import React ,{useState, useEffect} from 'react';
import {Button,ProgressBar,Spinner,Form } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';

function Servey() {
    

   

 const [servey,setServey] = useState(new Map());
 const [inputText,setInputText] = useState('');
 const [userName,setUserName] = useState('');
 const [progress,setProgress] = useState(1);
 const [page,setPage] = useState(0);
 const [illness,setIllness] = useState('');

 const add = (key, value) => {
  setServey((prev) => new Map([...prev,[key,value]]));
  const nowPage = page + 1;
  setPage(nowPage);
 };


 function getCheckboxValue()  {
  // 선택된 목록 가져오기
  const query = 'input[name="illness"]:checked';
  const selectedEls = 
      document.querySelectorAll(query);
  
  // 선택된 목록에서 value 찾기
  let result = [''];
  selectedEls.forEach((el) => {
    result += el.value + ' ';
  });
  
  // 출력
  setIllness(result);
  document.getElementById('result').innerText
    = result;
}

  
    return(
      <div className="container">
      <div className="servey">

     



<Button className="btn btn-primary testbtn" onClick={() => {console.log(servey)}} >값 보기</Button> 


      { page === 0 
      ?    
      <div className='servey-btn'>
        <div className='servey-title'>
        <h4>당신의 성별은 어떻게 되세요?</h4>
        </div>
      <Button className="btn" onClick={() => {add('gender','여자')}} >여자</Button> 
      <Button className="btn" onClick={() => {add('gender','남자')}} >남자</Button> 


      </div>
      : null
      }
       

       
      { page === 1
      ?  
      <Fade bottom>  
      <div className='servey-btn'>
      <div className='servey-title'>
        <h4>당신의 나이는 어떻게 되세요?</h4>
        </div>
      <Button className="btn" onClick={() => {add('age','10')}} >10대</Button> 
      <Button className="btn" onClick={() => {add('age','20')}} >20대</Button> 
      <Button className="btn" onClick={() => {add('age','30')}} >30대</Button> 
      <Button className="btn" onClick={() => {add('age','40')}} >40대</Button> 
      <Button className="btn" onClick={() => {add('age','50')}} >50대</Button> 
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
      <h4>{ servey.get('userName')}님, 반갑습니다</h4>
      <h4> {userName}님의 신장을 알려주세요. </h4>
    


      </div>
        <input onChange={(e) =>{setInputText(e.target.value)} }></input>
    
        <Button className="btn btn-primary" onClick={() => {add('height', inputText)}} >확인</Button> 
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
      </div>
        <input onChange={(e) =>{setInputText(e.target.value)} }></input>
        <Button className="btn btn-primary" onClick={() => {add('weight', inputText)}} >확인</Button> 
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
      <h4>평소 운동량은 얼마나?</h4>
      </div>
      <Button className="btn" onClick={() => {add('workout','1')}} >주 1회</Button> 
      <Button className="btn" onClick={() => {add('workout','2')}} >주 2회</Button> 
      <Button className="btn" onClick={() => {add('workout','3')}} >주 3회</Button> 
      <Button className="btn" onClick={() => {add('workout','4')}} >주 4회</Button> 
      <Button className="btn" onClick={() => {add('workout','5')}} >주 5회</Button> 
      </div>
      </Fade>
      :null
      }
        

      { page === 7
      ? <Loading progress={progress} setProgress={setProgress} page={page} setPage={setPage} loading={50}/>
      :null
      }

      { page === 8
      ? 
      <Fade bottom>
      <div className='servey-btn'>
      <div className='servey-title'>
      <h4>지병을 모두 선택해주세요</h4>
      </div>
      
      <div className='servey-checkbox-wrap'>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='illness' 
       value='당뇨병'
       onClick={()=> {getCheckboxValue()}}/> 당뇨병
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='illness' 
       value='고지혈증'
       onClick={()=> {getCheckboxValue()}}/> 고지혈증
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='illness' 
       value='통풍'
       onClick={()=> {getCheckboxValue()}}/> 통풍
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='illness' 
       value='탈모'
       onClick={()=> {getCheckboxValue()}}/> 탈모
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='illness' 
       value='분노조절장에'
       onClick={()=> {getCheckboxValue()}}/> 분노조절장애
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='illness' 
       value='정신병'
       onClick={()=> {getCheckboxValue()}}/> 정신병
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='illness' 
       value='알레르기'
       onClick={()=> {getCheckboxValue()}}/> 알레르기
       </div>
      <div className='servey-checkbox'>
      <input type='checkbox'
       name='illness' 
       value='정상'
       onClick={()=> {getCheckboxValue()}}/> 없어요!
       </div>
       <Button className="btn" onClick={() => {add('illness',illness)}} >확인</Button> 
       </div>
      </div>
      </Fade>
      : null
      }


      { page === 9
      ? <FinalLoading userName={userName} servey={servey}  page={page} setPage={setPage} />
      : null
      } 

      { page === 10
      ? 
      <Fade bottom>
      <div className='servey-input'>
      <div className='servey-title'>
      <h4>고객님의 결과 확인을 위해 이메일을 남겨주세요!</h4>
      </div>
        <input onChange={(e) =>{setInputText(e.target.value)} }></input>
        <Button className="btn btn-primary" onClick={() => {add('email', inputText)}} >확인</Button> 
        <Button className="btn" onClick={() => {console.log(servey)}} >저장된 값 보기</Button> 
      </div>
      </Fade>
      :null
      }

      { page === 11
      ? null
      :null
      }

      { page === 12
      ? null
      :null
      }
        

        
</div>
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