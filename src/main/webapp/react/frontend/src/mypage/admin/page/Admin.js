import MemberList from "../component/MemberList";
/*
 관리자 페이지
 기능 : 회원 목록 
 */
function Admin(){
    return (
        <>
           <h1 className="myhome-title">관리자 페이지</h1>
           <div className='content'>
                {MemberList()}
            </div>
        </>
    )
}

export default Admin;