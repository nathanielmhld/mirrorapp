import React, { Component } from "react";
import {View, Text, StyleSheet, CameraRoll, AsyncStorage, Image, TouchableOpacity, ImageBackground} from "react-native";
import {Camera, Permissions, GestureHandler} from 'expo'
import {Container, Content, Header, Item, Icon, Input, Button } from "native-base"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { RNS3 } from 'react-native-aws3';

class MediaComponent extends Component{


	constructor(props) {
    super(props);

    this.state = {
      displayphoto: "https://mirrormediacontent.s3.amazonaws.com/uploads%2Fimage.jpg"
    }
    var intervalID = window.setInterval(checkServer, 10000);
    function checkServer(){
    	console.log('hello')
    }
	}
	async scrollForward(e){
		this.setState({displayphoto: "https://s3-us-west-1.amazonaws.com/mirrormediacontent/uploads/image18259145.jpg"});
	}
	async scrollBack(e){
		this.setState({displayphoto: "https://s3-us-west-1.amazonaws.com/mirrormediacontent/uploads/image67565383.jpg"});
	}
	async save(e){
		console.log(this.state.displayphoto);
		CameraRoll.saveToCameraRoll(this.state.displayphoto);
	}

	render(){
			return(
			<View style={{flex:1}}>
				<ImageBackground style={{flex: 1, flexDirection: 'row'}}
				source={{uri: this.state.displayphoto}} alt="Image1">

				<TouchableOpacity style={{width: "30%", height: "100%",  opacity: 0, backgroundColor: '#FFFFFF'}} onPress={e => this.scrollBack(e)}>

				</TouchableOpacity>
				<TouchableOpacity style={{width: "70%", height: "100%", opacity: 0, backgroundColor: '#FFFFFF'}} onPress={e => this.scrollForward(e)}>
				</TouchableOpacity>

				</ImageBackground>

				<View style={{position: 'absolute', right: 10, bottom: 10}}>
					<TouchableOpacity onPress={e => this.save(e)}>
					<MaterialCommunityIcons name="cloud-download" style={{color:'white', fontSize: 50}}></MaterialCommunityIcons>
					</TouchableOpacity>
				</View>
			</View>

			)
		}
	}





export default MediaComponent

