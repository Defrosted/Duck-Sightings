import ReactDOM from 'react-dom';
import React from 'react';
import DuckSightings from './DuckSightings.js';
import Header from './Overlay.js';

class App extends React.Component {
    render() {
        return (
            <div className='wrapper'>
                <Header name='Bird Spotters United'/>
                <DuckSightings />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);