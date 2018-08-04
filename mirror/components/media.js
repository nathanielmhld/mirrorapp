import React, { Component } from "react";
import {View, Text, StyleSheet, CameraRoll, AsyncStorage, Image, TouchableOpacity, ImageBackground} from "react-native";
import {Camera, Permissions, GestureHandler, Location} from 'expo'
import {Container, Content, Header, Item, Icon, Input, Button } from "native-base"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { RNS3 } from 'react-native-aws3';


const styles = StyleSheet.create({
  slideDefault: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})

class MediaComponent extends Component{


	constructor(props) {
    super(props);

    this.state = {
      displayphotos: [],
      displayphoto: null,
      displayindex: 0,
	  location: null
    }
    this.checkServer = this.checkServer.bind(this);
    }
	
    async componentWillMount() {
    var intervalID = window.setInterval(this.checkServer, 10000); 
  	}
  	
  	async checkServer(){
    	let location = await Location.getCurrentPositionAsync({});
    	this.setState({location: location});
    	var latitude = this.state.location.coords.latitude;
    	var longitude = this.state.location.coords.longitude;
    	
    	



    	//Appropriate server call goes here. Updates are made to the displayphotos list
    	//example_____
    	this.setState({displayphotos: ["https://s3-us-west-1.amazonaws.com/mirrormediacontent/uploads/image18259145.jpg", 
    									"https://s3-us-west-1.amazonaws.com/mirrormediacontent/uploads/image.jpg",
    									"https://s3-us-west-1.amazonaws.com/mirrormediacontent/uploads/image207.jpg",
    									"https://s3-us-west-1.amazonaws.com/mirrormediacontent/uploads/image312.jpg"]});
    	//______


    	console.log(latitude + " , " + longitude);
    }



    

	async scrollForward(e){
		if(this.state.displayindex < this.state.displayphotos.length - 1){
			this.setState({displayindex: this.state.displayindex + 1
						});
		}
		
	}
	async scrollBack(e){
		if(this.state.displayindex > 0){
			this.setState({displayindex: this.state.displayindex - 1
						});
		}
	}
	async save(e){
		CameraRoll.saveToCameraRoll(this.state.displayphotos[this.state.displayindex]);
	}
	
	render(){
		if (this.state.displayphotos.length != 0){
			return(
			<View style={{flex:1}}>
				<ImageBackground style={{flex: 1, flexDirection: 'row'}}

				source={{uri: this.state.displayphotos[this.state.displayindex]}} alt="Image of you!">
				
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
		}else{
			return(
			<View style={styles.slideDefault}>
                <Text style={styles.text}>No candids yet!</Text>
              </View>
              )

		}
		}
	}






export default MediaComponent

