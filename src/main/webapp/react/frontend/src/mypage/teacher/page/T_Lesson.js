import LessonList from '../component/LessonList';

//나의 코칭 서비스(전문가)
export default function T_Lesson(){


    return (
        <>
            <h1 className="myhome-title">나의 코칭 서비스</h1>
            <div className='content'>
                <div className="box table-section">
                    {LessonList()}
                </div>
            </div>
        </>
    );

}