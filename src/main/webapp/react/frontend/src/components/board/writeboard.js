import { Link  } from "react-router-dom";
import axios from "axios";
import React,{useState} from 'react';








const WriteBoard = ( ) => {
     const baseUrl = "http://localhost:8090";
     const [board_content ,     setBoard_cotent]= useState('');
     const [board_title, setBoard_title] = useState('');
     const [meal_type, setMeal_type] = useState('');
     const [board_price , setBoard_price]= useState('');
     const [imageFilename , setImageFilename]= useState('');

 
     const readURL = (e) => {
      
        if(e.target.files && e.target.files[0]){
            let reader = new FileReader();
            reader.onloadend = function(){
             document.getElementById("preview").setAttribute('src', reader.result);
            }
            reader.readAsDataURL(e.target.files[0]);
            setImageFilename(e.target.files[0]);
        }

     
    }

    

    const writeBtn = async()=>{
        const formData = new FormData();
        formData.append("user_id",sessionStorage.getItem('user_id'));
        formData.append("teacher_name",sessionStorage.getItem('user_name'));
        formData.append("board_content",board_content);
        formData.append("board_title",board_title);
        formData.append("meal_type",meal_type);
        formData.append("board_price",board_price);
        formData.append("imageFilename", imageFilename);
    
      
    

        await axios
        .post(baseUrl+"/board/addNewBoard", formData,{
            headers: { "Content-Type": "multipart/form-data; boundary=${formData._boundary" }

        }
       
        ).then((response)=>{
            
            alert(response.data.message);
              
          
        })
        
        .catch((error)=>{
            alert(error);
            
        })

    } 
    return (
        <div id="write_form">
           <p><input type="text" placeholder={sessionStorage.getItem('user_id')}  value={sessionStorage.getItem('user_id')} name="user_id"/></p>
           <p><input type="text" placeholder="강사이름"  value={sessionStorage.getItem('user_name')} name="teacher_name" /></p>
            <p><input type="text" placeholder="제목"  name="board_content" onChange={(e) => {setBoard_cotent(e.target.value)}}/></p>
            <p><input type="text" placeholder="내용"  name= "board_title" onChange={(e) => {setBoard_title(e.target.value)}}/></p>
            <p><input type="text" placeholder="타입" name="meal_type"  onChange={(e) => {setMeal_type(e.target.value)}}/></p> 
            <p><input type="text" placeholder="가격"  name="board_price" onChange={(e) => {setBoard_price(e.target.value)}}/></p>
        
            
            <p> <input type="file" name="imageFilename"  onChange={readURL} /></p>
            <p><img  id="preview"   alt="preview"/></p>	
            <Link to="/" onClick={writeBtn}>글쓰기 </Link>
        </div>
    ); 
};

export default WriteBoard; 