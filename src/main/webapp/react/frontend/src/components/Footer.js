/*eslint-disable*/

import React ,{useState, useEffect} from 'react'
import { } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  
    return(
      <div className="wrap">
      <div className="footer">


<div className="footer-logo">ZZASIK</div>
<div className="footer-about">
  <p>SLOGAN</p>
  <a>식단관리는 최고의 건강관리이다</a>
  </div>
<div className="footer-company">
  <p>COMPANY</p>
  <small>* 본사 위치</small>
  <small>* 오프라인 매장</small>
  </div>
<div className="footer-account">
  <p>ACCOUNT</p>
  <small><Link to="/member/login">* 로그인</Link></small>
  <small><Link to="/member/Join">* 가입</Link></small>
  <small>* 회원 약관</small>
</div>
<div className="footer-contactus">
  <p>CONTACT US</p>
  <p>Email</p>
  <small>ZZASIK@gamil.com</small>
  <p>Phone</p>
  <small>02-1234-1234</small>
  <small>010-1234-1234</small>

</div>
<div className="footer-footer">© 2022 designed & developed by ZZASIK, all rights reserved.</div>

</div>
</div>
    )
}

export default Footer;