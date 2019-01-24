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
      console.log(data)
      this.setState({
        jokes: res.data.value.joke
      })
    }
    catch (err) {
      console.error('ERR', err)
    }
  }

  render() {
    return (
      <JokesWrapper >
          <ListGroup>
            {this.state.jokes.map (joke => <ListGroupItem key={joke.value.id}>{joke.value.joke}</ListGroupItem>)}
          </ListGroup>;
      </JokesWrapper>
    );
  }
}

export default JokesList;