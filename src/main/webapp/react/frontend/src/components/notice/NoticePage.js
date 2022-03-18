import NoticeList from "./NoticeList";
import { Link } from 'react-router-dom';

/*공지사항 페이지*/
function NoticePage(){
    return (
        
        <div className="notice-container">
            <div className='title-box'>짜식 공지사항</div>
            <div className='content'>
            {NoticeList()}
            {sessionStorage.getItem('classification')==='0'?
                    <>
                        <button className="writeBtn"><Link to='/notice/new' style={{ textDecoration: 'none', color:"white" }}>글쓰기</Link></button>
                    </>
                    :
                    null
            }
           </div>
        </div>
    )
}

export default NoticePage;