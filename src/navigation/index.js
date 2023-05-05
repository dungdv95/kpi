import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Fragment, useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {getStorageData} from '../../utils/storage/storage';
import Login from '../login';
import Register from '../register';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const StackAuth = createNativeStackNavigator();

export default function NavigatorCustom() {
  const [token, setToken] = useState('');
  const isLogin = useSelector(({stateGlobal}) => stateGlobal.isLogin);
  const isLoading = useSelector(({stateGlobal}) => stateGlobal.isLoading);

  useEffect(() => {
    getStorageData('token').then(val => {
      setToken(val);
    });
  }, []);
  if (!token && token !== null) {
    return <ActivityIndicator size={50} className="flex-1" animating={true} />;
  }

  console.log('token', token);
  return (
    <StackAuth.Navigator
      initialRouteName={token ? 'main' : 'login'}
      screenOptions={{
        headerShown: false,
      }}>
      <StackAuth.Screen name="main" component={MainNavigator} />
      <StackAuth.Screen name="login" component={Login} />
      <StackAuth.Screen name="register" component={Register} />
    </StackAuth.Navigator>
  );
}
