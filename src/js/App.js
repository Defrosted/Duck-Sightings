import ReactDOM from 'react-dom';
import React from 'react';
import DuckSightings from './DuckSightings.js';
import Header from './Overlay.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://localhost'
        };
        this.updateUrl = this.updateUrl.bind(this);
    }

    updateUrl(url) {
        this.setState({
            url: url
        })
        console.log(this.state.url);
    }

    render() {
        return (
            <div className='wrapper'>
                <Header name='Duck Spotters United'
                  update={this.updateUrl}
                  url={this.state.url}
                  development={true}
                />
                <DuckSightings url={this.state.url}/>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);