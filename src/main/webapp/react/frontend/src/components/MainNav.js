import React ,{useState, useEffect} from 'react'
import {Nav,Navbar,Container,Offcanvas,NavDropdown,Form,FormControl,Button} from 'react-bootstrap';
import {Link, Route, Switch} from 'react-router-dom';
import Rotate from 'react-reveal/Rotate';


function MainNav(props) {
  
  const [ScrollActive, setScrollActive] = useState(true);


  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장 
  function handleScroll() { 
      if(ScrollY > 299) {
          setScrollY(window.pageYOffset);
          setScrollActive(true);
      } else {
          setScrollY(window.pageYOffset);
          setScrollActive(false);
      }
  }
  useEffect(() => {
      function scrollListener() {  window.addEventListener("scroll", handleScroll); } //  window 에서 스크롤을 감시 시작
      scrollListener(); // window 에서 스크롤을 감시
      return () => { window.removeEventListener("scroll", handleScroll); }; //  window 에서 스크롤을 감시를 종료
  });

  /* 로그아웃 */
  const onLogout = ( ) =>{
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('success');
    sessionStorage.removeItem('user_name');
    sessionStorage.removeItem('classification');
    alert('로그아웃되었습니다.');
    
}
    return(
        <div className={ScrollActive ? "main-nav-fixed" : "main-nav"}>


      <Navbar bg="light" expand={false} fixed="top">
  <Container fluid>
    <Rotate>
    <Navbar.Brand href="/">ZZASIK</Navbar.Brand>
    </Rotate>
    <Navbar.Toggle aria-controls="offcanvasNavbar" />
    <Navbar.Offcanvas
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel">ZZASIK</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1 pe-3">
          <Nav.Link href="/">홈으로</Nav.Link>
          <Nav.Link href="#action2">나의 식단 찾기</Nav.Link>
          {sessionStorage.getItem('success')==='true'?
                    <Nav.Link href="/" onClick={onLogout} ><h6>{sessionStorage.getItem('user_name')}님 로그아웃</h6></Nav.Link>
                    :
                    <Nav.Link href="/member/login">로그인</Nav.Link>
          }
          {sessionStorage.getItem('classification')==='0'?
                    <Nav.Link href="/mypage/admin/member" >관리자 페이지</Nav.Link>
                    :
                    null
          }
          <Nav.Link href="#action2">짜식들</Nav.Link>
          <NavDropdown title="마이페이지" id="offcanvasNavbarDropdown">
            <NavDropdown.Item href="/myhome">나의 정보</NavDropdown.Item>
            <NavDropdown.Item href="#action3">식단 추천</NavDropdown.Item>
            <NavDropdown.Item href="#action4">나의 식단</NavDropdown.Item>
            <NavDropdown.Item href="#action4">주문/배송</NavDropdown.Item>
            <NavDropdown.Item href="#action4">수강중인 프로그램</NavDropdown.Item>
            <NavDropdown.Item href="/" onClick={onLogout} >로그아웃</NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  </Container>
</Navbar>
        </div>
    )
}

export default MainNav;