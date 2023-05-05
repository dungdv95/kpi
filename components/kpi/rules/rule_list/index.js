import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {Fragment, useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  Appbar,
  Button,
  Divider,
  IconButton,
} from 'react-native-paper';
import {Image} from 'react-native';
import {Confirm} from '../../../../utils/confirm/confirm';
import apis from '../../../../src/apis';
import {removeStorage} from '../../../../utils/storage/storage';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {changeLoading} from '../../../../src/store/reducers/stateGlobal';
import {notifyMessage} from '../../../../utils/toast';
import Icon from 'react-native-paper/src/components/Icon';

export default function RuleList({navigation, route}) {
  const {rule} = route.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [ruleList, setRuleList] = useState([]);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [search, setSearch] = useState('');

  const handleBack = () => {
    if (visibleSearch) {
      setVisibleSearch(false);
    } else {
      navigation.goBack();
    }
  };

  const handleDelete = item => {
    Confirm(
      `Bạn có chắc chắn muốn xóa ${item.ruleName} không?`,
      handleConfirm,
      item,
    );
  };
  const handleConfirm = (status, data) => {
    if (status === 'oke') {
      apis
        .deleteRule(data?.id)
        .then(res => {
          getData(rule?.id, search);
        })
        .catch(err => {
          notifyMessage('Không xóa được bản ghi này');
        })
        .finally(() => {});
    }
  };

  const handleSearch = text => {
    setSearch(text);
  };

  const getData = (type, search = '') => {
    setIsLoading(true);
    apis
      .getRuleByType(type, search.toLowerCase())
      .then(res => {
        setRuleList(res);
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
      getData(rule?.id, search);
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
                  {rule?.title}
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
            onPress={() => navigation.navigate('add-rule', {rule})}
            className="z-10 absolute bottom-3 right-3">
            <View className=" justify-center items-center rounded-full w-12 h-12 bg-purple-800">
              <Text className="text-2xl font-bold text-white">+</Text>
            </View>
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            {ruleList.map((item, index) => (
              <Fragment key={index}>
                <View className="flex-row items-center p-3">
                  <View className="justify-center items-center rounded-full h-6 w-6 bg-blue-500">
                    <Text className="text-sm font-medium text-white">
                      {index + 1}
                    </Text>
                  </View>
                  <View className="flex-row flex-1 justify-between h-14 px-2">
                    <View className="w-11/12 flex-row justify-between">
                      <View className="w-4/6 p-1 justify-between">
                        <Text
                          className="text-base font-medium"
                          numberOfLines={1}>
                          {item.name}
                        </Text>
                        <View className="flex-row">
                          <Image
                            style={{width: 18, height: 18}}
                            source={require('../../../../public/assets/rule/coin.png')}
                          />
                          <Text className="ml-1">{item.point}</Text>
                        </View>
                      </View>
                      <View className="flex-row justify-center items-center w-2/6 p-2">
                        <Image
                          style={{width: 18, height: 18}}
                          source={require('../../../../public/assets/rule/rule-mark.png')}
                        />
                        <Text numberOfLines={1} className="px-2 text-xs">
                          {item?.userList[0]?.username}
                        </Text>
                      </View>
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
                          navigation.navigate('add-rule', {rule, rules: item})
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
