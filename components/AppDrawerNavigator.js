import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'; 
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu'; 
import SettingScreen from '../screens/SettingScreen';
import MyDonations from '../screens/MyDonations';

export const AppDrawerNavigator = createDrawerNavigator({
    Home : {
        screen : AppTabNavigator
    },
    MyDonations : {
        screen : MyDonations
    },

    Setting : {
        screen : SettingScreen
    }
}, 
{
    contentComponent : CustomSideBarMenu
},
{

initialRouteName : "Home"

})