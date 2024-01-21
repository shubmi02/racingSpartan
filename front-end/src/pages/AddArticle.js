import React from 'react';
import CoolDiv from '../components/CoolDiv';
import axios from 'axios'

class AddArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classID : '65ad0d007c6ced0d27710f9c', //localStorage.getItem('classID'),
            articleName: '',
            file: null
        };
    }

    handleDragOver(e) {
        e.preventDefault();
    }


    async handleDrop(e) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();


        if (file) {
            reader.onloadend = () => {
                const base64String = reader.result;
                this.setState({file: base64String});
            }
        }  

        reader.readAsDataURL(file);
        console.log(this.state.file);
    }

    async handleSubmit(e) {
        e.preventDefault();
        let body = {
            file: this.state.file,
            articleName: this.state.articleName,
            classID: this.state.classID
        }
        const jsonString = JSON.stringify(body);

        // Create a TextEncoder instance
        const textEncoder = new TextEncoder();

        // Encode the JSON string to a Uint8Array (byte array)
        const encodedBytes = textEncoder.encode(jsonString);

        // Get the length of the byte array (size in bytes)
        const byteSize = encodedBytes.length;

        console.log(`Size of JSON object: ${byteSize} bytes`);
        let response = await axios.post('http://localhost:5000/api/addArticle', body);
        if (response.data == 1) {
            console.log('good add');
        }
        else {
            console.log('add failed');
        }
    }


    render() {
        const dropZone = (
            <div
                onDrop={async (e) => await this.handleDrop(e)}
                onDragOver={(e) => this.handleDragOver(e)}
                style={{
                    backgroundColor: 'red',
                    width: '30vw',
                    height: '30vh'
                }}

            >
                {this.state.file ? (
                    <img src={this.state.file} />
                ) : (
                    <p>drop file. only pdf!</p>
                )}
            </div>
        );

        const bottom = (
            <div>
                <input
                    onChange={(e) => {
                        this.setState({ articleName: e.target.value });
                    }}
                    placeholder={`enter article name`}
                    style={{ width: '30vw' }}
                />
                <button onClick={async (e)=>{await this.handleSubmit(e)}}>add article</button>
            </div>

        );
        return (
            <div >
                <div>
                    <CoolDiv element={dropZone} up={1} left={37} width={20} height={20} />
                </div>
                <div>
                    <CoolDiv element={bottom} up={38} left={36.9} width={20} height={10} />
                </div>
            </div>
        )
    }

}

export default AddArticle;

