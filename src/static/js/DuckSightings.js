import React from 'react';
import axios from 'axios';
import DuckInfo from './DuckInfo.js';

class DuckSightings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            sightings: []
        };
    }

    componentDidMount() {
        this.fetchSightings();
    }

    fetchSightings() {
        this.reqToken = axios.CancelToken.source();
        axios.get('http://localhost:8081/sightings', {
            cancelToken: this.reqToken.token
            })
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    sightings: result.data
                });
            })
            .catch(thrown => {
                if(!axios.isCancel(thrown))
                    console.log('Error ' + thrown.message);
            })
    }

    componentWillUnmount() {
        //Cancel possible AJAX requests
        this.reqToken.cancel();
    }

    render() {
        const { isLoaded, sightings } = this.state;
        if (!isLoaded) {
            return <div>Loading sightings...</div>
        } else {
            return (
                <div className='container duck-sightings'>
                    {sightings.map(sighting => {
                        return <DuckInfo key={sighting.id} sighting={sighting} />
                    })}
                </div>
            );
        }
    }
}

export default DuckSightings;