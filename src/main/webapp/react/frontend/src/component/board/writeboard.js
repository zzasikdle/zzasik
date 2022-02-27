import { Link} from "react-router-dom";
import axios from "axios";
import React,{useState} from 'react';




const WriteBoard = ( ) => {
     const baseUrl = "http://localhost:8090";

     const [board_content , setBoard_cotent]= useState('');
     const [board_title, setBoard_title] = useState('');
     const [meal_type, setMeal_type] = useState('');
     const [board_price , setBoard_price]= useState('');

    const writeBtn = async()=>{
        const formData = new FormData();
        formData.append("user_id",sessionStorage.getItem('user_id'));
        formData.append("teacher_name",sessionStorage.getItem('user_name'));
        formData.append("board_content",board_content);
        formData.append("board_title",board_title);
        formData.append("meal_type",meal_type);
        formData.append("board_price",board_price);

        await axios
        .post(baseUrl+"/board/addNewBoard", formData,{
            headers: { "Content-Type": "multipart/form-data; boundary=${formData._boundary" }

        }
       
        ).then(()=>{
            alert("글쓰기 완료");
          
        })
        
        .catch((error)=>{
            alert(error);
            console.log(formData)
        })



    } 

    return (
        <div id="write_form">
            {/* <form action="http://localhost:8090/board/addNewBoard" method="post"> */}
           <p><input type="text" placeholder={sessionStorage.getItem('user_id')}  value={sessionStorage.getItem('user_id')} name="user_id"/></p>
           <p><input type="text" placeholder="강사이름"  value={sessionStorage.getItem('user_name')} name="teacher_name" /></p>
            <p><input type="text" placeholder="제목"  name="board_content" onChange={(e) => {setBoard_cotent(e.target.value)}}/></p>
            <p><input type="text" placeholder="내용"  name= "board_title" onChange={(e) => {setBoard_title(e.target.value)}}/></p>
            <p><input type="text" placeholder="타입" name="meal_type"  onChange={(e) => {setMeal_type(e.target.value)}}/></p> 
            <p><input type="text" placeholder="가격"  name="board_price" onChange={(e) => {setBoard_price(e.target.value)}}/></p> 
            
            
            {/* <p><button onClick={handleSubmit}>완료</button></p> */}
           
            <tr>
                 {/* <button type="submit">글쓰기</button> */}
                 <Link to="/" onClick={writeBtn}>글쓰기 </Link>

            
	        </tr>
            {/* </form> */}
        </div>
    ); 
};

export default WriteBoard;