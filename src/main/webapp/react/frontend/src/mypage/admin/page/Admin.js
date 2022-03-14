import MemberList from "../component/MemberList";
import './Admin.css';
/*
 관리자 페이지
 기능 : 회원 목록 
 */
function Admin(){
    return (
        <>
           <h1>관리자 페이지</h1>
           <div className='content'>
                {MemberList()}
            </div>
        </>
    )
}

export default Admin;