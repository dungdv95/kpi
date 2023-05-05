import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {Fragment, useState} from 'react';
import {Button, Divider, Searchbar} from 'react-native-paper';
import {Appbar} from 'react-native-paper';
import {Platform} from 'react-native';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
const list = [
  {id: 1, title: 'Điểm thưởng'},
  {id: 2, title: 'Điểm phạt'},
];

export default function RulesManager({navigation}) {
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [search, setSearch] = useState('');
  const handleBack = () => {
    if (visibleSearch) {
      setVisibleSearch(false);
    } else {
      navigation.goBack();
    }
  };
  return (
    <Fragment>
      <Appbar.Header style={{backgroundColor: '#61BDFF'}}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title="Các quản lý quy tắc" />
      </Appbar.Header>
      <View className="flex-1">
        <ScrollView>
          {list.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('rule-list', {rule: item})}>
              {renderRules(item, index)}
              <Divider bold />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Fragment>
  );
}

const renderRules = (item, index) => {
  return (
    <View className="flex-row p-5">
      <View className="justify-center items-center rounded-full h-6 w-6 bg-blue-500">
        <Text className="text-sm font-medium text-white">{index + 1}</Text>
      </View>
      <View className="justify-center ml-3 w-full">
        <Text className="text-lg font-medium">{item.title}</Text>
      </View>
    </View>
  );
};
