import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import './boardList.css';

const BoardList = ( ) => {
    const baseUrl = "http://localhost:8090";

    const [ boardList, setBoardList] = useState([]);

    
  
       
    

    useEffect(( ) => {
        async function call() {
            await axios
            .get(baseUrl + '/board/listBoards')
            .then((response) => {
                console.log(response.data);
                setBoardList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            }
        call();
    }, []);

    let result = [];
    return (
        <div>
            <div>
        <div class="headermsg">짜식<br/>온라인 식단 !!<br/> 전문가 코치가 검증한 올바른 식단법!!<br/>지금바로 효과의 차이를 느껴보세요</div>

            </div>
           <table>

              <tbody>
                  {boardList.length===0 ? 
                   <tr>
                       <td colSpan="4"> 
                       <p>
                         <b><span>등록된 글이 없습니다</span></b>
                       </p></td>
                   </tr>
                  : 
                  boardList.map((board, key) => {
                      return( 
                    <Link to={`/board/viewboard/${board.board_code}`}>
                          <ul key={key} class="board_ul"> <li>
                            <a>
                            <div>{board.board_code}</div>
                            <div> {board.board_title} </div>                          
                            <div>{board.board_content}</div>
                            <div>{board.meal_type}</div>
                            <div>{board.board_price}</div>
                            <div>{board.teacher_name}</div>
                            </a>
                              </li>
                        
                          </ul>
                           </Link>
                        
                      )
                  })
                  }                  
              </tbody>
           </table>
           <Link className="cls1" to="/writeboard"><p className="cls2">글쓰기</p></Link>
        </div>        
    )
}


export default BoardList;