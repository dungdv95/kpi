import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {Fragment, useState, useCallback} from 'react';
import {ActivityIndicator, Appbar, Divider} from 'react-native-paper';
import {Avatar} from 'react-native-paper';
import {Image} from 'react-native';
import {Confirm} from '../../../../utils/confirm/confirm';
import Icon from 'react-native-paper/src/components/Icon';
import {useFocusEffect} from '@react-navigation/native';
import apis from '../../../../src/apis';
import {removeStorage} from '../../../../utils/storage/storage';

const listUser = [
  {
    id: 1,
    avatar: '',
    name: 'Nguyễn Duy Hùng',
    role: 'leader',
    roleText: 'Tổ trưởng',
    skills: 'Angular, Java, Python',
  },
  {
    id: 2,
    avatar: '',
    name: 'Đào Ngọc Thành',
    role: 'teamleader',
    roleText: 'Team leader',
    skills: 'ReactJS, NextJS, React Native',
  },
  {
    id: 3,
    avatar: '',
    name: 'Dũng',
    role: 'member',
    roleText: 'Member',
    skills: 'ReactJS, NextJS, React Native',
  },
];

export default function Members({navigation, route}) {
  const group = route.params.item;
  const [search, setSearch] = useState('');
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);

  const handleBack = () => {
    if (visibleSearch) {
      setVisibleSearch(false);
    } else {
      navigation.goBack();
    }
  };

  const handleSearch = text => {
    setSearch(text);
  };

  const handleDelete = item => {
    Confirm(
      `Bạn có chắc chắn muốn xóa ${item.fullName} không?`,
      handleConfirm,
      item,
    );
  };
  const handleConfirm = (status, data) => {
    if (status === 'oke') {
      apis
        .deleteUser(data?.id)
        .then(res => {
          getData(group?.id, search);
        })
        .catch(err => {
          notifyMessage('Không xóa được bản ghi này');
        })
        .finally(() => {});
    }
  };

  const getData = (groupId, search) => {
    setIsLoading(true);
    apis
      .getAllUser(groupId, search)
      .then(res => {
        setList(res);
      })
      .catch(err => {
        if (err.message === '401') {
          removeStorage('token');
          navigation.navigate('login');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      getData(group?.id, search);
      return () => {};
    }, [search]),
  );

  return (
    <Fragment>
      <Appbar.Header style={{backgroundColor: '#61BDFF'}}>
        <Appbar.BackAction color="white" onPress={handleBack} />
        <Appbar.Content
          title={
            <View className="p-2">
              {!visibleSearch ? (
                <Text className="text-xl font-medium text-white">
                  {group?.name}
                </Text>
              ) : (
                <View className="flex-row rounded-md bg-slate-50">
                  <TextInput
                    className="p-1 rounded-md bg-slate-50 w-[90%]"
                    value={search}
                    onChangeText={handleSearch}
                  />
                  <TouchableOpacity
                    onPress={() => setSearch('')}
                    className="flex justify-center items-center w-[10%]">
                    <Icon source="close" size={22} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          }
        />
        {!visibleSearch && (
          <Appbar.Action
            icon="magnify"
            color="white"
            onPress={() => {
              setVisibleSearch(true);
            }}
          />
        )}
      </Appbar.Header>
      {isLoading ? (
        <ActivityIndicator size={50} className="flex-1" animating={true} />
      ) : (
        <View className="flex-1">
          <TouchableOpacity
            onPress={() => navigation.navigate('add-member', {group})}
            className="absolute z-10 bottom-2.5 right-2.5">
            <View className=" justify-center items-center rounded-full w-12 h-12 bg-purple-800">
              <Text className="text-2xl font-bold text-white">+</Text>
            </View>
          </TouchableOpacity>
          <ScrollView>
            {list.map((item, index) => (
              <Fragment key={index}>
                <View className="flex-row p-3">
                  <View className="justify-center">
                    <Avatar.Text size={50} label={item?.fullName.charAt(0)} />
                  </View>
                  <View className="flex-row flex-1 justify-between h-14 px-2">
                    <View className="w-11/12 flex-row justify-between">
                      <View className="w-4/6 p-1 justify-between">
                        <Text className="text-lg font-medium" numberOfLines={1}>
                          {item.fullName}
                        </Text>
                        <Text className="text-sm">{item?.role?.name}</Text>
                      </View>
                      {item?.skills && (
                        <View className="flex-row justify-center items-center w-2/6 p-2">
                          <Image
                            style={{width: 18, height: 18}}
                            source={require('../../../../public/assets/members/skills.png')}
                          />
                          <Text numberOfLines={2} className="px-2 text-xs">
                            {item?.skills}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View className="w-1/12 py-1 justify-between items-center">
                      <TouchableOpacity onPress={() => handleDelete(item)}>
                        <Image
                          style={{width: 19, height: 19}}
                          source={require('../../../../public/assets/members/delete.png')}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('add-member', {
                            group,
                            member: item,
                          })
                        }>
                        <Image
                          style={{width: 19, height: 19}}
                          source={require('../../../../public/assets/members/edit.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <Divider bold />
              </Fragment>
            ))}
          </ScrollView>
        </View>
      )}
    </Fragment>
  );
}
