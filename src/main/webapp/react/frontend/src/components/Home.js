/*eslint-disable*/


import React ,{useState, useEffect} from 'react'
import {Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSearch,faFish,faEgg } from '@fortawesome/free-solid-svg-icons';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';




function Home() {
  
    return(
  <div className="wrap">
    <div className="main">


<h4>ZZASIK</h4>
<p>식단을 짜주는 <span className='main-text-acc'>짜-식</span>들</p>

<Button className="btn" href='/survey'>내 식단 짜줘!</Button> 

    </div>

<div className="main-merit" >

<Fade bottom>
<div className="main-merit-parts">
<FontAwesomeIcon icon={faSearch} size="2x" />
<h4>식단관리는 최고의 건강관리입니다.</h4>
<p>짜식들의 AI로 나이, 성별, 운동량 등을 파악하여 최적분석 맞춤형 식단을 추천합니다.
  <br/>
  <br/>더 이상 몸에 맞지 않는 음식으로 고통 받지 마세요!</p>

<div className="main-merit-img img-1"></div>
</div>
</Fade>

<Fade bottom>
<div className="main-merit-parts">
<FontAwesomeIcon icon={faFish} size='2x' />
<h4>완벽한 재료, 완벽한 식단</h4>
<p>짜식들이 만드는 식단은, 늘 신선하고 청결합니다.
  <br/>
  <br/>완벽한 재료로 만드는 당신에게 꼭 맞는 식단, 궁금하지 않나요?</p>
  <div className="main-merit-img img-2"></div>
</div>
</Fade>


<Fade bottom>
<div className="main-merit-parts">
<FontAwesomeIcon icon={faEgg} size='2x' />
<h4>최고의 전문가가 함께하는 코칭프로그램</h4>
<p> 각계 각층의 최고의 전문가가 알려주는 운동!
  <br/>
  <br/>더 이상 잘못된 운동 방법으로 몸을 혹사시키지 마세요!</p>
  <div className="main-merit-img img-3"></div>
</div>
</Fade>

</div> 
{/* end main-merit */}

<div className="main-steps">
<small>Our Steps</small>
<h4>짜식들 이용방법</h4>
<p>어떻게 이용 하나요?</p>
<Zoom>
<div className="main-steps-text">
  <h3>1.</h3>
  <h4>식습관 맞춤 설문</h4>
  <p>설문을 통해 짜식들 AI가 추천해주는 식단을 확인하세요.</p>
</div>
</Zoom>
<Zoom>
<div className="main-steps-text">
<h3>2.</h3>
  <h4>식단 구매</h4>
  <p>확인한 식단을 구매하여 건강관리를 시작하세요.</p>
</div>
</Zoom>
<Zoom>
<div className="main-steps-text">
<h3>3.</h3>
  <h4>코칭 프로그램</h4>
  <p>최고의 전문가와 함께 홈트레이닝을 즐겨보세요. 식단관리와 함께하는 운동이면 건강관리 끝!</p>
</div>
</Zoom>


</div>


{/* container */}
  </div>
    )
}

export default Home;