//imports up here
import React from 'react';

//everything else here
class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: []
        }
    }
        
    render() {
        return(
            <button >
                Button Topic1
            </button>
        )
    }
       
}

export default Homepage;