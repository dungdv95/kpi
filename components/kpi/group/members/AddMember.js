import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {Appbar, Divider} from 'react-native-paper';
import {HelperText, TextInput, RadioButton} from 'react-native-paper';
import apis from '../../../../src/apis';

export default function AddMember({navigation, route}) {
  const {group, member} = route.params;
  console.log('member', member);
  console.log('group', group);
  const [name, setName] = useState(member?.fullName);
  const [email, setEmail] = useState(member?.email);
  const [role, setRole] = useState(member?.role || 'leader');
  const [listRole, setListRole] = useState([]);
  const [skill, setSkill] = useState(member?.skills);

  console.log('group', group);

  const handleSaveMember = () => {
    console.log('name', name);
    console.log('role', role);
    console.log('skill', skill);
  };

  const hasErrors = () => {
    return name;
  };

  const getRoles = () => {
    apis
      .getAllRoles()
      .then(res => {
        setListRole(convertRole(res, group?.name));
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getRoles();
  }, []);

  console.log('listRole', listRole);

  return (
    <Fragment>
      <Appbar.Header style={{backgroundColor: '#61BDFF'}}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={
            <View className="p-2">
              <Text
                className="text-lg font-medium text-white"
                numberOfLines={1}>
                {member
                  ? `Sửa thông tin cho ${group.name}`
                  : `Thêm thành viên cho ${group.name}`}
              </Text>
            </View>
          }
        />

        <Appbar.Action
          color="white"
          size={26}
          disabled={!(name && role && skill)}
          icon="content-save-check"
          onPress={handleSaveMember}
        />
      </Appbar.Header>

      <ScrollView>
        <View className="mt-2 justify-center p-2">
          <View>
            <TextInput
              mode="outlined"
              label="Tên"
              value={name}
              onChangeText={text => setName(text)}
            />
            <HelperText type="error" visible={!hasErrors()}>
              Tên không được để trống!
            </HelperText>
          </View>
          <Divider bold className="my-5" />
          <View>
            <TextInput
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <HelperText type="error" visible={true}>
              Email không được để trống!
            </HelperText>
          </View>
          <Divider bold className="my-5" />
          <View className="flex-row">
            <RadioButton.Group onValueChange={val => setRole(val)} value={role}>
              <View className="flex flex-row">
                <View className="basis-1/3 flex-row items-center">
                  <RadioButton value="leader" />
                  <Text>Tổ Trưởng</Text>
                </View>
                <View className="basis-1/3 flex-row items-center">
                  <RadioButton value="teamleader" />
                  <Text>Team Leader</Text>
                </View>
                <View className="basis-1/3 items-center flex-row">
                  <RadioButton value="member" />
                  <Text>Member</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
          <Divider bold className="my-5" />
          <View>
            <TextInput
              mode="outlined"
              label="Kỹ năng"
              multiline={true}
              value={skill}
              onChangeText={text => setSkill(text)}
              numberOfLines={6}
            />
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
}

const convertRole = (list, nameGroup) => {
  console.log('list', list);
  console.log('nameGroup', nameGroup);
};
