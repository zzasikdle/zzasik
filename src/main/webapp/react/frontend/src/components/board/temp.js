
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


const WriteBoard = ( ) => {
    const baseUrl = "http://localhost:8090";
    const navigate = useNavigate();
 
    const [board_title, setTitle] = useState('');
    const [board_content, setContent] = useState('');
    const [meal_type, setMealType] = useState('');
    const [user_id, setuser_id] = useState('');
    // const [imageFileName, setImageFileName]=useState('');

    // const readURL = (e) => {
    //     if(e.target.files && e.target.files[0]){
    //         let reader = new FileReader();
    //         reader.onloadend = function(){
    //          document.getElementById("preview").setAttribute('src', reader.result);
    //         }
    //         reader.readAsDataURL(e.target.files[0]);
    //         setImageFileName(e.target.files[0]);
    //     }
    // }
        

    // const fn_addFile = ( ) =>{}


    const handleWrite = async( ) => {
        
        const formData = new FormData();
        formData.append("board_title", board_title);
        formData.append("board_content", board_content);
        formData.append("meal_type", meal_type);
        formData.append("user_id", user_id);
        // formData.append("imageFileName", imageFileName);
    

        await axios
          .post(baseUrl+'/board/addNewBoard', formData,
                 {headers : {"Content-Type":"multipart/form-data; boundary=${formData._boundary"}})
          .then((response) => {
              alert(response.data.message);
              navigate(response.data.path);       

          })
          .catch((error) => {
              console.log(error);
          })
    }   

    return (
        <div id="loginForm">
            <p><input type="text" placeholder="제목" name="board_content" onChange={(e)  =>{setTitle(e.target.value)} }/></p>
            <p><input type="text" placeholder="내용" name= "board_title" onChange={(e)  =>{setContent(e.target.value)} }/></p>
            <p><input type="text" placeholder="타입" name="meal_type" onChange={(e)  =>{setMealType(e.target.value)} }/></p>
            <p><input type="text" placeholder="아이디" name="user_id" onChange={(e)  =>{setuser_id(e.target.value)} }/></p> 
            {/* <p><button onClick={handleSubmit}>완료</button></p> */}

            <tr>
			  {/* <td>이미지파일 첨부:  </td>
			  <td> <input type="file" name="imageFileName"  onChange={readURL} /></td>
			  <td><img  id="preview" alt="preview"/></td>			  
			  <td>이미지파일 첨부</td>
				<td> <input type="button" value="파일 추가" onClick={fn_addFile}/></td> */}
                <Link to="/" onClick={handleWrite}>글쓰기 </Link>
	        </tr>
        </div>
    );
};

export default WriteBoard;