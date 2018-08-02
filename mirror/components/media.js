import React, { Component } from "react";
import {View, Text, StyleSheet, TouchableOpacity, CameraRoll, AsyncStorage, Image} from "react-native";
import {Camera, Permissions, GestureHandler} from 'expo'
import {Container, Content, Header, Item, Icon, Input, Button } from "native-base"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { RNS3 } from 'react-native-aws3';

class MediaComponent extends Component{

	state = {
		configPhoto: null
	}
	async componentWillMount(){
		const value = await AsyncStorage.getItem('configPhoto');
    	if (value !== null) {
    	this.setState({configPhoto: value})
      	console.log("Mounting with: " + value);
    	}
	}

	


	render(){
		const {configPhoto} = this.state
		if(configPhoto === null)
		{
			return <View />
		}else{
		
			return(

			<View style={{flex:1}}>
				<Text> HELLO </Text>
				<Image source={{uri: configPhoto}} />
			</View>

			)
		}
		}
	}





export default MediaComponent

