import React from 'react';

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div style={{
                // border: 'solid',
                borderRadius: '2vh',
                overflow: 'hidden',
                backgroundColor: `rgba(100,100,255, 1)`,
                color: 'black',
                padding: '2%',
                display: 'flex'
                alignItems: '50%',
                justifyContent: '50%'

            }}>
                {console.log(this.props.articleNames)}
                <div style={{
                    // border: 'solid',
                    width: '70%',
                    borderWidth: '1px',
                    borderRadius: '0.8vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}>
                    {
                        <ol>
                            {
                                this.props.articleNames.map((articleName, index) => {
                                    return (
                                        <div key={index} style={{}}>
                                            <p>{articleName}</p>
                                        </div>
                                    );
                                })
                            }
                        </ol>
                    }
                </div>
            </div>
        )
    }

}

export default ArticleList;