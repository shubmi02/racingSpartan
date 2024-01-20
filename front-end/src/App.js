import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {

  async function testGet(e) {
    e.preventDefault();
    let response = await axios.post('http://localhost:5000/api/test');
    console.log(response.data);
  }
  return (
    <div className="App">
      <button onClick={async (e)=> await testGet(e)}>cock</button>
    </div>
  );
}

export default App;
