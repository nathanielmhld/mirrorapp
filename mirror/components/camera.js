import React, { Component } from "react";
import {View, Text, StyleSheet, TouchableOpacity, CameraRoll} from "react-native";
import {Camera, Permissions, GestureHandler} from 'expo'
import {Container, Content, Header, Item, Icon, Input, Button } from "native-base"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


class CameraComponent extends Component{

	state = {
		hasCameraPermission: null,
		hasPhotosPermission: null,
		type: Camera.Constants.Type.back
	}

	async componentWillMount(){
		const {status} = await Permissions.askAsync(Permissions.CAMERA);
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
		this.setState({hasCameraPermission: status === 'granted'})
	}
	snap = async () => {
  if (this.camera) {
  	console.log("Took a picture");
    let photo = await this.camera.takePictureAsync();
    CameraRoll.saveToCameraRoll(photo["uri"]);
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
			<View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
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




export default CameraComponent

