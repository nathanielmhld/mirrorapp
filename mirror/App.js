import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import {Permissions} from 'expo';
import {Container, Content} from 'native-base';
import Swiper from 'react-native-swiper'

import Camera from './components/camera'

const styles = StyleSheet.create({
  slideDefault:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#9DD6EB"
  }
})
export default class App extends React.Component {

  render() {
    
      return (
        <Container>
          <Content>
            <Swiper showsPagination={false}>
          <View style={{flex: 1}}>
            <Camera>
            </Camera>
          </View>
          <View style={styles.slideDefault}>
                <Text>
                  Other folks stuff
                </Text>
           </View>
              
            </Swiper>
          </Content>
        </Container>
      );
    
  }
}
