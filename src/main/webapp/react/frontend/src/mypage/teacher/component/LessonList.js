import { useEffect, useRef } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import './LessonList.css';

const LessonList = () => {

    const baseUrl = "http://localhost:8090";
    const [ teacherBoard, setTeacherBoard] = useState([]);
    const user_id = sessionStorage.getItem("user_id");

    
    
  
    /* 코칭 목록 가져오기 */
    useEffect(()=>{
        async function call() {
            await axios
            .get(baseUrl + "/board/teacherBoard",{params:{user_id:sessionStorage.getItem('user_id')}})
                .then((response) => {
                    console.log(response.data);
                    setTeacherBoard(response.data);
                    console.log(teacherBoard)
    
                
             
                })
                .catch((error) => {
                    console.log(error);
                })
                }
    
           
            call();
        }, []);

        function boardList(){
      

            var i =0;
            var boardlist = [];
            for(i=0; i<teacherBoard.length; i++){
                
                boardlist.push(  
                    <tr>
                    <td>{teacherBoard[i].board_title} </td>
                    </tr>
                    )
    
              
            }
            return(
                boardlist
            )
        }


    return (
        <>
            <div>
                <h2>나의 코칭 목록</h2>
            </div>
            {teacherBoard.length===0 ? 
            <div style={{padding:"100px 0"}}>등록된 코칭 서비스가 없습니다. 코칭 서비스를 등록해주세요 !</div>
            :
            teacherBoard.map((board, key) => {
                return( 
              <Link to={`/board/viewboard/${board.board_code}`}>
                    <ul key={key} >
                      
                    
                      <div>
                      <div >meal_type:{board.meal_type}</div>
                      <div > board_title:{board.board_title} </div>     
                      <br/>                     
                      </div>

                     
                      <div>
                     <div> <img class="image_box" src={`${baseUrl}/download?board_code=${board.board_code}&imageFilename=${board.imageFilename}`} id="preview" alt={board.imageFilename} /></div>
                     </div>
                
                    
                     
                  
                    </ul>
                     </Link>
                  
                )
            })
            }
                
        </>
    )
}

export default LessonList;