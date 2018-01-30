import React from 'react';
import { Button, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import logo from '../img/rubberduck.png';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: this.props.url
        }
        this.saveUrl = this.saveUrl.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            url: e.target.value
        });
    }

    saveUrl() {
        if(this.state.url)
            this.props.update(this.state.url);
    }

    render() {
        if(!this.props.development) {
            return (
                <div className='container header-container'>
                    <div className='header'>
                        <img src={logo} />
                        <h1>{this.props.name}</h1>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='container header-container'>
                    <div className='header'>
                        <h1>{this.props.name}</h1>
                    </div>
                    <div className='dev-bar'>
                        <Form inline>
                            <FormGroup controlId='formUrl'>
                                <ControlLabel>This is a development build! Enter URL of API-server</ControlLabel>
                                <FormControl
                                type='text'
                                value={this.state.url}
                                onChange={this.handleChange}
                                />
                                <Button bsStyle='info' onClick={this.saveUrl}>Save</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            );
        }
    }
}