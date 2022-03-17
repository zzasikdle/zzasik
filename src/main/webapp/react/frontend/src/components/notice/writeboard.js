import { Link  } from "react-router-dom";
import axios from "axios";
import React,{useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './writeBoard.css';








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
        console.log(JSON.stringify(board_content));
        const objcontent = JSON.stringify(board_content);
        const formData = new FormData();
        formData.append("user_id",sessionStorage.getItem('user_id'));
        formData.append("teacher_name",sessionStorage.getItem('user_name'));
        formData.append("board_content",Object.values(board_content));
        formData.append("board_title",board_title);
        formData.append("meal_type",meal_type);
        formData.append("board_price",board_price);
        formData.append("imageFilename", imageFilename);

        console.log(Object.values(board_content))
       
        
    
      
    

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
        <div class="fir_div">
        <div id="write_form">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
           
            <div class="text_div">
            <p class="head_msg">짜식 상품 등록👍🏻</p>
            <hr ></hr>
         <div class="proimage_text">상품이미지</div>
            <p id="proimage"><img  id="preview" /></p>
            <a class="temp"><br/><br/>*상품이미지는 640x640에 최적화 되어 있습니다.<br/><br/>-이미지는 상품등록 시 정사각형으로 짤려서 등록됩니다.<br/><br/>-큰 이미지일 경우 이미지가 깨지는 경우가 발생할 수 있습니다. 
            <br/><br/>최대 지원 사이즈인 640x640 으로 리사이즈 해서 올려주세요. </a>
            <p class="choicefile"><input type="file" class="inputfile" name="imageFilename"  onChange={readURL} /></p>
            <hr></hr>
            <p class="mid_msg">상품 제목<input type="text" id="title" placeholder="제목"  name= "board_title" onChange={(e) => {setBoard_title(e.target.value)}}/></p>
            <p class="mid_msg">상품 타입<input type="text" class="type"placeholder="타입" name="meal_type"  onChange={(e) => {setMeal_type(e.target.value)}}/></p> 
            <p class="mid_msg">상품 가격<input type="text" class="price" placeholder="가격"  name="board_price" onChange={(e) => {setBoard_price(e.target.value)}}/></p>
            </div>
            
            
          
                <div class="product">상품소개</div>
                 <div id="text_editor"> 
                       <CKEditor 
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                        
                    } }
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        setBoard_cotent({
                          ...board_content,
                          board_content: data
                        })
                      }}
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                </div>


           
                <Link to="/"  onClick={writeBtn}><button class="click">글쓰기</button></Link>

<p><input type="hidden" class="board_content" placeholder="내용"  name="board_content" onChange={(e) => {setBoard_cotent(e.target.value)}}/></p>
<p><input type="hidden" placeholder="강사이름"value={sessionStorage.getItem('user_name')} name="teacher_name" /></p>
<p><input type="hidden" placeholder={sessionStorage.getItem('user_id')}  value={sessionStorage.getItem('user_id')} name="user_id"/></p>
        </div>
        </div>
    ); 
};

export default WriteBoard; 