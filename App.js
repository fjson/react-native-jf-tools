/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Animated} from 'react-native';
import {JRNMarquee} from "./src/component/JRNMarqueen/JRNMarqueen";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    text:'跑马灯'
  };

  render() {
    return (
      <View style={styles.container}>
          <View style={{ }}>
              <JRNMarquee text={this.state.text} style={{ color:'red' }}/>
          </View>
      </View>
    );
  }

  componentDidMount() {
    setTimeout(() => {
        this.setState({
            text:'跑马灯1111111111跑马灯2222222adhahaskasbadhahdkajhwiyqeioweqweakjhdakjsdhuqwyeuqe',
            width:300
        })
    },2000)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
