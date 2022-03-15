import SurveyResult from "../component/SurveyResult.js";

function MyDiet(){
    return (
        <>
           <h1 className="myhome-title">나의 식단</h1>
           <div className="content">
               <div className="box" style={{height:450}}>
               <div className='box_header'>
                        <h2>식단 추천</h2>  
                    </div>
                   {SurveyResult()}
               </div>
           </div>
        </>
    )
}

export default MyDiet;