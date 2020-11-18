import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'; 
import {DrawerItems} from 'react-navigation-drawer'; 
import firebase from 'firebase'; 

export default class CustomSideBarMenu extends React.Component {
 render (){
     return ( 
         <View>
         <View style={{flex:1}}>
           <DrawerItems
                {
                   ...this.props 
               }
           />
         </View>
         <View> 
           <TouchableOpacity 
             onPress={()=>{
                 this.props.navigation.navigate("WelcomeScreen")
                 firebase.auth().signOut()
             }}
           >
            <Text> Log Out </Text>
           </TouchableOpacity>
         </View> 

       </View>
     )
 }

}

