import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Switch
} from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import mqtt from 'rn-mqtt'

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
            <Title>LED controller</Title>
          </Body>
        </Header>
        <Content>
          <Button full success onPress={(value)=> {this.toggleLED(value)}}>
            <Text>Toggle LED</Text>
          </Button>
        </Content>
        <Footer>

        </Footer>
      </Container>
    );
  }  
  componentDidMount() {
    const client = new mqtt.connect('mqtt://192.168.1.107:1883');
    
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage);
      }
    });

    client.on('message', (message) => {
      console.log(message.payloadString);
    });
    
    // connect the client
    client.on('connect', () => {
        client.subscribe('Hello')
        setInterval(() => {
          client.publish('Hello', 'from the note!');
        }, 5000)
    })
  }
  toggleLED(value) {
    console.log(value)
  }
}

const styles = StyleSheet.create({});
