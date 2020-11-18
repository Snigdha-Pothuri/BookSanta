import React from 'react';
import { StyleSheet, Text, View, Image,FlatList,TouchableOpacity,Alert } from 'react-native';
import {ListItem} from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class MyDonations extends React.Component {
    static navigationOptions = {
        header : null
    }
  constructor () {
    super ();
    this.state = {
      userId : firebase.auth().currentUser.email,
      allDonations : []
    }
    this.requestRef = null

  } 
  getAllDonations = () => {
   this.requestRef = db.collection("all_donations").where("donor_id","==",this.state.userId)
   .onSnapshot((snapshot)=>{
     var allDonations = snapshot.docs.map(document=>document.data())
     this.setState({
       allDonations : allDonations
     })
   })
  } 
componentDidMount (){
  this.getAllDonations()
}
  componentWillUnmount (){
    this.requestRef()
  }
  keyExtractor = (item,index)=>
    index.toString();
  renderItem = ({item,i}) => {
    return (
    <ListItem
       key={i}
       title = {item.book_Name}
       subtitle = {"requested by : " + item.request_by + "\nstatus :" + item.request_status} 
       leftElement = {<Icon
                 name = "book" type="font-awesome" color = "yellow"
       />}
       titleStyle = {{color:"black",fontWeight:"bold"}}
       rightElement = {
         <TouchableOpacity style={{width:100,height:50,alignItems:"center",alignSelf:"center",justifyContent:"center"}}
         >
          <Text style={{color:"black"}}> 
            Send Book
          </Text>
         </TouchableOpacity> 
       } 
       bottomDivider 
    />
    )
  }

  render(){
    return (
      <View style={{flex:1}}>
        <MyHeader title="My Donations" 
          navigation= {this.props.navigation}
        />
        <View style={{flex:1}}>
           {
             this.state.allDonations.length === 0
             ? (
               <View>
                 <Text> List of all books donated </Text>
               </View>
             ) 
             : (
               <FlatList
                  keyExtractor = {this.keyExtractor}
                  data = {this.state.allDonations}
                  renderItem = {this.renderItem}
               />
             )
           }
        </View>
      </View>
    );
  }
}