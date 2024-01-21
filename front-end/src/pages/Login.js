import React from 'react';
import axios from 'axios';
import CoolDiv from '../components/CoolDiv';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    const server_url = process.env.SERVER_URL;
  }
  
  async handleSubmit(e) {
    e.preventDefault();

    const body = this.state;
    console.log(body);
    try {
      console.log(this.server_url);
      const res = await axios.post(`http://localhost:5000/api/login`, body);
      if (res.data) {
        console.log('login successful');
        localStorage.setItem('uid', res.data);
        window.location.href = '/contact';
      }
      else {
        console.log('login failed');
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  render() {
    const newState = {};
    const formFields = Object.keys(this.state);

    const mainForm = (
      <div>
        <ul>
          {formFields.map((key) => (
            <div key={key}>
              <input
                onChange={(e) => {
                  newState[key] = e.target.value;
                  this.setState(newState);
                }}
                placeholder={`enter ${key}`}
                style={{ width: '20vw', padding: '0.5vw' }}
              />
            </div>
          ))}
        </ul>
      </div>
    );

    const submitButton = (
      <div>
        <button onClick={async (e) => await this.handleSubmit(e)}>Login</button>
      </div>
    );

    return (
      <div>
        <div>
          <CoolDiv element={mainForm} up={35} left={35} width={20} height={20} />
        </div>
        <div>
          <CoolDiv element={submitButton} up={47} left={38} width={20} height={20} />
        </div>
      </div>
    );
  }
}

export default Login;