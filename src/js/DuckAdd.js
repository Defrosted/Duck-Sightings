import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Modal, Button, Form, FormControl, FormGroup,
    HelpBlock, ControlLabel, FormControlFeedback } from 'react-bootstrap';

export default class DuckAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            url: this.props.url,
            dateString: moment().format('HH:mm, DD.MM.YYYY'),
            description: '',
            species: [],
            selSpecies: '',
            count: '1'
        };

        this.fetchSpecies = this.fetchSpecies.bind(this);
        this.addNew = this.addNew.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleCountChange = this.handleCountChange.bind(this);
        this.handleSpecChange = this.handleSpecChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //Update URL if changed
        if(this.props.url != nextProps.url) {
            this.setState({
                url: nextProps.url
            });
            this.fetchSpecies(nextProps.url);
        }
    }

    componentDidMount() {
        this.fetchSpecies(this.props.url);
    }

    componentWillUnmount() {
        //Cancel possible AJAX requests
        this.reqToken.cancel();
        this.sendToken.cancel();
    }

    fetchSpecies(url) {
        //Set up cancel-token
        this.reqToken = axios.CancelToken.source();
        //AJAX-request
        axios.get(url + '/species', {
            cancelToken: this.reqToken.token
            })
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    species: result.data,
                    selSpecies: result.data[0].name
                });
            })
            .catch(thrown => {
                if(!axios.isCancel(thrown))
                    console.log('Error ' + thrown.message);
            })
    }

    addNew() {
        //Validate
        if(this.validateCount() != 'error'
        && this.validateTimeString() != 'error'
        && this.validateSpecies() != 'error') {
            this.sendToken = axios.CancelToken.source();
            axios.post(this.props.url + '/sightings', {
                dateTime: moment.utc(this.state.dateString, 'HH:mm, DD.MM.YYYY', true).toISOString(),
                description: this.state.description,
                species: this.state.selSpecies,
                count: parseInt(this.state.count)
            }, {
                cancelToken: this.sendToken.token
            })
            .then(() => {
                this.props.toggle();
                this.props.callback(this.state.url);
            })
            .catch(thrown => {
                if(!axios.isCancel(thrown))
                    console.log('Error ' + thrown.message);
            })
        }
    }

    //Handle form time-field change
    handleTimeChange(e) {
        this.setState({
            dateString: e.target.value
        });
    }

    //Validate form time-field
    validateTimeString() {
        const date = moment(this.state.dateString, 'HH:mm, DD.MM.YYYY', true);
        //Date is valid and <= than current time.
        if(date.isValid() && date.valueOf() <= moment.utc().valueOf()) {
            return null;
        } else
            return 'error';
    }

    //Handle form description-field change
    handleDescChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    //Handle form count-field change
    handleCountChange(e) {
        this.setState({
            count: e.target.value
        })
    }

    //Validate form count-field
    validateCount() {
        const n = parseInt(this.state.count);
        if(n != NaN && n > 0)
            return null;
        else
            return 'error';
    }

    //Handle form species-field change
    handleSpecChange(e) {
        this.setState({
            selSpecies: e.target.value
        })
    }

    //Validate species so user can't ie. inject invalid values by adding a new <option> through dev-tools
    validateSpecies() {
        var validSpecies = false;
        for(var i = 0; i < this.state.species.length; i++) {
            if(this.state.species[i].name == this.state.selSpecies)
                validSpecies = true;
        }

        return ((validSpecies) ? null : 'error');
    }

    render() {
        if(!this.props.visible)
            return null;
        else if(!this.state.isLoaded) {
            return (
                <Modal show={this.props.visible}>
                    <Modal.Header closeButton onClick={this.props.toggle}>
                        <Modal.Title>Loading...</Modal.Title>
                    </Modal.Header>
                </Modal>
            );
        } else {
            return (
                <Modal show={this.props.visible}>
                    <Modal.Header closeButton onClick={this.props.toggle}>
                        <Modal.Title>Add new sighting</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormGroup
                              controlId='formSpecies'
                              validationState={this.validateSpecies()}
                            >
                                <ControlLabel>Select species</ControlLabel>
                                <FormControl
                                  componentClass='select'
                                  onChange={this.handleSpecChange}
                                >
                                    {this.state.species.map(species => {
                                        return (<option key={species.name} value={species.name}>{species.name}</option>)
                                    })}
                                </FormControl>
                            </FormGroup>
                            <FormGroup
                              controlId='formCount'
                              validationState={this.validateCount()}
                            >
                                <ControlLabel>Amount seen</ControlLabel>
                                <FormControl
                                  type='text'
                                  value={this.state.count}
                                  onChange={this.handleCountChange}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>Values above zero are valid.</HelpBlock>
                            </FormGroup>
                            <FormGroup
                              controlId='formTime'
                              validationState={this.validateTimeString()}
                            >
                                <ControlLabel>Time of sighting</ControlLabel>
                                <FormControl
                                  type='text'
                                  value={this.state.dateString}
                                  onChange={this.handleTimeChange}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>Format 'HH:mm, DD.MM.YYYY'. Only past times are allowed.</HelpBlock>
                            </FormGroup>
                            <FormGroup
                              controlId='formDesc'
                            >
                                <ControlLabel>Description</ControlLabel>
                                <FormControl 
                                  type='text'
                                  value={this.state.description}
                                  placeholder='Additional info...'
                                  onChange={this.handleDescChange}
                                />
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle='success' onClick={this.addNew}>Add</Button>
                        <Button bsStyle='info' onClick={this.props.toggle}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            );
        }
    }
}