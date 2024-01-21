import React from 'react';
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
              />
            </div>
          ))}
        </ul>
        {this.setState({})}
      </div>
    );

    return (
      <div>
        <div>
          <CoolDiv element={mainForm} up={40} left={10} width={10} height={20} />
        </div>
      </div>
    );
  }
}

export default SignUp;