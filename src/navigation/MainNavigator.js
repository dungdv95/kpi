import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, Text} from 'react-native';
import Home from '../../components/home';
import Kpi from '../../components/kpi';
import Account from '../../components/account';

import apis from '../apis';

const Tab = createBottomTabNavigator();
export default function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {height: 55},
      }}>
      <Tab.Screen
        name="home"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={[focused ? styles.active : styles.unactive]}
              source={require('../../public/assets/navigation-icons/home.png')}
            />
          ),
          tabBarLabel: ({focused}) => (
            <React.Fragment>
              <Text
                style={[focused ? styles.active_text : styles.unactive_text]}>
                Home
              </Text>
            </React.Fragment>
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="kpi"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={[focused ? styles.active : styles.unactive]}
              source={require('../../public/assets/navigation-icons/kpi.png')}
            />
          ),
          tabBarLabel: ({focused}) => (
            <React.Fragment>
              <Text
                style={[focused ? styles.active_text : styles.unactive_text]}>
                Kpi
              </Text>
            </React.Fragment>
          ),
        }}
        component={Kpi}
      />
      <Tab.Screen
        name="account"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={[focused ? styles.active : styles.unactive]}
              source={require('../../public/assets/navigation-icons/profile.png')}
            />
          ),
          tabBarLabel: ({focused}) => (
            <React.Fragment>
              <Text
                style={[focused ? styles.active_text : styles.unactive_text]}>
                Profile
              </Text>
            </React.Fragment>
          ),
        }}
        component={Account}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  active: {
    width: 26,
    height: 26,
  },
  unactive: {
    width: 24,
    height: 24,
  },
  active_text: {
    color: '#00b3b3',
    fontSize: 15,
  },
  unactive_text: {
    color: '#404040',
    fontSize: 13,
  },
});
