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
  accessKey: "",
  secretKey: "",
  successActionStatus: 201,
  contentType: "image/jpeg"
}

class ConfigCamera extends Component {

	state = {
		hasCameraPermission: null,
		hasPhotosPermission: null,
		type: Camera.Constants.Type.front

	}

	async componentDidMount(){
		const {status} = await Permissions.askAsync(Permissions.CAMERA);
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
		this.setState({hasCameraPermission: status === 'granted'})
	}
	snap = async () => {
  if (this.camera) {

    let photo = await this.camera.takePictureAsync();
    userID =  String(Math.floor(Math.random() * 1000));
    try {
        await AsyncStorage.setItem('userID', userID);
        this.props.method()

  	} catch (error) {
  		console.log("Error using storage");
  	}
  	console.log("Recorded the location of a photo: " + photo["uri"]);
    //CameraRoll.saveToCameraRoll(photo["uri"]);
    let image_file_name = "image" + userID + ".jpg";
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
      .then((responseJson) => {
        console.log(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });


    fetch('https://rocky-anchorage-68937.herokuapp.com/image', {
       method: 'POST',
       headers: {
       Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'image_uri': image_file_name,
        'uid' : userID,
        'default_image': true,
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

