import React from 'react';
import moment from 'moment';

class DuckInfo extends React.Component {
    constructor(props) {
        super(props);
        this.sighting = props.sighting;
    }

    formatTime(time) {
        function pad(n) {
            return ('0' + n).slice(-2);
        }

        const date = moment(time, 'YYYY-MM-DD-HH:mm:ssZ');
        date.utc();
        return pad(date.hour()) + ':' + pad(date.minute())
        + ', on ' + pad(date.date()) + '.' + pad(date.month()+1) + '.' + date.year();
    }
    
    render() {
        return(
            <ul className='sighting'>
                <li>Species: {this.sighting.species}</li>
                <li>Sighted {this.sighting.count} individual(s)</li>
                <li>Seen at {this.formatTime(this.sighting.dateTime)}</li>
                <li>Additional info: {this.sighting.description}</li>
            </ul>
        );
    }
}

export default DuckInfo;