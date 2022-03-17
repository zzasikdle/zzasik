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
          <Nav.Link href="/survey">나의 식단 찾기</Nav.Link>
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
          <Nav.Link href="/shop">상품 shop</Nav.Link>
          <Nav.Link href="/board/list">게시판 리스트</Nav.Link>
          <Nav.Link href="/notice">공지사항</Nav.Link>
          {sessionStorage.getItem('success')==='true'?
                    sessionStorage.getItem('classification')==='0'?
                    <>
                    <NavDropdown title="관리자페이지" id="offcanvasNavbarDropdown">
                    <NavDropdown.Item href="/admin">회원 정보</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/notice">공지사항 관리</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/product">상품 관리</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/lesson">코칭 서비스 관리</NavDropdown.Item>
                    <NavDropdown.Item href="/" onClick={onLogout} >로그아웃</NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                    </NavDropdown>
                    </>
                    :
                    sessionStorage.getItem('classification')==='1'?
                    <>
                    <NavDropdown title="마이페이지" id="offcanvasNavbarDropdown">
                    <NavDropdown.Item href="/myhome">내 정보</NavDropdown.Item>
                    <NavDropdown.Item href="/myhome/myDiet">나의 식단</NavDropdown.Item>
                    <NavDropdown.Item href="/myhome/myLesson">나의 코칭 서비스</NavDropdown.Item>
                    <NavDropdown.Item href="/myhome/myOrder">주문내역</NavDropdown.Item>
                    <NavDropdown.Item href="/myhome/myCart">장바구니</NavDropdown.Item>
                    <NavDropdown.Item href="/" onClick={onLogout} >로그아웃</NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                    </NavDropdown>
                    </>
                    :
                    <>
                    <NavDropdown title="마이페이지" id="offcanvasNavbarDropdown">
                    <NavDropdown.Item href="/teacher">내 정보</NavDropdown.Item>
                    <NavDropdown.Item href="/teacher/lesson">나의 코칭 서비스</NavDropdown.Item>
                    <NavDropdown.Item href="/teacher/signuplist">신청 내역</NavDropdown.Item>
                    <NavDropdown.Item href="/teacher/coaching">코칭 하기</NavDropdown.Item>
                    <NavDropdown.Item href="/" onClick={onLogout} >로그아웃</NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                    </NavDropdown>
                    </>
                    :
                    null
          }
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