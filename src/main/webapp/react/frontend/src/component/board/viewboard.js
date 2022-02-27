import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewBoard= () =>{



const baseUrl = "http://localhost:8090";

const [board, setBoard] = useState({});
const {board_code} = useParams();

useEffect(() => {
    async function call() {
        await axios
        .get(baseUrl+'/board/viewBoard',{params:{board_code:board_code}})
        .then((response)=>{
            setBoard(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
   }
  call();      
  }, []); 
  return(

<div>   
     <><div>board_code</div><div>{board_code}</div></>
    <><div>board_code</div><div>{board.board_content}</div></>
    <><div>board_code</div><div>{board.user_id}</div></>
    <><div>board_code</div><div>{board.meal_type}</div></>
    <><div>board_code</div><div>{board.teacher_name}</div></>
    <><div>board_code</div><div>{board.board_title}</div></>
    </div>

  )
}



export default ViewBoard;