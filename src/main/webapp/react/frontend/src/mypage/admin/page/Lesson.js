import LessonList from "../component/LessonList";
/*
코칭 서비스 관리 
기능 : 등록된 코칭 서비스 모아보기,관리하기 버튼(서비스 추가,수정,삭제 할수 있는 페이지로 넘어감)
*/
function Lesson(){
    return (
        <>
           <h1 className="myhome-title">코칭 서비스 관리</h1>
           <div className='content'>
                <div className="box table-section">
                    {LessonList()}
                </div>
            </div>
        </>
    )
}

export default Lesson;