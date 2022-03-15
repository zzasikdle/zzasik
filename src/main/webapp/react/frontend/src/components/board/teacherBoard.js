import axios from 'axios';
import { useEffect, useState } from 'react';
 import './teacherBoard.css';

const TeacherBoard = ( ) => {
    const baseUrl = "http://localhost:8090";

    const [ teacherBoard, setTeacherBoard] = useState([]);
    const [selectBox, setselectBox]  = useState([]);
    const [userlist, setUserList]  = useState([]);
    

    useEffect(( ) => {
        async function call() {
            await axios
            .get(baseUrl + "/board/teacherBoard",{params:{user_id:sessionStorage.getItem('user_id')}})
            .then((response) => {
                console.log(response.data);
                setTeacherBoard(response.data);

                // var i = 0;
                // for(i=0; i<Object.keys(teacherBoard).length; i++){
                //     console.log(teacherBoard[i].board_code);
                    
                // }  
         
            })
            .catch((error) => {
                console.log(error);
            })
            }

       
        call();
    }, []);


    

    let result = [];
    
    function temp(){
        var i =0;
        var temp = [];
        for(i=0; i<teacherBoard.length; i++){
            temp.push(<option>[{teacherBoard[i].board_code}]{teacherBoard[i].board_title}</option>)
        }

    
    return(
        temp 
    )
    }



    function userList(){
        var i =0;
        var user_table = [];
        for(i=0; i<userlist.length; i++){
            user_table.push(<td>{userlist[i].user_id}</td>)
        }
        return(
            user_table
        )
    }

    const listBtn = async () =>{
       alert("check")
    }

    const sub_btn = async () =>{
        alert("^^")
    }



    const search_btn= async () =>{
        var i=0;
        var search_boardNum = "";
        var index = selectBox.indexOf("]");
      
    

        search_boardNum = selectBox.substring(1,index);

        console.log(search_boardNum);
    
        //회원목록 조회
        await axios
            .get(baseUrl + "/board/searchboard", {
                params:
                {
                    board_code:search_boardNum,

                }
            }

            ).then((response) => {
                setUserList(response.data)
             
             

            })

            .catch((error) => {
                console.log(error)
                alert("조회된 데이터가 없습니다.");
              


            })

            async function call() {
                await axios
                    .get(baseUrl + '/board/viewBoard', { params: { board_code: search_boardNum } })
                    .then((response) => {
                        //console.log(response.data)
                       
    
    
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
            call();
        

            

            

            

    }


    
    return (
       

        <div>
            <div class="div_1">
              

                <div class="div_2">
            
                
                    <div class="div_2_1">
                       
                        <a class="fir_a">나의 강의목록
                            <a clas="box">
                            <select class="select_box" id="select" onChange={(e) => {setselectBox(e.target.value)}}>
                                <option>목록</option>
                            {temp()}
                           
                        </select>
                        </a>
                        </a>
                     
                        <img  class="search_img"  src='/img/search_1.png' onClick={search_btn}/>
                       
                       <a class="hi_name">{sessionStorage.getItem('user_id')}트레이너님 안녕하세요!</a>
                    </div>
                    
                    
                    </div>
                <div class="div_3">
                    <div class="div_4">
                   
                        수강신청 회원

                        <table>
                            <thead>
                                <tr>
                                   <th>아이디</th> 
                                   <th>수강현황</th> 
                                   <th>신청</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    {userList()}
                                    <td>값</td>
                                    <td type="button" onClick={sub_btn}>신청</td> 
                                    </tr>

                                </tbody>
                            
                        </table>
                   
                </div>
                {/* <div class="input_div">
                <p>아침<input type="text"/></p>
                <p>점심<input type="text"/></p>
                <p>저녁<input type="text"/></p>
                <p>간식<input type="text"/></p>
                <p>총 칼로리<input type="text"/></p>
                <p>기타<input type="text"/></p>
                
                </div> */}
                </div>
               
            
                </div>
                 
              
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        </div>

    )

  

    


    
}








export default TeacherBoard;