import axios from 'axios';
import { useEffect, useState } from 'react';
import './teacherBoard.css';

const TeacherBoard = ( ) => {
    const baseUrl = "http://localhost:8090";

    const [ teacherBoard, setTeacherBoard] = useState([]);
    

    useEffect(( ) => {
        async function call() {
            await axios
            .get(baseUrl + "/board/teacherBoard",{params:{user_id:sessionStorage.getItem('user_id')}})
            .then((response) => {
                console.log(response.data);
                setTeacherBoard(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            }

        async function call(){
            await axios
            .get()
        }
        call();
    }, []);

    let result = [];

    
    return (
        <div>
            <div>
            </div>
           <table>
              <tbody>
                  {teacherBoard.length===0 ? 
                   <tr>
                       <td colSpan="4"> 
                       <p>
                         <b><span>게시물이 없습니다.</span></b>
                       </p></td>
                   </tr>
                  : 
                  teacherBoard.map((teacherBoard, key) => {
                    
                      return( 
                          <><><div class="headdiv"></div>
                              <ul key={key}>
                              </ul></><select>
                                  <option value={teacherBoard.board_title}>{teacherBoard.board_title}</option>   
                              </select></>
                      )
                     
                  })
                  }                  
              </tbody>
           </table>
        
        </div>        
    )
}



export default TeacherBoard;