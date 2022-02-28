import React ,{useState, useEffect} from 'react'
import { } from 'react-bootstrap';

function Footer() {
  
    return(
      <div className="wrap">
      <div className="footer">


<div className="footer-logo">ZZASIK</div>
<div className="footer-about">
  <p>ABOUT</p>
  <small>우리회사는 이렇게 탄생해서 이렇게 어쩌고 하고 있어요 글이 길어져도 깨지면 안되겠죠 높이와 너비는 유동적으로 늘어나야겠지요</small>
  </div>
<div className="footer-company">
  <p>COMPANY</p>
  <small>* About us</small>
  <small>* Portfolio</small>
  <small>* Shop</small>
  </div>
<div className="footer-account">
  <p>ACCOUNT</p>
  <small>* Sign in</small>
  <small>* Sign up</small>
  <small>* View Account</small>
</div>
<div className="footer-contactus">
  <p>CONTACT US</p>
  <p>Email</p>
  <small>ZZASIK@gamil.com</small>
  <p>Phone</p>
  <small>010-9999-9999</small>

</div>
<div className="footer-footer">© 2022 designed & developed by ZZASIK, all rights reserved.</div>

</div>
</div>
    )
}

export default Footer;