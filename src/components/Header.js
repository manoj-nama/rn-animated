import React, { Component } from 'react';
import {
  View,
  Animated,
  Text,
  StyleSheet,
  Easing,
  TouchableOpacity
} from 'react-native';

export default class Header extends Component {

  state = {
    pos: 0
  }

  componentWillMount() {
    this.pos = new Animated.Value(0);
  }

  animate = () => {
    if (this.state.pos === 500) {
      this.setState({ pos: 0 });
      return this.pos.setValue(0);
    }
    Animated.timing(this.pos, {
      toValue: 500,
      easing: Easing.bounce,
      duration: 1000,
    }).start(() => {
      this.setState({ pos: 500 });
    });
  }

  render() {
    return (
      <Animated.View style={[styles.container, { top: this.pos }]}>
        <TouchableOpacity onPress={this.animate}>
          <Text style={styles.text}>This will animate</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fc0'
  },
  text: {
    padding: 20,
    textAlign: 'center',
    color: '#000'
  }
});