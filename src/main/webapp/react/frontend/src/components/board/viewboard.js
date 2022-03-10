import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewBoard= () =>{
const baseUrl = "http://localhost:8090";
const [board, setBoard] = useState({});
const {board_code} = useParams();
const [imageFilename,setImageFilename]= useState('');
const [user_id,setuser_id]= useState('');
const [disabled, setDisabled] = useState(true);

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


  const joinBtn = async()=>{
        console.log("user_id: "+sessionStorage.getItem('user_id'))
        console.log("board_code : "+board.board_code)
        console.log("teacher_id : "+board.user_id)

            await axios
            .get(baseUrl+"/board/joinBoard",{params:
                {board_code:board_code,
                    user_id:sessionStorage.getItem('user_id'),
                    teacher_id:board.user_id}}

            ).then(()=>{
                alert(sessionStorage.getItem('user_id') +"님 신청완료 ^^ ")

                
                  
              
            })
            
            .catch((error)=>{
                alert("프로그램은 한개만 신청이 가능합니다.")
                
                
            })
    
        } 
    
    let codes = board.board_content;
  return(
      

<div>   
    <br/>
    <br/>
    <br/>
    <br/>
    <><div>board_cotent</div><div dangerouslySetInnerHTML={ {__html:codes}}></div></>
    <><div>meal_type</div><div>{board.meal_type}</div></>
    <><div>teacher_name</div><div>{board.teacher_name}</div></>
    <><div>board_title</div><div>{board.board_title}</div></>
    <><div>imageFilename</div><div>{board.imageFilename}</div></>
    <><div>{board.user_id}</div></>



    <><div><button onClick={joinBtn}>신청하기</button></div></>
    <table>
  <tbody>

      
        <tr>
      
      
         
            <td >

            
                <img src={`${baseUrl}/download?board_code=${board_code}&imageFilename=${board.imageFilename}`} id="preview" alt={board.imageFilename} />
            </td>
            </tr>
            
            <tr>
            <td>
                {/* <input type="file" name="imageFileName " id="i_imageFileName" disabled={disabled} onChange={readURL} /> */}
            </td>
            </tr>

            


</tbody>
</table>
</div>
  
  )


  }

export default ViewBoard;