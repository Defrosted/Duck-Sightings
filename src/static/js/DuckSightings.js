import React from 'react';
import axios from 'axios';
import DuckInfo from './DuckInfo.js';
import Button from 'react-bootstrap/lib/Button';

class DuckSightings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            sortNewest: true,
            sightings: []
        };
        this.changeSort = this.changeSort.bind(this);
    }

    componentDidMount() {
        this.fetchSightings();
    }

    componentWillUnmount() {
        //Cancel possible AJAX requests
        this.reqToken.cancel();
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

    changeSort() {
        this.setState({
            sortNewest: ((this.state.sortNewest) ? false : true)
        });
    }

    render() {
        const { isLoaded, sortNewest, sightings } = this.state;
        sightings.sort((a, b) => {
            a = new Date(a.dateTime);
            b = new Date(b.dateTime);
            return (sortNewest) ? b.getTime() - a.getTime() : a.getTime() - b.getTime();
        });

        if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            //Actual render
            return (
                <div className='container duck-sightings'>
                    <div className='sightings-header'>
                        <h2>Recent duck sightings</h2>
                        <Button bsStyle='info' onClick={this.changeSort}>
                            {(sortNewest) ? "Newest" : "Oldest"}
                        </Button>
                    </div>
                    {sightings.map(sighting => {
                        return <DuckInfo key={sighting.id} sighting={sighting} />
                    })}
                </div>
            );
        }
    }
}

export default DuckSightings;