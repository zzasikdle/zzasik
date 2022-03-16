import NoticeList from "../../../components/notice/NoticeList";
import { Link } from 'react-router-dom';
/*
공지사항
기능 : 등록된 공지사항 모아보기,관리하기 버튼(글 작성,수정,삭제 할수 있는 페이지로 넘어감)
*/
function Notice(){
    return (
        <>
           <h1 className="myhome-title">공지사항</h1>
           <div className='content'>
                <div className="box table-section">
                    <div className="box_header">
                    <h2>공지 사항</h2>
                    <Link to='/notice' className='manage'>관리하기<img className="arrow" src='/img/arrow.png'/></Link>
                    </div>
                    {NoticeList()}
                </div>
            </div>
        </>
    )
}

export default Notice;