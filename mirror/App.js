import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import {Permissions} from 'expo';
import {Container, Content} from 'native-base';
import Swiper from 'react-native-swiper'

import CameraComponent from './components/camera'

const styles = StyleSheet.create({
  slideDefault:{
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#9DD6EB"
  },
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})
export default class App extends React.Component {

  render() {

      return (
        <Swiper ref='swiper' loop={false} showsPagination={false} index={0} removeClippedSubviews={true}>
        <View style={{flex: 1}}>
          <CameraComponent>
          </CameraComponent>
        </View>
        <View style={styles.slide1}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide1}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
      );

  }
}
