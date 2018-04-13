import React, { Component } from 'react';
import {
  Platform,
  StyleSheet
} from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { Client, Message } from 'react-native-paho-mqtt';

const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Hi!</Title>
          </Body>
        </Header>
        <Content>

        </Content>
        <Footer>

        </Footer>
      </Container>
    );
  }  
  componentDidMount() {
    const client = new Client({ uri: 'ws://192.168.1.107:1883/ws', clientId: 'clientId', storage: myStorage });
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage);
      }
    });
    client.on('messageReceived', (message) => {
      console.log(message.payloadString);
    });
    
    // connect the client
    client.connect()
      .then(() => {
        // Once a connection has been made, make a subscription and send a message.
        console.log('onConnect');
        return client.subscribe('World');
      })
      .then(() => {
        setInterval(() => {
          const message = new Message('Hello');
          message.destinationName = 'Hello';
          client.send(message);
        }, 5000)
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          console.log('onConnectionLost:' + responseObject.errorMessage);
        }
      })
    ;    
  }
}

const styles = StyleSheet.create({});
