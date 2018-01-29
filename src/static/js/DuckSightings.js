import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Button from 'react-bootstrap/lib/Button';
import DuckInfo from './DuckInfo.js';
import DuckAdd from './DuckAdd.js';

export default class DuckSightings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            sortNewest: true,
            showModal: false,
            sightings: []
        };
        this.changeSort = this.changeSort.bind(this);
        this.fetchSightings = this.fetchSightings.bind(this);
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

    sortSightings(sightings) {
        sightings.sort((a, b) => {
            a = moment(a.dateTime);
            b = moment(b.dateTime);
            return (this.state.sortNewest) ? b.unix() - a.unix() : a.unix() - b.unix();
        });
    }

    toggleModal() {
        this.setState({
            showModal: ((this.state.showModal) ? false : true)
        });
    }

    render() {
        const { isLoaded, showModal, sortNewest, sightings } = this.state;
        this.sortSightings(sightings);

        if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            //Actual render
            return (
                <div className='container duck-sightings'>
                <DuckAdd visible={showModal} sightings={this.state.sightings} callback={this.fetchSightings} />
                    <div className='sightings-header'>
                        <h2>Recent duck sightings</h2>
                        <div className='sightings-header-buttons'>
                            <label>Sort by:</label>
                            <Button bsStyle='info' onClick={this.changeSort}>
                                {(sortNewest) ? "Newest" : "Oldest"}
                            </Button>
                            <Button bsStyle='success' onClick={this.toggleModal}>
                                Add sighting
                            </Button>
                        </div>
                    </div>
                    {sightings.map(sighting => {
                        return <DuckInfo key={sighting.id} sighting={sighting} />
                    })}
                </div>
            );
        }
    }
}