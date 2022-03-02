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

<h4>내가 원하는 변화? 0302</h4>


<Button className="btn btn-primary">다이어트</Button> 
<Button className="btn btn-danger" >식습관 개선</Button> 

    </div>

<div className="main-merit" >

<Fade bottom>
<div className="main-merit-parts">
<FontAwesomeIcon icon={faSearch} size="2x" />
<h4>좋은 가격</h4>
<p>동해물과 백두산이 마르고 닳도록, 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 
  <br/>대한 사람 대한으로 길이 보전하세 가을하늘 공활한데 높고 구름 없이 괴로우나 즐거우나
  <br/> 일편 단심일세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세</p>

</div>
</Fade>

<Fade bottom>
<div className="main-merit-parts">
<FontAwesomeIcon icon={faFish} size='2x' />
<h4>좋은 생선</h4>
<p>동해물과 백두산이 마르고 닳도록, 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 
  <br/>대한 사람 대한으로 길이 보전하세 가을하늘 공활한데 높고 구름 없이 괴로우나 즐거우나
  <br/> 일편 단심일세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세</p>
</div>
</Fade>


<Fade bottom>
<div className="main-merit-parts">
<FontAwesomeIcon icon={faEgg} size='2x' />
<h4>좋은 계란</h4>
<p>동해물과 백두산이 마르고 닳도록, 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 
  <br/>대한 사람 대한으로 길이 보전하세 가을하늘 공활한데 높고 구름 없이 괴로우나 즐거우나
  <br/> 일편 단심일세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세</p>
</div>
</Fade>

</div> 
{/* end main-merit */}

<div className="main-steps">
<small>Our Steps</small>
<h4>이렇게 이용</h4>
<p>대한 사람 대한으로 길이 보전하세</p>
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