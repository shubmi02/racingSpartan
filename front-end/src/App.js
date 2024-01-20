import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';




function App() {
  async function testGet(e) {
    e.preventDefault();
    let response = await axios.post('http://localhost:5000/api/test');
    console.log(response.data);
  }

  return (
    <div className="App">
       {/* <button onClick={async (e)=> await testGet(e)}>cock</button> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" />} />
          <Route path="/homepage" element={<Homepage/>} />
          <Route path="/science" element={<Science/>} />
          //{/* <Route path="/homepage" element={<SquishList />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
