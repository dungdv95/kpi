import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {changeStatusLogin} from '../../src/store/reducers/stateGlobal';
import {removeStorage} from '../../utils/storage/storage';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Account({navigation}) {
  const [selected, setSelected] = useState('Vũ Thị Lệ Thu');
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Vũ Thị Lệ Thu', value: 'Vũ Thị Lệ Thu'},
  ]);
  const handleLogout = () => {
    removeStorage('token');
    // removeStorage('profile');
    dispatch(changeStatusLogin(false));
    navigation.navigate('login');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: '8%', backgroundColor: 'white', zIndex: 100}}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          searchable={true}
          searchPlaceholder="Tìm Kiếm"
          placeholder="Tìm kiếm tài khoản"
          maxHeight={260}
          onChangeValue={value => {
            console.log('Tim kiem: ', value);
            setSelected(value);
          }}
          style={{
            marginHorizontal: '15%',
            width: '70%',

            top: '2%',
            borderWidth: 2,
          }}
          dropDownContainerStyle={{width: '70%', marginHorizontal: '15%'}}
        />
        <TouchableOpacity onPress={handleLogout}>
          <Image
            style={{
              position: 'absolute',
              width: 30,
              height: 30,
              top: -30,
              left: '88%',
            }}
            source={require('../../public/assets/profile/back.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{height: '21%', zIndex: 9, top: '1%'}}>
        <Image
          style={{width: '96%', height: '100%', marginHorizontal: '2%'}}
          source={require('../../src/assets/cover2.jpg')}
        />
      </View>
      <View style={{alignItems: 'center', top: '-8%', zIndex: 15}}>
        <Image
          style={{
            borderWidth: 5,
            borderColor: 'white',
            resizeMode: 'cover',
            width: 120,
            height: 120,
            borderRadius: 120 / 2,
            zIndex: 1,
          }}
          source={require('../../src/assets/avt1.jpg')}
        />
        <Text
          style={{color: 'black', fontSize: 22, top: '5%', fontWeight: '500'}}>
          {selected}
        </Text>
      </View>
      <View
        style={{
          height: '10%',
          top: '-10%',
          flexDirection: 'row',
          marginHorizontal: '5%',
        }}>
        <View
          style={{
            // backgroundColor: 'red',
            width: '40%',
            height: '80%',
            left: '20%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 12}}>Số Điện Thoại</Text>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
            0912345678
          </Text>
        </View>
        <View
          style={{
            // backgroundColor: 'black',
            width: '60%',
            height: '80%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 12}}>Email</Text>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
            thu.vule10@mobifone.vn
          </Text>
        </View>
      </View>
      <View
        style={{
          height: '40%',
          backgroundColor: '#61BDFF',
          opacity: 0.8,
          top: '-6%',
          width: '90%',
          marginHorizontal: '5%',
          borderRadius: 14,
        }}>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: 'white',
            justifyContent: 'center',
            paddingLeft: '4%',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: '600',
              // top: -3,
            }}>
            Ngày sinh: 01/01/1996
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: 'white',
            justifyContent: 'center',
            paddingLeft: '4%',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: '600',
            }}>
            Tổng điểm KPI: 15
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: 'white',
            justifyContent: 'center',
            paddingLeft: '4%',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: '600',
            }}>
            Tổ: BO
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            borderBottomWidth: 0,
            borderColor: 'white',
            justifyContent: 'center',
            paddingLeft: '4%',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: '600',
            }}>
            Chuyên môn:
          </Text>
        </View>
      </View>
    </SafeAreaView>
    //
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  stretch: {
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  boxsearch: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    padding: 20,
    marginHorizontal: 30,
    marginLeft: 56,
    borderRadius: 12,
    zIndex: 1000,
    width: 300,
    positon: 'obsolute',
  },
  ttcn: {
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    width: '100%',
    height: '12%',
    zIndex: 300,
  },
  profile: {
    width: '80%',
    height: '50%',
    marginHorizontal: '10%',
    marginVertical: '17%',
    backgroundColor: '#E0E0E0',
  },
  avatar: {
    width: 50,
    height: 50,
    marginHorizontal: 20,
  },
});
