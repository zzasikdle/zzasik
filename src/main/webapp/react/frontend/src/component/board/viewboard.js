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
           console.log(response.data);
           
        })
        .catch((error) => {
            console.log(error);
        })
   } 
  
  call();      
  console.log(board.imageFilename);
  }, []); 


  const joinBtn = async()=>{
        console.log("user_id: "+board.user_id)
        console.log("board_code : "+board.board_code)

            await axios
            .get(baseUrl+"/board/joinBoard",{params:{board_code:board_code,user_id:sessionStorage.getItem('user_id')}}

            ).then(()=>{
                alert(sessionStorage.getItem('user_id') +"님 신청완료 ^^ ")

                
                  
              
            })
            
            .catch((error)=>{
                alert(error);
                
            })
    
        } 
    


  const readURL = (event) => {
    if (event.target.files && event.target.files[0]) {

        
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview').setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(event.target.files[0]);
        setImageFilename(event.target.files[0]);
        console.log(imageFilename);
    }
}


  return(

<div>   
    <><div>board_cotent</div><div>{board.board_content}</div></>
    <><div>meal_type</div><div>{board.meal_type}</div></>
    <><div>teacher_name</div><div>{board.teacher_name}</div></>
    <><div>board_title</div><div>{board.board_title}</div></>
    <><div>imageFilename</div><div>{board.imageFilename}</div></>
    <><div><button onClick={joinBtn}>신청하기</button></div></>
    <table>
  <tbody>

      
        <tr>
      
                 
                이미지
         
            <td >

                <input type="hidden" name="originalFileName" value="${board.imageFilename}" />
                <img src={`${baseUrl}/download?board_code=${board_code}&imageFilename=${board.imageFilename}`} id="preview" alt={board.imageFilename} />
            </td>
            </tr>
            
            <tr>
            <td>
                <input type="file" name="imageFileName " id="i_imageFileName" disabled={disabled} onChange={readURL} />
            </td>
            </tr>

            


</tbody>
</table>
</div>
  
  )


  }

export default ViewBoard;