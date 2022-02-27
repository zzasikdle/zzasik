import './Header.css';
import { Link } from 'react-router-dom'; // 이동할 위치를 설정할 때 필요함.

const Header = ( ) => {

    const onLogout = ( ) =>{
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('success');
        sessionStorage.removeItem('user_name');
        alert('로그아웃되었습니다.');
        document.location.href='/';
    }

    return (
        <header id='header'>
            <p>
                <Link to='/'>
                    <img src='' alt='home'/>
                </Link>
            </p>
            <h1><font style={{size:30}}>짜식 홈페이지</font></h1>
            <div>
                { sessionStorage.getItem('success')==='true'?
                    <Link to='/member/logout' onClick={onLogout}><h3>{sessionStorage.getItem('user_name')}님! 로그아웃</h3></Link>
                    :
                    <>
                    <Link to='/member/login'><h3>로그인</h3></Link>
                    <Link to='/member/Join'><h3>회원가입</h3></Link>
                    </>
                }
            </div>
        </header>
    );
};

export default Header;