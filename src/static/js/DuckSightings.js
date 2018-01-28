import React from 'react';
import axios from 'axios';
import DuckInfo from './DuckInfo.js';

class DuckSightings extends React.Component {
    constructor(props) {
        super(props);
        this.sightings = [];
    }

    componentDidMount() {
        axios.get('localhost:8081/sightings')
            .then(res => {
                this.sightings = JSON.parse(res);
            });
    }

    render() {
        return (
            <div className='container duck-sightings'>
                this.sightings.map((sighting) =>
                    <DuckInfo sighting={sighting} />
                );
            </div>
        );
    }
}

export default DuckSightings;