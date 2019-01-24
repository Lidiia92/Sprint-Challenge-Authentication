import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup, ListGroupItem  } from 'react-bootstrap';
import styled from 'styled-components';

const JokesWrapper = styled.div`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;


class JokesList extends Component {
    state = {
      jokes: []
    }

  componentDidMount(){
      this.getData();
  }

  async getData() {
    try {
      const endpoint = 'http://localhost:3300/api/jokes';
      const token = localStorage.getItem('jwtToken');

      const options = {
        headers: {
          Authorization: token
        }
      }
      const res = await axios.get(endpoint, options);
      const { data } = await res;
      console.log(res.data.value);
      this.setState({
        jokes: res.data.value
      })
      console.log('State', this.state);
    }
    catch (err) {
      console.error('ERR', err)
    }
  }

  render() {
    return (
      <JokesWrapper >
          <ListGroup>
          <ListGroupItem>{this.state.jokes.joke}</ListGroupItem>
          </ListGroup>
      </JokesWrapper>
    );
  }
}

export default JokesList;