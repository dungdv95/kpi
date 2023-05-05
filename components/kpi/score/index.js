import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {Appbar, Modal, Portal, Button} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {actions} from '../../../src/store/store';
// import {changeBackground} from '../../../src/store/reducers/stateGlobal';
import apis from '../../../src/apis';
// import Home from '../../home';
export default function ScoreManager({navigation}) {
  const dispath = useDispatch();
  const listRule = useSelector(({score}) => score.ruleName);
  const dataRule = useSelector(({score}) => score.dataRule);
  const dataUser = useSelector(({score}) => score.dataUser);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [rules, setRules] = useState(dataRule);
  const [point, setPoint] = useState(null);

  const [typeRule, setTypeRule] = useState(1);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(-1);
  const [value3, setValue3] = useState(1);
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState(null);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [visible, setVisible] = React.useState(false);
  const [tenthanhvien, setTenthanhvien] = useState([
    {label: 'Tên Thành Viên 1', value: '1'},
    {label: 'Tên Thành Viên 2', value: 'Tên Thành Viên 2'},
    {label: 'Tên Thành Viên 3', value: 'Tên Thành Viên 3'},
    {label: 'Tên Thành Viên 4', value: 'Tên Thành Viên 4'},
    {label: 'Tên Thành Viên 5', value: 'Tên Thành Viên 5'},
    {label: 'Tên Thành Viên 6', value: 'Tên Thành Viên 6'},
    {label: 'Tên Thành Viên 7', value: 'Tên Thành Viên 7'},
    {label: 'Tên Thành Viên 8', value: 'Tên Thành Viên 8'},
  ]);
  const callApiScore = async () => {
    const data = await apis
      .score({
        ruleId: value5,
        score: typeRule == 2 ? point : value2,
        userId: value1,
        multiplier: typeRule == 2 ? value3 : 1,
        note: value4,
      })

      .then(data => {
        if (data) {
          console.log('data ', data);
        }
      })
      .catch(error => {
        console.log('error ', error);
      });
  };
  const getAllUser = async () => {
    const data = await apis
      .getAllUser()
      .then(data => {
        dispath(actions.setDataUser(data));

        let tempUser = [];
        if (data) {
          data.map(e => {
            tempUser.push({
              label: e.fullName,
              value: e.id,
            });
          });
        }
        dispath(actions.setDataUser(tempUser));
      })
      .catch(error => {
        console.log('error ', error);
      })
      .finally(() => {});
  };

  const getListByToken = async () => {
    const data = await apis
      .getListByToken({})
      .then(data => {
        dispath(actions.setDataRule(data));

        let tempRule = [];
        if (data) {
          data.map(e => {
            tempRule.push({
              label: e.name,
              value: e.id,
              type: e.type,
              point: e.point,
            });
          });
        }
        dispath(actions.setDataRule(tempRule));
        setRules(tempRule);
        setPoint(tempRule);
      })
      .catch(error => {
        console.log('error ', error);
      })
      .finally(() => {});
  };
  useEffect(() => {
    getListByToken();
    getAllUser();
  }, []);

  return (
    <View style={[styles.container]}>
      <Appbar.Header style={{backgroundColor: '#61BDFF'}}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Chấm Điểm" color="white" />
      </Appbar.Header>
      <View style={{paddingHorizontal: 100}}></View>
      <View style={{zIndex: 100}}>
        <View
          style={{
            top: '70%',
            marginHorizontal: '10%',
          }}>
          <DropDownPicker
            open={open}
            value={value}
            items={dataRule}
            setOpen={setOpen}
            setValue={setValue}
            searchable={true}
            showArrowIcon={false}
            placeholder="Chọn Rule thưởng/phạt"
            searchPlaceholder="Tìm Kiếm"
            dropDownContainerStyle={{
              backgroundColor: '#DAF7FE',
            }}
            selectedItemContainerStyle={{paddingStart: 25}}
            style={{paddingStart: 38}}
            maxHeight={260}
            autoScroll={true}
            onChangeValue={value => {
              setValue5(value);
            }}
            onSelectItem={item => {
              setTypeRule(item.type);
              setPoint(item.point);
            }}
            itemKey={'a'}
          />
        </View>
        <View style={{}}>
          <TouchableOpacity onPress={open => setOpen(!open)}>
            <Image
              source={require('../../../public/assets/score/icon4.png')}
              style={{
                width: 25,
                height: 22,
                resizeMode: 'cover',
                marginLeft: 46,
                position: 'absolute',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{top: '8%', zIndex: 99}}>
        <View
          style={{
            marginHorizontal: '10%',
          }}>
          <DropDownPicker
            open={open1}
            value={value1}
            items={dataUser}
            setOpen={setOpen1}
            setValue={setValue1}
            setItems={setTenthanhvien}
            searchable={true}
            placeholder="Chọn Thành Viên"
            searchPlaceholder="Tìm Kiếm"
            dropDownContainerStyle={{
              backgroundColor: '#DAF7FE',
            }}
            showArrowIcon={false}
            selectedItemContainerStyle={{paddingStart: 25}}
            style={{paddingStart: 38}}
            multiple={true}
            maxHeight={260}
            onChangeValue={value => {
              setValue1(value);
            }}
            itemKey={'a'}
          />
          <View style={{top: '-70%'}}>
            <TouchableOpacity>
              <Image
                source={require('../../../public/assets/score/group1.png')}
                style={{
                  resizeMode: 'cover',
                  position: 'absolute',
                  left: 8,
                  width: 27,
                  height: 22,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{top: '12%', zIndex: 8}}>
        <TextInput
          style={{
            borderWidth: 1.4,
            marginHorizontal: 40,
            borderRadius: 10,
            paddingStart: 40,
          }}
          onChangeText={value => {
            setValue2(value);
          }}
          editable={typeRule == 2 ? false : true}
          value={typeRule == 2 ? point : value}
          placeholder={typeRule == 2 ? `${point}` : 'nhập điểm'}
          keyboardType="numeric"
        />

        <Image
          source={require('../../../public/assets/score/coin2.png')}
          style={{
            width: 22,
            height: 22,
            top: -36,
            marginLeft: 50,
            resizeMode: 'cover',
          }}
        />
      </View>
      <View style={{top: '13%', zIndex: 8, marginHorizontal: '10%'}}>
        <TextInput
          style={{
            borderWidth: 1.4,
            borderRadius: 10,
            paddingStart: 42,
          }}
          onChangeText={value => {
            setValue3(value);
          }}
          value={value}
          editable={typeRule == 1 ? false : true}
          placeholder="Số lần vi phạm"
          keyboardType="numeric"
        />
        <Image
          source={require('../../../public/assets/score/countdown.png')}
          style={{
            width: 18,
            height: 18,
            top: '30%',
            marginLeft: '3%',
            resizeMode: 'cover',
            position: 'absolute',
          }}
        />
      </View>
      <View style={{top: '15%', zIndex: 8, marginHorizontal: '10%'}}>
        <Text style={{color: 'black', fontSize: 14}}>Note</Text>

        <TextInput
          style={{
            borderWidth: 1.4,
            borderRadius: 10,
            paddingStart: 5,
            height: '35%',
            width: '100%',
          }}
          textAlign="left"
          enterKeyHint="enter"
          multiline
          numberOfLines={4}
          maxLength={100}
          onChangeText={value => {
            setValue4(value);
          }}
          value={value4}
          keyboardType="default"
        />
      </View>
      <View style={{zIndex: 0, top: '-45%'}}>
        <Image
          source={require('../../../public/assets/score/lifestyle1.png')}
          style={{top: '30%', width: 500, opacity: 0.5}}
        />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            top: '90%',
            position: 'absolute',
            marginHorizontal: '35%',
          }}>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.containerStyle}>
              <View style={{flex: 1}}>
                <View
                  style={{
                    height: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomWidth: 0.4,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
                      paddingLeft: 10,
                      alignItems: 'center',
                    }}>
                    Bạn đã chấm điểm thành công
                  </Text>
                </View>

                <View
                  style={{
                    height: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Button onPress={hideModal} mode="text">
                    OK
                  </Button>
                </View>
              </View>
            </Modal>
          </Portal>

          <Button
            mode="contained"
            onPress={() => {
              callApiScore();
              showModal();
            }}
            buttonColor="#61BDFF">
            Xác nhận
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerCD: {
    width: '100%',
    height: 70,
    backgroundColor: '#61BDFF',
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerStyle: {
    backgroundColor: 'white',
    width: '80%',
    height: '16%',
    marginHorizontal: '10%',
    marginVertical: '15%',
    borderRadius: 20,
  },
});
