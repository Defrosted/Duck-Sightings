import React from 'react';

class DuckInfo extends React.Component {
    render() {
        return(
            <div className='sighting'>
                <ul>
                    <li>ID {props.id}</li>
                    <li>Species: {props.species}</li>
                    <li>Amount: {props.count}</li>
                    <li>Sighted at {props.dateTime}</li>
                    <li>Additional info: {props.description}</li>
                </ul>
            </div>
        );
    }
}

export default DuckInfo;