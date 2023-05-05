import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {Fragment, useEffect, useState, useCallback} from 'react';
import {Appbar, Divider} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import apis from '../../../src/apis';
import {removeStorage} from '../../../utils/storage/storage';
import {useFocusEffect} from '@react-navigation/native';

export default function Group({navigation}) {
  const [listGroup, setListGroup] = useState([]);
  const getData = () => {
    apis
      .getGroups()
      .then(res => {
        setListGroup(res);
      })
      .catch(err => {
        if (err.message === '401') {
          removeStorage('token');
          navigation.navigate('login');
        }
      })
      .finally(() => {});
  };

  useFocusEffect(
    useCallback(() => {
      getData();
      return () => {};
    }, []),
  );

  console.log('listGroup', listGroup);

  return (
    <Fragment>
      <Appbar.Header style={{backgroundColor: '#61BDFF'}}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={
            <View className="p-2">
              <Text className="text-lg font-medium text-white">
                Quản lý các thành viên
              </Text>
            </View>
          }
        />
      </Appbar.Header>
      <View className="flex-1">
        <ScrollView>
          {listGroup?.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('members', {item})}>
              {renderGroup(item, index)}
              <Divider bold />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Fragment>
  );
}
const renderGroup = (item, index) => {
  return (
    <View className="flex-row p-5">
      <View className="justify-center items-center rounded-full h-6 w-6 bg-blue-500">
        <Text className="text-sm font-medium text-white">{index + 1}</Text>
      </View>
      <View className="justify-center ml-4 w-full">
        <Text className="text-lg font-medium">{item.name}</Text>
      </View>
    </View>
  );
};
