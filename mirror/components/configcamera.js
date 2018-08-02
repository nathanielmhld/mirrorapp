import React, { Component } from "react";
import {View, Text, StyleSheet, TouchableOpacity, CameraRoll, AsyncStorage} from "react-native";
import {Camera, Permissions, GestureHandler} from 'expo'
import {Container, Content, Header, Item, Icon, Input, Button } from "native-base"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


class ConfigCamera extends Component{

	state = {
		hasCameraPermission: null,
		hasPhotosPermission: null,
		type: Camera.Constants.Type.front

	}

	async componentWillMount(){
		const {status} = await Permissions.askAsync(Permissions.CAMERA);
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
		this.setState({hasCameraPermission: status === 'granted'})
	}
	snap = async () => {
  if (this.camera) {
  	
    let photo = await this.camera.takePictureAsync();
    try {
    await AsyncStorage.setItem('configPhoto', photo["uri"]);
  	} catch (error) {
  		console.log("Error using storage");
  	}
  	console.log("Recorded the location of a photo: " + photo["uri"]);
    //CameraRoll.saveToCameraRoll(photo["uri"]);
  }
};

	render(){
		const {hasCameraPermission} = this.state
		if(hasCameraPermission === null)
		{
			return <View />
		}
		else if(hasCameraPermission === false)
		{
			return <Text> No access to camera </Text>
		}else{
			return(

			<View style={{flex:1}}>
				<Camera style={{flex:1}} type={this.state.type} ref={ref => { this.camera = ref; }}>
				<View style={{position: 'absolute', left: 0, right: 0, top: 15, alignItems: 'center', justifyContent: 'center'}}>
					<Text style={{color:'white', fontSize: 40}}>First, we need a selfie!</Text>
				</View>
				<View style={{position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'}}>
					<TouchableOpacity onPress={this.snap}>
					<MaterialCommunityIcons name="circle-outline" style={{color:'white', fontSize: 100}}></MaterialCommunityIcons>
					</TouchableOpacity>
				</View>
				</Camera>
			</View>

			)
		}
	}
}




export default ConfigCamera

