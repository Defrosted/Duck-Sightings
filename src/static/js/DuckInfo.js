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

        const date = moment.utc(time, 'YYYY-MM-DD-HH:mm:ssZ');
        return date.format('HH:mm, DD.MM.YYYY');
    }
    
    render() {
        return(
            <ul className='sighting'>
                <li>
                    <div>Species:</div>
                    <div>{this.sighting.species}</div>
                </li>
                <li>
                    <div>Sighted amount:</div>
                    <div>{this.sighting.count}</div>
                </li>
                <li>
                    <div>Seen at:</div>
                    <div>{this.formatTime(this.sighting.dateTime)}</div>
                </li>
                <li>
                    <div>Additional info:</div>
                    <div>{this.sighting.description}</div>
                </li>
            </ul>
        );
    }
}

export default DuckInfo;