import React, { Component } from 'react';
import {
  View,
  Animated,
  Text,
  StyleSheet,
  PanResponder,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Swiper extends Component {

  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    this.width = new Animated.Value(100);
    this.color = new Animated.Value(0);
    this.opacity = new Animated.Value(0);

    this.responder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gesture) => {
        this.position.setValue({
          y: gesture.dy
        });
        this.width.setValue(100 + Math.abs(gesture.dy));
        this.color.setValue(gesture.dy);
        this.opacity.setValue(gesture.dy);
      },
      onPanResponderRelease: (evt, gesture) => {
        Animated.parallel([
          Animated.timing(this.width, {
            toValue: 100,
            duration: 250,
          }),
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 }
          }),
          Animated.timing(this.color, {
            toValue: 0
          }),
          Animated.timing(this.opacity, {
            toValue: 0
          })
        ]).start()
      }
    });
  }

  render() {
    return (
      <Animated.View {...this.responder.panHandlers}
        style={[
          styles.box,
          this.position.getLayout(),
          { width: this.width },
          {
            opacity: this.opacity.interpolate({
              inputRange: [-width, 0, width],
              outputRange: [0, 1, 0]
            })
          },
          {
            backgroundColor: this.color.interpolate({
              inputRange: [-width, 0, width],
              outputRange: ['#22dd22', '#dd2222', '#2222dd']
            })
          }
        ]}
      >
        <Text style={{ color: '#fff' }}>Drag me</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#D2235C',
    width: 100,
    height: 100,
    borderRadius: 5,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
});