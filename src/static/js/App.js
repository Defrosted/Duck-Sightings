import ReactDOM from 'react-dom';
import React from 'react';
import DuckSightings from './DuckSightings.js';

class App extends React.Component {
    render() {
        return (
            <div className='container'>
                <DuckSightings />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);