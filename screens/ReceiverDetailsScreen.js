import React from 'react';
import { StyleSheet, Text, View, Image,FlatList,TouchableOpacity,Alert } from 'react-native';
import {ListItem} from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';
import {Header,Icon,Card} from 'react-native-elements';
import MyDonations from '../screens/MyDonations';

export default class ReceiverDetailsScreen extends React.Component {
    constructor (props) {
        super(props);
        this.state ={
           userId : firebase.auth().currentUser.email,
           receiverId : this.props.navigation.getParam("details")["user_id"],
           requestId : this.props.navigation.getParam("details")["requestId"],
           bookName : this.props.navigation.getParam("details")["book_Name"],
           reasonToRequest : this.props.navigation.getParam("details")["reasonToRequest"],
           receiverName : "",
           receiverAddress : "",
           receiverContact : "",
           receiverDocId : ""
        }
    } 
     getReceiverDetails () {
         db.collection("users").where("email_id","==",this.state.receiverId).get()
         .then(snapshot=>{
             snapshot.forEach(doc=>{
                 this.setState({
                    receiverName : doc.data().first_name,
                    receiverAddress : doc.data().address,
                    receiverContact : doc.data().contact
                 })
             })
         })
         db.collection("requested_books").where("request_id","==",this.state.requestId).get()
         .then(snapshot=>{
             snapshot.forEach(doc=>{
                 this.setState({
                     receiverDocId : doc.id
                 })
             })
         })
     } 

     updateBookStatus = ()=>{
         db.collection("all_donations").add({
             book_Name : this.state.bookName,
             requestId : this.state.requestId,
             request_by : this.state.receiverName,
             donor_id : this.state.userId
,
request_status : "Donor Interested"
            })
     }

     componentDidMount () {
        this.getReceiverDetails();
     }

   render () {
       return(
           <View style={{flex:1}}>
                 <Header 
          leftComponent = {<Icon name="bars" type="font-awesome" color="blue" 
          onPress={()=>props.navigation.goBack()}
          />
}
          centerComponent = {{text : "Donate Books",style:{color:"black",fontSize:30,fontWeight:"bold"}}}
          backgroundColor = "pink"
        />  
        <View style={{flex:0.3}}>
            <Card 
              title={"Book Information"}
              titleStyle = {{fontSize:20}}
            >
             <Card>
                 <Text style={{fontWeight:"bold"}}> Name : {this.state.bookName} </Text>
                 </Card> 

                 <Card>
                 <Text style={{fontWeight:"bold"}}> Reason  : {this.state.reasonToRequest} </Text>
                 </Card> 
            </Card> 
            <View style={{flex:0.3}}>
                <Card 
                  title={"Receiver Information"}
                  titleStyle = {{fontSize:20}}
                > 
                   <Card>
                 <Text style={{fontWeight:"bold"}}> Receiver name : {this.state.receiverName} </Text>
                 </Card>

                 <Card>
                 <Text style={{fontWeight:"bold"}}> Address : {this.state.receiverAddress} </Text>
                 </Card>

                 <Card>
                 <Text style={{fontWeight:"bold"}}> Contact number  : {this.state.receiverContact} </Text>
                 </Card>
                </Card>
            </View>

        </View>
           <View>
               {
                   this.state.receiverId !== this.state.userId 
                   ? (
                       <TouchableOpacity
                       onPress={()=>{this.updateBookStatus()
                      this.props.navigation.navigate("MyDonations")
                    }}
                       >
                         <Text> I want to donate </Text>
                       </TouchableOpacity>
                   )
                   : null
               }
           </View>
           </View>
       )
   }
}
