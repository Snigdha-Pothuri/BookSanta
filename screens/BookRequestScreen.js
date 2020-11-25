import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Alert, TouchableOpacity} from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class BookRequestScreen extends React.Component {
   constructor(){
     super();
     this.state = {
       userId : firebase.auth().currentUser.email,
       bookName : "",
       reasonToRequest : "",
       isBookRequestActive : "",
       requestedBookName : "",
       bookStatus : "",
       requestId : "",
        userDocId : "",
        docId : "",

     }
   }
   createUniqueId(){
     return Math.random().toString(36).substring(7);
   }
   addRequest = async (bookName,reasonToRequest)=>
   {
     var userId = this.state.userId
     var randomRequestId = this.createUniqueId();
     db.collection("requested_books").add({
       "user_id" : userId,
       "book_Name": bookName,
       "reasonToRequest": reasonToRequest,
       "requestId" : randomRequestId,
       "book_status":"requested",
       "date" : firebase.firestore.FieldValue.serverTimestamp()
     })
     await this.getBookRequest()
     db.collection("users").where("email_id","==",userId).get()
     .then((snapshot)=>{
          snapshot.forEach((doc)=>{
            db.collection("users").doc(doc.id).update({isBookRequestActive : true})
          })
     })
     this.setState ({
       bookName : "",
       reasonToRequest : "",
      requestId : randomRequestId
     })
    return Alert.alert("Book Succesfully Requested")
    } 
    receivedBooks = (book_Name) => {
      var userId  = this.state.userId
      var requestId = this.state.requestId
      db.collection("received_books").add({
        "user_id" : userId,
        "book_Name" : book_Name,
        "request_id" : requestId,
       "bookStatus" : "received"
      })
    } 
    getIsBookRequestActive () {
      db.collection("users").where("email_id","==",this.state.userId)
      .onSnapshot((snapshot)=>{
        snapshot.forEach((doc)=>{
          this.setState({
            isBookRequestActive : doc.data().isBookRequestActive,
            userDocId : doc.id
          })
        })
      })
    } 
    getBookRequest = () => {
      var bookRrequest = db.collection("requested_books")
      .where("user_id","==",this.state.userId)
      .get()
      .then((snapshot)=> {
        snapshot.forEach((doc)=> {
          if(doc.data().book_status !== "received") {
            this.setState({
              requestId : doc.data().requested_id,
              requestedBookName : doc.data().book_Name,
              bookStatus : doc.data().book_status,
              docId : doc.id
            })
          }
        })
      })
    }
  render(){
    return (
       
      <View style={{flex:1}}>
      <MyHeader  
        title = "Request Book"
        navigation= {this.props.navigation}
      />
      <KeyboardAvoidingView style={StyleSheet.keyboardStyle}>
       <TextInput 
          style={styles.formTextInput}
          placeholder = {"Enter Book Name"}
          onChangeText={(text)=>{
            this.setState ({
              bookName : text
            })
          }}
          value = {this.state.bookName}
        
       />

<TextInput 
          style={styles.formTextInput}
          multiline
          numberOfLines={8}
          placeholder = {"Why do you want this book?"}
          onChangeText={(text)=>{
            this.setState ({
          reasonToRequest    : text
            })
          }}
          value = {this.state.reasonToRequest}
        
       />

       <TouchableOpacity style={styles.button} onPress={()=>{this.addRequest(this.state.bookName,this.state.reasonToRequest)}}>
       <Text>Request</Text>
       </TouchableOpacity>
      </KeyboardAvoidingView>
     
      </View>
    );
  }
} 
const styles = StyleSheet.create({
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 button:{
   width:"75%",
   height:35,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:5,
   backgroundColor:"#ff9800",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   }
  },
  formTextInput : {
    width:"75%",
    height : 35,
    alignSelf : "center",
    borderRadius:10,
    borderWidth:1,
    marginTop : 20,
    padding:10
  }
})