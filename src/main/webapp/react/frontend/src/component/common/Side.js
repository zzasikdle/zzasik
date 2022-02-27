import './Side.css';
import React from 'react';
import { Link } from 'react-router-dom';


const Side = ( ) => {
    return (     
        <div id='sidebar-left'>
          <h1>사이드 </h1>
            <nav>
              <ul>
                  <li className="no-underline" >
                    <Link  to="/">홈</Link>                
                  </li>
                  <li className="no-underline">
                    <Link to ="/board/list">게시판관리</Link> 
                  </li>
                  <li className="no-underline">
                    <Link to="/shop">상품관리</Link>
                  </li>
              </ul>		    
          </nav>    
      </div>
    ) 
 };
 
 export default Side;