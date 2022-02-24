import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ArticleForm = ( ) => {
    const baseUrl = "http://localhost:8090";
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFileName , setImageFileName]= useState('');

    const readURL = (e) => {
        if(e.target.files && e.target.files[0]){
            let reader = new FileReader();
            reader.onloadend = function(){
             document.getElementById("preview").setAttribute('src', reader.result);
            }
            reader.readAsDataURL(e.target.files[0]);
            setImageFileName(e.target.files[0]);
        }
    }

    const fn_addFile = ( ) => {

    }

    const handleWrite = async( ) => {
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("imageFileName", imageFileName);
        formData.append("name", sessionStorage.getItem("name"));
        formData.append("id", sessionStorage.getItem("userId"));

        await axios
          .post(baseUrl+'/board/addNewArticle', formData,
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
        <div>
          <h1 style={{textAlign:"center"}}>글쓰기</h1>
           <table style={{border:"0", align:"center"}}>
               <tbody>
                 <tr>
                 <td style={{align:"right"}}> 작성자</td>
                 <td style={{colSpan:2, align:"left"}}><input type="text" size="20" maxLength="100"  value={sessionStorage.getItem("name")} readOnly/> </td>
                 </tr>

                <tr>
			   <td style={{align:"right"}}>글제목: </td>
			   <td style={{colSpan:"2"}}><input type="text" size="67"  maxLength="500" name="title" onChange={(e) => {setTitle(e.target.value)}}/></td>
		      </tr>

              <tr>
				<td style={{align:"right", valign:"top"}}>글내용: </td>
				<td style={{colSpan:"2"}}><textarea name="content" rows="10" cols="65" maxLength="4000" onChange={(e) => { setContent(e.target.value)}}></textarea> </td>
             </tr>

             <tr>
			  <td style={{align:"right"}}>이미지파일 첨부:  </td>
			  <td> <input type="file" name="imageFileName"  onChange={readURL} /></td>
			  <td><img  id="preview"   style={{width:"200px", height:"200px"}} alt="preview"/></td>			  
			  <td style={{align:"right"}}>이미지파일 첨부</td>
				<td style={{align:"left"}}> <input type="button" value="파일 추가" onClick={fn_addFile}/></td>
	        </tr>

            <tr>
	        <td colSpan="4"><div id="d_file"></div></td>
	       </tr>

           <tr>
	      <td style={{align:"right"}}> </td>
	      <td colSpan="2">
	       <Link to="/" onClick={handleWrite}>글쓰기 </Link>
	       <Link to="/board/list"  >목록보기</Link>
	      </td>
         </tr>
               </tbody>
           </table>
        </div>
    )
}

export default ArticleForm;