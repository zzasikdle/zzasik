import React ,{useState, useEffect} from 'react'
import { Accordion } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';


function Question() {
  
    return(
      <div className="wrap">
      <div className="question">

      <small>FAQ</small>
<Fade>
<h4>자주 묻는 질문</h4>
<p>다양한 질문들을 확인하세요.</p>
</Fade>

<Accordion>
  <Fade>
  <Accordion.Item eventKey="0">
    <Accordion.Header>무료인가요?</Accordion.Header>
    <Accordion.Body>
      짜식에서 제공하는 맞춤 식단관리는 무료입니다. <br/>
      이후 식단 구매와 전문가 코칭 서비스는 유료서비스 입니다.
    </Accordion.Body>
  </Accordion.Item>
  </Fade>
  <Fade>
  <Accordion.Item eventKey="1">
    <Accordion.Header>저는 살을 찌우고 싶은데요?</Accordion.Header>
    <Accordion.Body>
      걱정하지 마세요! <br/>
      짜식들의 AI가 고객님의 체중과 생활패턴들을 분석해 건강한 체중 증가를 위한 식단도 추천합니다.
    </Accordion.Body>
  </Accordion.Item>
  </Fade>
  <Fade>
  <Accordion.Item eventKey="2">
    <Accordion.Header>운동은 됐고 식단관리만 받고 싶어요.</Accordion.Header>
    <Accordion.Body>
      물론 가능합니다. 건강한 식습관을 만든후에, 운동은 천천히 생각해보세요.
    </Accordion.Body>
  </Accordion.Item>
  </Fade>
  <Fade>
  <Accordion.Item eventKey="3">
    <Accordion.Header>배송은 얼마나 걸리나요?</Accordion.Header>
    <Accordion.Body>
      주문 익일 받으실 수 있도록 최선을 다하겠습니다.
    </Accordion.Body>
  </Accordion.Item>
  </Fade>
</Accordion>

</div>
</div>
    )
}

export default Question;