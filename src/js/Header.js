import React from 'react';
import { Button, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import logo from '../img/rubberduck.png';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            url: e.target.value
        });
    }

    render() {
        return (
            <div className='container header-container'>
                <div className='header'>
                    <img className='logo' src={logo} />
                    <h1>{this.props.name}</h1>
                </div>
            </div>
        );
    }
}