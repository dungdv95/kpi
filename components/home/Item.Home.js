import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import Detail from './Detail';

import LinearGradient from 'react-native-linear-gradient';

const play = require('./image/play.png');
const star = require('./image/Star.png');
const ItemHome = ({item, index}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={{borderRadius: 10, overflow: 'hidden'}}>
          <ImageBackground
            source={item.image}
            style={{
              height: 150,
              width: 320,
            }}>
            <LinearGradient
              locations={[0, 1.0]}
              colors={['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.60)']}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}></LinearGradient>
          </ImageBackground>

          <Text
            style={{
              position: 'absolute',
              bottom: 5,
              left: 10,
              fontFamily: 'Poppins-Regular',
              color: '#fff',
            }}>
            {item.title}
          </Text>
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              padding: 5,
              right: 10,
              top: 10,
              borderRadius: 5,
            }}>
            <Image source={star} style={{height: 10, width: 10}} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 15,
          }}>
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#8860a2',
              padding: 10,
              right: 25,
              top: -15,
              borderRadius: 15,
              zIndex: 3,
              width: 30,
            }}>
            <Image source={play} style={{height: 10, width: 10}} />
          </View>
          <View style={{width: 300}}>
            <Text style={{fontFamily: 'Poppins-Regular'}} numberOfLines={2}>
              {item.post}
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {/* <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12}}>
            <Image source={book} style={{height: 15, width: 15}} />
            {'   Beginner'}
          </Text> */}
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  color: '#8860a2',
                }}>
                {item.time}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemHome;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    marginHorizontal: 12,
    shadowOffset: {width: -5, height: 3},
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    backgroundColor: '#fff',
  },
  centeredView: {
    width: 1000,
    height: '60%',
    marginHorizontal: '10%',
    marginVertical: '20%',
    backgroundColor: 'red',
  },
});
