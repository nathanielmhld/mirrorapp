import React, { Component } from "react";
import {View, Text, StyleSheet, TouchableWithoutFeedback, CameraRoll} from "react-native";
import {Camera, Permissions, GestureHandler} from 'expo'


class CameraComponent extends Component{

	state = {
		hasCameraPermission: null,
		hasPhotosPermission: null,
		type: Camera.Constants.Type.back
	}

	async componentWillMount(){
		const {status} = await Permissions.askAsync(Permissions.CAMERA);
		//const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		this.setState({hasCameraPermission: status === 'granted'})
	}
	snap = async () => {
  if (this.camera) {
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
			<TouchableWithoutFeedback onPress={this.snap}>
			<Camera style={{flex:1}} type={this.state.type} ref={ref => { this.camera = ref; }}/>
			</TouchableWithoutFeedback>
			</View>
			
			)
		}
	}
}




export default CameraComponent

