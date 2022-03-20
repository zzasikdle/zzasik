/*eslint-disable*/
import './boardList.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { baseUrl } from "../../config";
import Pagination from "../../components/notice/Pagination";

const BoardList = ( ) => {


    const [ limit] = useState(10);    //한 페이지당 표시할 게시물 개수
    const [ page, setPage] = useState(1);
    const offset = (page - 1) * limit;
   


    const [ boardList, setBoardList] = useState([]);
    useEffect(( ) => {
        async function call() {
            await axios
            .get(baseUrl + '/board/listBoards')
            .then((response) => {
                console.log(response.data);
                setBoardList(response.data);
                console.log(boardList)
            })
            .catch((error) => {
                console.log(error);
            })
            }
        call();
    }, []);
    return (
        <div class="head_div">
            <div>
        <div class="headermsg">짜식</div>
        <div class="midmsg">온라인 식단관리👍🏻</div> 
        <br/>
        <br/>
        <div class="bootmsg"> <a href="#!"class="boot_a">전문가 코치가 검증</a>한 올바른 식단법!!<br/><br/>지금바로 효과의 차이를 느껴보세요.</div>
        <br/>
        <br/>
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
                  boardList.slice(offset, offset + limit).map((board,key) => {
               
                      return( 
                    <Link to={`/board/viewboard/${board.board_code}`}>
                          <ul key={key} class="board_ul" >
                            
                            <a href="#!" class="check">
                            <div class="content_div">
                            <div class="meal_type">{board.meal_type}</div>
                            <div class="board_title"> {board.board_title} </div>     
                            <br/>                     
                            <div class="board_price">{board.board_price}원</div>
                            <div class="board_teacher_name">{board.teacher_name}</div>
                            </div>

                           
                            <div class="header_div">
                           <div class="container"> <img class="image_box" src='/img/zzasik_image.png' id="preview" /></div>
                           </div>
                      
                            </a>
                           
                        
                          </ul>
                           </Link>
                        
                      )
                  })
                  }                  
              </tbody>
           </table>

           <footer>
            <Pagination
                total={boardList.length}
                limit={limit}
                page={page}
                setPage={setPage}
            />
            </footer>
        
        </div>        
    )
}


export default BoardList;