import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {Fragment, useState} from 'react';
import {StyledText, StyledView} from '../../utils/styles';
import apis from '../apis';
import {setStorageData} from '../../utils/storage/storage';
import {useDispatch} from 'react-redux';
import {changeStatusLogin} from '../store/reducers/stateGlobal';
import {notifyMessage} from '../../utils/toast';
import {logProfileData} from 'react-native-calendars/src/Profiler';

export default function Login({navigation}) {
  const [username, setUsername] = useState('kien.latrung10');
  const [password, setPassword] = useState('Truot3lan');
  const dispatch = useDispatch();
  const handleLogin = async () => {
    apis
      .login({username, password})
      .then(res => {
        setStorageData('profile', res?.user);
        setStorageData('token', res?.jwttoken);
        dispatch(changeStatusLogin(true));
        navigation.navigate('main');
        console.log('====================================');
        console.log('token', token);
        console.log('====================================');
      })
      .catch(err => {
        console.log('err', err);
        notifyMessage('Sai tài khoản hoặc mật khẩu');
      })
      .finally(() => {});
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Fragment>
      {/* <ScrollView> */}
      <View style={{alignItems: 'center', paddingTop: 110}}>
        <Image
          source={require('../../public/assets/login/kpi1.png')}
          style={{width: 250, height: 250, resizeMode: 'contain'}}
        />
      </View>
      <View>
        <Image
          source={require('../../public/assets/login/user1.png')}
          style={{
            position: 'absolute',
            height: 28,
            width: 30,
            top: 30,
            borderWidth: 1,
            padding: 10,
            marginHorizontal: 50,
            marginTop: 10,
            zIndex: 10,
            resizeMode: 'cover',
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          value={username}
          onChangeText={setUsername}
        />
        <Image
          source={require('../../public/assets/login/Icon3.png')}
          style={{
            position: 'absolute',
            height: 28,
            width: 30,
            top: 85,
            borderWidth: 1,
            padding: 10,
            marginHorizontal: 50,
            marginTop: 10,
            zIndex: 10,
            resizeMode: 'cover',
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <View style={{position: 'absolute', zIndex: 40, top: 100, left: 335}}>
          <TouchableOpacity onPress={handleShowPassword}>
            <Image
              source={require('../../public/assets/login/eye1.png')}
              style={{height: 20, resizeMode: 'contain', width: 20}}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
      </View>
      {/* <View className="p-4 mt-2 flex-1 justify-center items-center">
          <TouchableOpacity>
            <Text style={{color: 'red', fontSize: 17}}>Quên mật khẩu ?</Text>
          </TouchableOpacity>
        </View> */}
      {/* </ScrollView> */}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 8,
  },
  input: {
    height: 45,
    top: 22,
    borderWidth: 1,
    padding: 10,
    zIndex: 1,
    marginHorizontal: 40,
    marginTop: 10,
    paddingStart: 50,
  },
  button: {
    backgroundColor: '#489FF0',
    Top: 200,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
    marginHorizontal: 40,
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 30,
  },
});
