import React, { Component } from "react";
import {View, Text, StyleSheet, TouchableOpacity, CameraRoll, AsyncStorage, Image} from "react-native";
import {Camera, Permissions, GestureHandler} from 'expo'
import {Container, Content, Header, Item, Icon, Input, Button } from "native-base"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { RNS3 } from 'react-native-aws3';

class MediaComponent extends Component{
	constructor(props) {
    super(props);
    this.state = {
      userID: -1
    }
    var intervalID = window.setInterval(checkServer, 1000);
	}
    async checkServer(){

    }

	render(){
			return(

			<View style={{flex:1}}>
				<Text> HELLO </Text>
			</View>

			)
		}
	}





export default MediaComponent

