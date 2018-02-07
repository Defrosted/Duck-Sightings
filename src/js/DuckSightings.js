import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import Loading from 'react-loading-components';
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
        this.toggleModal = this.toggleModal.bind(this);
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
        axios.get(this.props.url + '/sightings', {
            cancelToken: this.reqToken.token
            })
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    sightings: result.data
                });
            })
            .catch((thrown) => {
                if(!axios.isCancel(thrown))
                    console.log('Error ' + thrown.message);
            });
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
            showModal: !this.state.showModal
        });
    }

    render() {
        const { isLoaded, showModal, sortNewest, sightings } = this.state;
        this.sortSightings(sightings);

        const headerButtons = (
            <div className='sightings-header-buttons'>
                <label>Sorted by:</label>
                <Button bsStyle='info' onClick={this.changeSort}>
                    {(sortNewest) ? "Newest" : "Oldest"}
                </Button>
                <Button bsStyle='success' onClick={this.toggleModal}>
                    Add sighting
                </Button>
            </div>
        );
        const listOfSightings = sightings.map(sighting => {
            return <DuckInfo key={sighting.id} sighting={sighting} />
        });

        const loadingElement = (
            <div className='loading'>
                <Loading 
                    className='loading'
                    type='oval' width={100} height={100}
                    fill='#558C89'
                />
            </div>
        );

        return (
            <div className='container sightings-container'>
                <DuckAdd 
                    fetchSightings={this.fetchSightings}
                    toggleModal={this.toggleModal}
                    url={this.props.url}
                    visible={this.state.showModal}
                />
                <div className='sightings-header'>
                    <h2>Recent duck sightings</h2>
                    {(!isLoaded) ? "" : headerButtons }
                </div>
                <div className='duck-sightings'>
                    {(!isLoaded) ? loadingElement : listOfSightings }
                </div>
            </div>
        );
    }
}