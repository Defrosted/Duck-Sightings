import React from 'react';

class DuckInfo extends React.Component {
    constructor(props) {
        super(props);
        this.sighting = props.sighting;
    }

    formatTime(time) {
        function pad(n) {
            return ('0' + n).slice(-2);
        }

        const date = new Date(time);
        return pad(date.getHours()) + ':' + pad(date.getMinutes())
        + ', on ' + pad(date.getDay()) + '.' + pad(date.getMonth()) + '.' + date.getFullYear();
    }
    
    render() {
        return(
            <div className='sighting'>
                <ul>
                    <li>Species: {this.sighting.species}</li>
                    <li>Sighted {this.sighting.count} individual(s)</li>
                    <li>Sighted at {this.formatTime(this.sighting.dateTime)}</li>
                    <li>Additional info: {this.sighting.description}</li>
                </ul>
            </div>
        );
    }
}

export default DuckInfo;