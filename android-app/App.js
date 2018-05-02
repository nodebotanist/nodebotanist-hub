import React, { Component } from 'react'
import { Platform, StyleSheet, Switch } from 'react-native'
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text
} from 'native-base'
import mqtt from 'rn-mqtt'
import NfcManager, { NdefParser } from 'react-native-nfc-manager'

const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item
  },
  getItem: key => myStorage[key],
  removeItem: key => {
    delete myStorage[key]
  }
}

type Props = {}
export default class App extends Component<Props> {
  state = {}

  readNFC = () => {
    NfcManager.start({
      onSessionClosedIOS: () => {
        console.log('ios session closed')
      }
    })
      .then(result => {
        console.log('start OK', result)
        NfcManager.registerTagEvent(
          tag => {
            console.log('Tag Discovered', tag)
          },
          'Hold your device over the tag',
          true
        )
      })
      .catch(error => {
        console.warn('device does not support nfc!')
        this.setState({ supported: false })
      })
  }

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
            <Title>Nodebotanist's NFC Hub</Title>
          </Body>
        </Header>
        <Content>
          <Button full success title="Read NFC Tag" onPress={this.readNFC}>
            <Icon type="MaterialCommunityIcons" name="nfc" />
            <Text>Read NFC Tag</Text>
          </Button>
          <Text>NFC Tag Info:</Text>
        </Content>
        <Footer />
      </Container>
    )
  }
  componentDidMount() {
    const client = new mqtt.connect('mqtt://192.168.1.107:1883')

    client.on('connectionLost', responseObject => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage)
      }
    })

    client.on('message', message => {
      console.log(message.payloadString)
    })

    // connect the client
    client.on('connect', () => {})
  }
}

const styles = StyleSheet.create({})
