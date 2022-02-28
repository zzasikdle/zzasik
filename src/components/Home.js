import React ,{useState, useEffect} from 'react'
import {Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSearch,faFish,faEgg } from '@fortawesome/free-solid-svg-icons';
import Bounce from 'react-reveal/Bounce';
import Zoom from 'react-reveal/Zoom';




function Home() {
  
    return(
  <div className="wrap">
    <div className="main">

<h4>ZZASIK</h4>


<Button variant="light">Get Start</Button> 
<Button variant="light">Get Test</Button> 
    </div>

<div className="main-merit" >

<Bounce bottom>
<div className="main-merit-parts">
<FontAwesomeIcon icon={faSearch} size="2x" />
<h4>좋은 가격</h4>
<p>동해물과 백두산이 마르고 닳도록, 하느님이 보우하사 우리나라만세</p>

</div>
</Bounce>

<Bounce bottom>
<div className="main-merit-parts">
<FontAwesomeIcon icon={faFish} size='2x' />
<h4>좋은 생선</h4>
<p>무궁화 삼천리 화려강산, 대한사람 대한으로 길이 보전하세</p>
</div>
</Bounce>

<Bounce bottom>

<div className="main-merit-parts">
<FontAwesomeIcon icon={faEgg} size='2x' />
<h4>좋은 계란</h4>
<p>이 기상과 이 맘으로 충성을 다하여</p>
</div>
</Bounce>

</div> 
{/* end main-merit */}

<div className="main-steps">
<small>Our Steps</small>
<h4>가자</h4>
<p>아침해가 빛나는 끝이 없는 바닷가, 아침 공기 마시며 자, 힘차게 달려보자</p>
<Zoom>
<div className="main-steps-text">
  <h3>1.</h3>
  <h4>식습관 맞춤 설문</h4>
  <p>맞춤 설문으로 어쩌구해서 설문자에게 최적화된 식단을 제공합니다</p>
</div>
</Zoom>
<Zoom>
<div className="main-steps-text">
<h3>2.</h3>
  <h4>식단 선택 </h4>
  <p>맞춤 설문으로 어쩌구해서 설문자에게 최적화된 식단을 제공합니다</p>
</div>
</Zoom>
<Zoom>
<div className="main-steps-text">
<h3>3.</h3>
  <h4>다이어트 시작</h4>
  <p>맞춤 설문으로 어쩌구해서 설문자에게 최적화된 식단을 제공합니다</p>
</div>
</Zoom>


</div>


{/* container */}
  </div>
    )
}

export default Home;