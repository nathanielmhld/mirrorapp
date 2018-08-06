import React, { Component } from "react";
import {View, Text, StyleSheet, TouchableOpacity, CameraRoll, AsyncStorage} from "react-native";
import {Camera, Permissions, GestureHandler, Location} from 'expo'
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



class CameraComponent extends Component{

	state = {
		Permission: null,
		type: Camera.Constants.Type.back,
	}


	async componentDidMount(){
		a = await Permissions.askAsync(Permissions.CAMERA);
		b = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		c = await Permissions.askAsync(Permissions.LOCATION);
		this.setState({Permission: a && b && c});

	}

snap = async () => {
  if (this.camera) {

    let photo = await this.camera.takePictureAsync();
    let userId = await AsyncStorage.getItem('userID');
    let location = await Location.getCurrentPositionAsync({});
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;
    var current = new Date().toLocaleString();

    var random = Math.floor(Math.random() * 100000000)
    var image_file_name = "image" + random + ".jpg";

    console.log("Took a picture: " + photo["uri"] + " at " + current);

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


    fetch('https://rocky-anchorage-68937.herokuapp.com/image', {
       method: 'POST',
       headers: {
       Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'image_uri': image_file_name,
        'uid' : userId,
        'default_image': false,
        'latitude': latitude,
        'longitude': longitude,
        'timestamp': current
      }),
      })

      //.then((response) => response.json())
      .then((responseJson) => {
      	console.log(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
    CameraRoll.saveToCameraRoll(photo["uri"]);

  });
}};


	render(){
		const {Permission} = this.state
		if(Permission === null)
		{
			return <View />
		}
		else if(Permission === false)
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

