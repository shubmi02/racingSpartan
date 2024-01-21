import React from 'react';
import axios from 'axios';
import CoolDiv from '../components/CoolDiv';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
    };
  }
  
  async handleSubmit(e) {
    e.preventDefault();

    let response = axios.post(`http://localhost:5000/api/signup`);
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
        <button onClick={async (e) => await this.handleSubmit()}>Sign Up</button>
      </div>
    );

    return (
      <div>
        <div>
          <CoolDiv element={mainForm} up={35} left={35} width={20} height={20} />
        </div>
        <div>
          <CoolDiv element={mainForm} up={35} left={35} width={20} height={20} />
        </div>
      </div>
    );
  }
}

export default SignUp;