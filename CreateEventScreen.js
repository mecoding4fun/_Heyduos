import React, { Component } from 'react';
import {Text,View,Image,TouchableOpacity,StyleSheet,Alert,Vibration,TextInput,ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Avatar,Badge,Input,Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Modal from 'react-native-modal';




export default class EventScreen extends React.Component{
    constructor(){
        super();
        this.state={
            eventName:'',
            eventlocation:'',
            eventTime:'',
            creator:firebase.auth().currentUser.email,
            isDatePickerVisible:false,
            ImageId: Math.random().toString(36).substring(7),
            image:'',
            participants:0,
            imageUrl:'',
            aboutEvent:'',
            duration:'',
            username:'',
            isModalVisible:false
        }
    }

    selectPicture = async () => {
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!cancelled) {
          this.uploadImage(uri, this.state.ImageId);
        }
      };
    
      uploadImage = async (uri, imageName) => {
        var response = await fetch(uri);
        var blob = await response.blob();
    
        var ref = firebase
          .storage()
          .ref()
          .child("ActivityImage/" + this.state.ImageId);
    
        return ref.put(blob).then((response) => {
          this.fetchImage(imageName);
        });
      };
    
      fetchImage = (imageName) => {
        var storageRef = firebase
          .storage()
          .ref()
          .child("ActivityImage/" + this.state.ImageId);
    
        // Get the download URL
        storageRef
          .getDownloadURL()
          .then((url) => {
            this.setState({ image: url,imageUrl:url });
          })
          .catch((error) => {
            this.setState({ image: "#" });
          });
      };
    

    initiateActivity = async()=>{
        //add a transaction
        db.collection("Events").add({
          'Name': this.state.eventName,
          'Location' : this.state.eventlocation,
          'Creator':this.state.creator,
          'Time':"'" + this.state.eventTime + "'" ,
          'Participants':this.state.participants,
          'ImageId':this.state.ImageId,
          'ImageUrl': this.state.imageUrl,
          'About':this.state.aboutEvent,
          'Duration':this.state.duration,
          'creatorUsername':this.state.username,
        })
        Alert.alert("Activity Created!")
        this.props.navigation.navigate('Activities')
        const ONE_SECOND_IN_MS = 1000;
        Vibration.vibrate(0.2 * 1000)  
        
      }
      getUserProfile(){
        db.collection('Users')
        .where('Email','==',this.state.creator)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.setState({
              username : doc.data().Name,          
            })
            console.log(this.state.username)
          })
        })
      }

      componentDidMount(){
        this.getUserProfile();
        
      }
      
WrapperComponent() {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={this.state.isModalVisible}
    >
        <View style={styles.signupView}>
        <GooglePlacesAutocomplete
            placeholder="Search"
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed="auto" // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => {
              console.log('data',data);
              console.log('details',details);
            }}
            getDefaultValue={() => {
              return ''; // text input default value
            }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyAA0qehbFpN0qaMDS3hGmlPhbHTvgfGyvg',
              language: 'en', // language of the result
              components: "country:in"           
            }}
            styles={{
              description: {
                fontWeight: 'bold',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            // currentLocationLabel="Current location"
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
            }}
            // filterReverseGeocodingByTypes={[
            //   'locality',
            // ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            debounce={200}
          />
          </View>
          {/* </View> */}
    </Modal>
  );
      }
      

    render(){
        const handleConfirm = (date) => {
            this.setState({
                isDatePickerVisible:false,
                eventTime:date
            })
            console.log(date)
            
          };
          const handleDecline = () => {
            this.setState({
                isDatePickerVisible:false
            })
          };
        return(

          <View style={{flex:1}}>
            {this.WrapperComponent()}
              <KeyboardAwareScrollView keyboardShouldPersistTaps={true}>
                <View>
                <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={handleDecline}
                />
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Activities')}} style = {{marginTop:'12%'}}>
            <Image source={require("../assets/BackIcon2.png")} style = {{width:20,height:20}}/></TouchableOpacity>
                </View>
            <View style={{alignItems:'center'}}>
            <Text style={{fontSize:25,marginTop:-25}}>Enter Details</Text>
            <Avatar
            source={{
              uri: this.state.image,
            }}
            size="large"
            rounded
            onPress={() => this.selectPicture()}
            containerStyle={{borderRadius: 40,width:'75%',height:'25%'}}            
          />
          <Text style={{fontSize:25,marginBottom:'8%'}}>Select Image</Text>
            <Input style = {[styles.loginBox,{marginTop:'5%'}]}
                    placeholder = "Enter Activity name"
                    keyboardType = 'default'
                    onChangeText  = {(text)=>{
                      this.setState({eventName:text})
                    }}
                    rightIcon={
                      <Icon
                        name='edit'
                        size={24}
                        color='black'
                        />
                    }
            />
            <Input style = {styles.loginBox}
                    placeholder = "Enter About Activity"
                    keyboardType = 'default'
                    onChangeText  = {(text)=>{
                    this.setState({aboutEvent:text})
                    }}
                    rightIcon={
                      <Icon
                      name='edit'
                      size={24}
                      color='black'
                    />
                    }
            />
            <Input style = {styles.loginBox}
                    placeholder = "Enter limited participants"
                    keyboardType = 'number-pad'
                    onChangeText  = {(text)=>{
                    this.setState({duration:text})
                    }}
                    rightIcon={
                      <Icon
                      name='edit'
                      size={24}
                      color='black'
                    />
                    }
            />
                      <TouchableOpacity
                        style={styles.button}
                        onPress = {()=>{
                          this.setState({
                              isModalVisible:true
                          })
                          }}>
                            <Text  style={styles.buttonText}>
                              Select Date and time
                            </Text>
                      </TouchableOpacity>
            <Input style = {styles.loginBox}
                    placeholder = "Enter ONLY Gender"
                    keyboardType = 'default'
                    onChangeText  = {(text)=>{
                    this.setState({duration:text})
                    }}
                    rightIcon={
                      <Icon
                      name='edit'
                      size={24}
                      color='black'
                    />
                    }
            />
            {/* <View style={{ paddingTop: 35, flex: 1 }}> */}
          
        {/* </View> */}
            <Input style = {styles.loginBox}
                    placeholder = "Enter Activity Duration"
                    keyboardType = 'default'
                    onChangeText  = {(text)=>{
                    this.setState({duration:text})
                    }}
                    rightIcon={
                      <Icon
                      name='edit'
                      size={24}
                      color='black'
                    />
                    }
            />
            
            <Text  >
                        {/* Selected Date and time: {this.state.eventTime} */}
                      </Text>
            {/* <TextInput style = {styles.loginBox}
                    placeholder = "Selected Time"
                    value={this.state.eventTime} 
                    editable={false}                
                    rightIcon={
                      <Icon
                      name='av-timer'
                      size={24}
                      color='black'
                    />
                    }
            /> */}
            

            <TouchableOpacity
             style={[styles.button,{marginBottom:10}]}
             onPress={() => {
              this.initiateActivity()
            }}
          >
            <Text style={styles.buttonText}>Create Activity</Text>
          </TouchableOpacity>

            </View>
            </KeyboardAwareScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
    },
    buttonText:{
      fontSize:20,
      fontWeight:"bold",
      color:"#fff"
    },
    scrollview:{
      flex: 1,
      backgroundColor: "#000"
    },
    signupView:{
      flex:1,
      justifyContent:'center',
      // alignItems:'center'
      margin:'3%'
  },
})


