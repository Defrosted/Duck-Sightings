import ReactDOM from 'react-dom';
import React from 'react';
import DuckSightings from './DuckSightings.js';
import Header from './Header.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        //Setting for the url of the dev-server
        this.state = {
            url: 'http://localhost:8081'
        };
    }

    render() {
        return (
            <div className='wrapper'>
                <Header name='Duck Spotters United' />
                <DuckSightings url={this.state.url}/>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);