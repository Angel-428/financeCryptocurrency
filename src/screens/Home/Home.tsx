import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler, Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withTheme } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

import { Logout } from '../../redux/slices/userSlice';
import WalletListScreen from './WalletList/WalletList';
import SettingsScreen from './Settings/Settings';
import styles from './Home.style';

const Tab = createBottomTabNavigator();

const Home = ({theme, navigation}) => {
  const dispatch = useDispatch();
  const {mfaVerified} = useSelector((state: any) => state.user);

  const exitApp = async () => {
    await AsyncStorage.clear();
    dispatch(Logout());
    BackHandler.exitApp();
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Confirm", "Are you sure to exit?", [
          {
            text: "No",
            onPress: () => null,
          },
          { 
            text: "Yes", 
            onPress: () => exitApp()
          }
        ]);

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarLabelStyle: styles.tabLabel
      }}
    >
      <Tab.Screen 
        name="WalletList" 
        component={WalletListScreen} 
        options={{
          tabBarLabel: "Send Money",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcons name="money" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false,
        }} 
      />
    </Tab.Navigator>
  );
}

export default withTheme(Home);
