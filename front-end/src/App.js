import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Reader from './pages/Reader';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AddArticle from './pages/AddArticle';


function App() {
  async function testGet(e) {
    e.preventDefault();
    let response = await axios.post('http://localhost:5000/api/test');
    console.log(response.data);
  }

  return (
    <div className="App" style={{background: 'green', margin: '0', height: '100vh', width: '100vw'}}>
       {/* <button onClick={async (e)=> await testGet(e)}>cock</button> */}
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/reader" element={<Reader/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/add-article" element={<AddArticle/>} />
          {/* btw the path should be changed in the above one to class/id/reader
           <Route path="/homepage" element={<SquishList />} /> */}
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
