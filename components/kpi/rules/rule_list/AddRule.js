import React, {Fragment, useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Appbar, Divider, HelperText, TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import apis from '../../../../src/apis';
import {notifyMessage} from '../../../../utils/toast';

export default function AddRule({navigation, route}) {
  const dispatch = useDispatch();
  const {rule, rules} = route.params;
  console.log('rule', rule);
  console.log('rules', rules);
  const [nameRule, setNameRule] = useState(rules?.name);
  const [score, setScore] = useState(rules?.point?.toString());
  const [description, setDescription] = useState(rules?.note);
  const [listUser, setListUser] = useState([]);
  const [openUser, setOpenUser] = useState(false);
  const [valueUser, setValueUser] = useState(() => {
    if (rules) {
      return getUserList(rules?.userList);
    }
    return [];
  });

  const errNameRule = () => {
    return nameRule;
  };

  const scoreEmp = () => {
    return score;
  };

  const scoreMinMax = () => {
    let tmpScore = Number(score);
    if (isNaN(tmpScore)) {
      return false;
    }
    if (rule?.id === 1) {
      if (!(tmpScore > 0 && tmpScore < 31)) {
        return false;
      } else {
        return true;
      }
    } else {
      if (!(tmpScore > -6 && tmpScore < 0)) {
        return false;
      } else {
        return true;
      }
    }
  };

  const newRules = () => {
    const submitData = {
      name: nameRule,
      point: Number(score),
      userIdList: valueUser,
      note: description,
      type: rule.id,
    };
    apis
      .createRules(submitData)
      .then(res => {
        console.log(res);
        navigation.goBack();
      })
      .catch(err => {
        console.log('err', err);
        notifyMessage(err?.message);
      })
      .finally(() => {});
  };

  const editRules = () => {
    const submitData = {
      id: rules?.id,
      name: nameRule,
      point: Number(score),
      userIdList: valueUser,
      note: description,
      type: rule.id,
    };
    apis
      .editRule(submitData)
      .then(res => {
        console.log(res);
        navigation.goBack();
      })
      .catch(err => {
        notifyMessage(err?.message);
      })
      .finally(() => {});
  };

  const handleAddRule = () => {
    if (rules) {
      editRules();
    } else {
      newRules();
    }
  };

  const getAllUser = () => {
    apis
      .getAllUser()
      .then(res => setListUser(convertData(res)))
      .catch(err => {
        if (err.message === '401') {
          removeStorage('token');
          navigation.navigate('login');
        }
      })
      .finally(() => {});
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <Fragment>
      <Appbar.Header style={{backgroundColor: '#61BDFF'}}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={
            <View className="p-2">
              <Text className="text-lg font-medium text-white">
                {rules
                  ? `Sửa thông tin ${rule.title}`
                  : `Thêm mới ${rule.title}`}
              </Text>
            </View>
          }
        />
        <Appbar.Action
          color="white"
          size={26}
          disabled={!(nameRule && score && valueUser.length > 0)}
          icon="content-save-check"
          onPress={handleAddRule}
        />
      </Appbar.Header>
      <ScrollView>
        <View className="flex-1 mt-2 justify-center p-2">
          <View>
            <TextInput
              mode="outlined"
              label="Tên Rule"
              value={nameRule}
              onChangeText={text => setNameRule(text)}
            />
            <HelperText type="error" visible={!errNameRule()}>
              Tên rule không được để trống!
            </HelperText>
          </View>
          <Divider bold className="my-5" />
          <View>
            <TextInput
              label="Nhập điểm"
              mode="outlined"
              keyboardType="numeric"
              value={score}
              onChangeText={text => setScore(text)}
              maxLength={rule?.id === 1 ? 2 : 3}
              left={
                <TextInput.Icon
                  iconColor="#FFD700"
                  icon={rule?.id === 1 ? 'bank-plus' : 'bank-minus'}
                />
              }
            />
            <HelperText type="error" visible={!scoreEmp()}>
              Điểm số không được để trống!
            </HelperText>
            <HelperText type="error" visible={!scoreMinMax()}>
              Điểm số không hợp lệ{' '}
              {rule?.id === 1 ? '( khoảng 1 đến 30)' : '(khoảng -5 đến -1)'}
            </HelperText>
          </View>
          <Divider bold className="my-5" />
          <DropDownPicker
            open={openUser}
            value={valueUser}
            items={listUser}
            setOpen={setOpenUser}
            setValue={setValueUser}
            setItems={setListUser}
            multiple={true}
            mode="BADGE"
            searchable={true}
            listMode="MODAL"
            badgeDotColors={[
              '#e76f51',
              '#00b4d8',
              '#e9c46a',
              '#e76f51',
              '#8ac926',
              '#00b4d8',
              '#e9c46a',
            ]}
          />

          <Divider bold className="my-5" />
          <View>
            <TextInput
              label="Mô tả"
              mode="outlined"
              multiline={true}
              value={description}
              onChangeText={text => setDescription(text)}
              numberOfLines={6}
            />
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
}

const convertData = data => {
  return data.map((item, index) => {
    return {
      id: item.id,
      label: item.fullName,
      value: item.id,
    };
  });
};

const getUserList = userList => {
  const listId = [];
  userList.forEach(element => {
    listId.push(element.id);
  });
  return listId;
};

const getRuleTitle = (roleMark, allRule) => {
  const rule = allRule.find(element => element.id === roleMark);
  return rule?.groupName;
};
