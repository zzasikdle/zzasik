import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WriteBoard from './writeboard';


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
           <table style={{align:"center", border:"1", width:"80%"}}>

              <tbody>
                  {boardList.length===0 ? 
                   <tr>
                       <td colSpan="4"> 
                       <p style={{align:"center"}}>
                         <b><span style={{fontSize:"9pt"}}>등록된 글이 없습니다</span></b>
                       </p></td>
                   </tr>
                  : 
                  boardList.map((board, key) => {
                      return( 
                     
                          <ul key={key}>
                              <li>
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