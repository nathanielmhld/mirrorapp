import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, AsyncStorage, Image } from 'react-native';
import {Permissions} from 'expo';
import {Container, Content} from 'native-base';
import Swiper from 'react-native-swiper';

import CameraComponent from './components/camera';

import ConfigCamera from './components/configcamera';
import MediaComponent from './components/media';

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
  state = {
    userID: -1
  }
  async componentDidMount(){
    const value = await AsyncStorage.getItem('userID');
    this.setState({userID: value})
    console.log(value)
  }
  render() {
    const {userID} = this.state
    console.log("userID:" + userID);
    if(userID == -1){
      return (
        <Swiper ref='swiper' loop={false} showsPagination={false} index={0} removeClippedSubviews={true}>
        <View style={{flex: 1}}>
          <CameraComponent>
          </CameraComponent>
        </View>
        <View style={{flex: 1}}>
          <MediaComponent>
          </MediaComponent>

        </View>

      </Swiper>
      );
    }else{
      return (
      <View style={{flex: 1}}>
          <ConfigCamera>
          </ConfigCamera>
        </View>
        );
    }
  }
}
