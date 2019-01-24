import React, {Component} from "react";
import axios from 'axios';
import { Form,  FormGroup, Col, FormControl, Button, ControlLabel  } from 'react-bootstrap';
import styled from 'styled-components';
import '../App.css';

/* Component */

const Input = styled(FormControl)`
    width: 600px;
`;

const FormWrapper = styled.div`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
`;


class Register extends Component {

    state = {
        username: '',
        password: '', 
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const endpoint = 'http://localhost:3300/api/register';
            const res = await axios.post(endpoint, this.state);
            const { data } = await res;
            console.log('test', data);
            localStorage.setItem('jwtToken', res.data.token);
            this.clearState();
            this.props.visitpage();
        }
        catch(err){
            console.log('ERROR', err);
        }
        
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name] : value
        })
    }

    clearState = () => {
        this.setState({
            username: '',
            password: '',
        })
    }


    render(){
        return (
            <FormWrapper>
                <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                    Username
                    </Col>
                    <Col sm={10}>
                    <Input type="text" 
                        name="username"
                        value={this.state.username} 
                        onChange={this.handleChange}
                        placeholder="Username" />
                    </Col>
                </FormGroup>
    
                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                    Password
                    </Col>
                    <Col sm={10}>
                    <Input type="password" 
                        name="password"
                        value={this.state.password} 
                        onChange={this.handleChange}
                        placeholder="Password" />
                    </Col>
                </FormGroup>
    
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                    <Button type="submit">Sign up</Button>
                    </Col>
                </FormGroup>
                </Form>
            </FormWrapper>
        );
    }
  };
  
  export default Register;