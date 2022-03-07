import NoticeList from "../component/NoticeList";
import './Admin.css';
/*
공지사항
기능 : 등록된 공지사항 모아보기,관리하기 버튼(글 작성,수정,삭제 할수 있는 페이지로 넘어감)
*/
function Notice(){
    return (
        <>
           <h1>공지사항</h1>
           <div className='content'>
            {NoticeList()}
           </div>
        </>
    )
}

export default Notice;