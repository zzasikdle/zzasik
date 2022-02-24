import './App.css';

import Home from './home';
import WriteBoard from './board/writeboard';
import BoardList from './board/boardList';



import {Route, Routes, BrowserRouter} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div id='container'>
         
       
          <div> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/writeboard" element={<WriteBoard />} />
              <Route path="/board/list" element={ < BoardList />} />
        
              
              
            </Routes> 
          </div>
       
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;