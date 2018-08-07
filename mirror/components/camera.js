import React, { Component } from "react";
import {View, Text, StyleSheet, TouchableOpacity, CameraRoll, AsyncStorage} from "react-native";
import {Camera, Permissions, GestureHandler} from 'expo'
import {Container, Content, Header, Item, Icon, Input, Button } from "native-base"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { RNS3 } from 'react-native-aws3';

const options = {
  keyPrefix: "uploads/",
  bucket: "mirrormediacontent1",
  region: "us-east-1",
  accessKey: "AKIAIXVHTM7IPFBNTNMA",
  secretKey: "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",
  successActionStatus: 201,
  contentType: "image/jpeg"
}



class CameraComponent extends Component{

	state = {
		hasCameraPermission: null,
		hasPhotosPermission: null,
		type: Camera.Constants.Type.back,
	}


	async componentWillMount(){
		const {status} = await Permissions.askAsync(Permissions.CAMERA);
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
		this.setState({hasCameraPermission: status === 'granted'})
	}


	snap = async () => {
  if (this.camera) {

    let photo = await this.camera.takePictureAsync();
    let userId = await AsyncStorage.getItem('userID');

    var random = Math.floor(Math.random() * 100000000)
    var image_file_name = "image" + random + ".jpg";

    console.log("Took a picture: " + photo["uri"]);

    const file = {
	  // `uri` can also be a file system path (i.e. file://)
	  uri: photo["uri"],
	  name: image_file_name,
	  type: "image/jpeg"
	}
	console.log(options);
    RNS3.put(file, options).then(response => {
    console.log(response);
    console.log(response.body);
  	if (response.status !== 201)
    	throw new Error("Failed to upload image to S3");


	})
      //.then((response) => response.json())
      .then((response) => {
      	console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });

    CameraRoll.saveToCameraRoll(photo["uri"]);

    fetch('https://rocky-anchorage-68937.herokuapp.com/image', {
       method: 'POST',
       headers: {
       Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'image_uri': image_file_name,
        'uid' : userId,
        'default_image': false
    }),
    });
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
				<View style={{position: 'absolute', left: 0, top: 15}}>
					<TouchableOpacity onPress={this.props.method}>
					<MaterialCommunityIcons name="backup-restore" style={{color:'white', fontSize: 50}}></MaterialCommunityIcons>
					</TouchableOpacity>
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




export default CameraComponent

