import React from 'react';
import  { StyleSheet, Text, View } from 'react-native';
import {Header,Icon} from 'react-native-elements';

const MyHeader = props=>{
    return (
        <Header 
          leftComponent = {<Icon name="bars" type="font-awesome" color="blue" 
          onPress={()=>props.navigation.toggleDrawer()}
          />
}
          centerComponent = {{text : props.title,style:{color:"black",fontSize:30,fontWeight:"bold"}}}
          backgroundColor = "pink"
        />
    )
}
export default MyHeader