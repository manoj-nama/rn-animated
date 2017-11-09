import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import Box from './components/Swiper';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Header /> */}

        <Box />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
