import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import React,{useState} from 'react';








const WriteBoard = ( ) => {
     const baseUrl = "http://localhost:8090";
     const [board_content ,     setBoard_cotent]= useState('');
     const [board_title, setBoard_title] = useState('');
     const [meal_type, setMeal_type] = useState('');
     const [board_price , setBoard_price]= useState('');
     const [imageFilename , setImageFilename]= useState('');
     const [discount , setDiscount]= useState('');
     const [origin_price , setorigin_price]= useState('');
     const navigate = useNavigate();
    

    const handleOrigin_price = (e) => {
        setorigin_price(e.target.value);
       console.log(origin_price)
    }
    
    const hadnleDiscount = (e) =>{
        setDiscount(e.target.value);
        console.log(discount)
    }

    const hadlePrice = (e) =>{
        setBoard_price((board_price*(1-(discount/100))));
        console.log(board_price)
    }

    


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
        formData.append("discount", discount);
        formData.append("origin_price", origin_price);
      
    

        await axios
        .post(baseUrl+"/board/addNewBoard", formData,{
            headers: { "Content-Type": "multipart/form-data; boundary=${formData._boundary" }

        }
       
        ).then((response)=>{
            alert(response.data.message);
            navigate(response.data.path);   
          
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
            {/* <p><input type="text" placeholder="가격-> 여기서 할인을 받아서 value값으로"  name="board_price" onChange={(e) => {setBoard_price(e.target.value)}}/></p> */}
            <p><input type="text" placeholder={board_price}  name="board_price" onChange={hadlePrice}/></p>
            <p><input type="text" placeholder="가격 입력 칸" name="origin_price" onChange={handleOrigin_price}/></p> 
            <p><input type="text" placeholder="할인 퍼센트" name="discount"  onChange={hadnleDiscount}/></p>
            
            <p> <input type="file" name="imageFilename"  onChange={readURL} /></p>
            <p><img  id="preview"   alt="preview"/></p>	
            <Link to="/" onClick={writeBtn}>글쓰기 </Link>
        </div>
    ); 
};

export default WriteBoard; 