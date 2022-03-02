import { Link} from "react-router-dom";
import React from "react";
const WriteBoard = ( ) => {
    // const baseUrl = "http://localhost:8090";

    return (
        <div id="write_form">
            <form action="http://localhost:8090/board/addNewBoard" method="post">
            <p><input type="text" placeholder="제목" name="board_content"/></p>
            <p><input type="text" placeholder="내용" name= "board_title"/></p>
            <p><input type="text" placeholder="타입" name="meal_type" /></p>
            <p><input type="text" placeholder="아이디" name="user_id"/></p> 
            {/* <p><button onClick={handleSubmit}>완료</button></p> */}

            <tr>
                 <button type="submit">글쓰기</button>
            
	        </tr>
            </form>
        </div>
    );
};

export default WriteBoard;