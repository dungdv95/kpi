import {Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import {getStorageData} from '../../utils/storage/storage';

export default function MainBoard({navigation}) {
  const [profile, setProfile] = useState();
  const [scorePermision, setScorePermission] = useState(false);
  const [rulePermission, setRulePermission] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getStorageData('profile').then(value => {
        setProfile(value);
        if (value?.role?.name !== 'Thành viên') {
          setScorePermission(true);
        }
        if (value?.role?.name === 'QA') {
          setRulePermission(true);
        }
      });
      return () => {};
    }, []),
  );

  console.log('profile', profile);
  return (
    <View className="flex-1 justify-center">
      <View className="p-10">
        {rulePermission && (
          <TouchableOpacity onPress={() => navigation.navigate('rules')}>
            <LinearGradient
              start={{x: 0.0, y: 0.2}}
              // end={{}}
              colors={['#14F0D9', '#24B3E8', '#3478F6']}
              style={{
                backgroundColor: '#489FF0',
                width: 330,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                marginVertical: 20,
                flexDirection: 'row',
              }}>
              <Text style={{color: 'white', fontSize: 19, fontWeight: 'bold'}}>
                QUẢN LÝ RULES
              </Text>
              <Image
                source={require('../../public/assets/mainboard/arrow1.png')}
                style={{resizeMode: 'cover', width: 20, height: 20, left: 57}}
              />
            </LinearGradient>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('statistical')}>
          <LinearGradient
            start={{x: 0.0, y: 0.2}}
            // end={{}}
            colors={['#14F0D9', '#24B3E8', '#3478F6']}
            style={{
              backgroundColor: '#489FF0',
              width: 330,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
              marginVertical: 20,
              flexDirection: 'row',
            }}>
            <Text style={{color: 'white', fontSize: 19, fontWeight: 'bold'}}>
              THỐNG KÊ ĐIỂM
            </Text>
            <Image
              source={require('../../public/assets/mainboard/arrow1.png')}
              style={{resizeMode: 'cover', width: 20, height: 20, left: 54}}
            />
          </LinearGradient>
        </TouchableOpacity>
        {scorePermision && (
          <TouchableOpacity onPress={() => navigation.navigate('score')}>
            <LinearGradient
              start={{x: 0.0, y: 0.2}}
              // end={{}}
              colors={['#14F0D9', '#24B3E8', '#3478F6']}
              style={{
                backgroundColor: '#489FF0',
                width: 330,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                marginVertical: 20,
                flexDirection: 'row',
              }}>
              <Text style={{color: 'white', fontSize: 19, fontWeight: 'bold'}}>
                CHẤM ĐIỂM
              </Text>
              <Image
                source={require('../../public/assets/mainboard/arrow1.png')}
                style={{resizeMode: 'cover', width: 20, height: 20, left: 72}}
              />
            </LinearGradient>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('group')}>
          <LinearGradient
            start={{x: 0.0, y: 0.2}}
            // end={{}}
            colors={['#14F0D9', '#24B3E8', '#3478F6']}
            style={{
              backgroundColor: '#489FF0',
              width: 330,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
              marginVertical: 20,
              flexDirection: 'row',
            }}>
            <Text style={{color: 'white', fontSize: 19, fontWeight: 'bold'}}>
              QUẢN LÝ THÀNH VIÊN
            </Text>
            <Image
              source={require('../../public/assets/mainboard/arrow1.png')}
              style={{resizeMode: 'cover', width: 20, height: 20, left: 30}}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
