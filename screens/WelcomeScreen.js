import React, { Component } from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class WelcomeScreen extends Component{
    constructor(){
        super()
        this.state={
            emailId : '',
            password : '',
            isModalVisisble : false,
            firstName : '',
            lastName : '',
            address : '',
            contact : '',
            confirmPassword : ''
        }
    }
    userSignUp = (username, password, confirmPassword)=>{
        if(password !==confirmPassword){
            return Alert.alert("password doesn't match\nCheck your password")
        }else{
            firebase.auth().createUserWithEmailAndPassword(username, password)
            .then((response)=>{
                db.collection('users').add({
                    first_name:this.state.firstName,
                    last_name:this.state.lastName,
                    mobile_number:this.state.contact,
                    username:this.state.username,
                    address:this.state.address,
                })
                return Alert.alert(
                    'User Added Successfully',
                    '',
                    [
                        {text:'OK', onPress:()=> this.setState({"isModalVisible": true})},   
                    ]
                );
            })
            .catch(function(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            });
        }
    }

  userLogin=(emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password).then(()=>{
         alert("Successfully Login")
    })
    .catch(function(error){
        var errorCode = error.code;
        var errorMessage= error.message;
        alert(errorMessage);
    })
}

showModal = ()=>{
  if(this.state.isModalVisisble === true){
    return(
      <Modal animationType = 'fade' transparent = {true} visible = {this.state.isModalVisisble}>
        <View style = {styles.modalContainer}>
          <ScrollView style = {{
        width : '100%'
          }}>
            <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
              <Text style = {styles.modalTitle}>
              Registration
              </Text>
              <TextInput style = {styles.formTextInput} 
              placeholder = {'First Name'}
              maxLength = {15}
              onChangeText = {(text)=>{
                this.setState({
                  firstName : text
                })
              }}/>
              <TextInput style = {styles.formTextInput} 
              placeholder = {'Last Name'}
              maxLength = {15}
              onChangeText = {(text)=>{
                this.setState({
                  lastName : text
                })
              }}/>
              <TextInput style = {styles.formTextInput} 
              placeholder = {'Contact'}
              maxLength = {10}
              keyboardType = {'numeric'}
              onChangeText = {(text)=>{
                this.setState({
                  contact : text
                })
              }}/>
              <TextInput style = {styles.formTextInput} 
              placeholder = {'Address'}
              multiline = {'true'}
              onChangeText = {(text)=>{
                this.setState({
                  address : text
                })
              }}/>
              <TextInput style = {styles.formTextInput} 
              placeholder = {'Email ID'}
              keyboardType = {'email-address'}
              onChangeText = {(text)=>{
                this.setState({
                  emailId : text
                })
              }}/>
              <TextInput style = {styles.formTextInput} 
              placeholder = {'Password'}
              secureTextEntry = {'true'}
              onChangeText = {(text)=>{
                this.setState({
                  password : text
                })
              }}/>
              <TextInput style = {styles.formTextInput} 
              placeholder = {'Confirm Password'}
              secureTextEntry = {true}
              onChangeText = {(text)=>{
                this.setState({
                  confirmPassword : text
                })
              }}/>
              <View>
                <TouchableOpacity style = {styles.registerButton}
                onPress = {()=>{
                  this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                }}>
                  <Text style = {styles.registerButtonText}>
                    Register
                  </Text>
                </TouchableOpacity>

              </View>
              <View>
                <TouchableOpacity style = {styles.cancelButton}
                onPress = {()=>{
                  this.setState({
                    isModalVisisble : false
                  })
                }}>
                  <Text style = {styles.registerButtonText}>
                    Cancel
                  </Text>
                </TouchableOpacity>

              </View>
            </KeyboardAvoidingView>
          </ScrollView>
          </View>
      </Modal>
    )
  }
    
}

render(){
    return(
        <View style={styles.container}>
            <View style = {{justifyContent : 'center', alignItems : 'center'}}>\
      {this.showModal()}
      </View>
            <View>
                <Text style={styles.title}>
                    Barter System App
                </Text>
            </View>
            <View>
                <TextInput style={styles.loginBox} 
                placeholder= "Enter Email Id"
                keyboardType= 'email-address'
                onChangeText= {(text)=>{
                    this.setState({emailId: text})
                }}/>
                <TextInput style={styles.loginBox} 
                placeholder= "Enter Password"
                secureTextEntry= {true}
                onChangeText= {(text)=>{
                    this.setState({password: text})
                }}/>
                <TouchableOpacity style={[styles.button, {marginBottom: 20, marginTop: 20}]}
                onPress={()=>{
                    this.userLogin(this.state.emailId, this.state.password)
                }}><Text style={styles.buttonText}>Log In</Text></TouchableOpacity>

          <TouchableOpacity
          style={styles.button}
          onPress= {()=>{this.setState({
            isModalVisisble : true
          })}}
          >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
            </View>
        </View>
    )}
}
const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#F8BE85',
   alignItems: 'center',
   justifyContent: 'center'
 },
 profileContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:65,
   fontWeight:'300',
   paddingBottom:30,
   color : '#ff3d00'
 },
 loginBox:{
   width: 300,
   height: 40,
   borderBottomWidth: 1.5,
   borderColor : '#ff8a65',
   fontSize: 20,
   margin:10,
   paddingLeft:10
 },
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#ff5722',
   margin:50
 },
 modalContainer:{
   flex:1,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#ffff",
   marginRight:30,
   marginLeft : 30,
   marginTop:80,
   marginBottom:80,
 },
 formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },
 registerButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:30
 },
 registerButtonText:{
   color:'#ff5722',
   fontSize:15,
   fontWeight:'bold'
 },
 cancelButton:{
   width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
 },

 button:{
   width:300,
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:25,
   backgroundColor:"#ff9800",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: 10
 },
 buttonText:{
   color:'#ffff',
   fontWeight:'200',
   fontSize:20
 }
})


