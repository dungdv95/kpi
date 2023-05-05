import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Appbar,
  Button,
  Divider,
  IconButton,
  Menu,
  Modal,
  Tooltip,
} from 'react-native-paper';
import {Platform} from 'react-native';
import {Fragment} from 'react';

// import ModalDatePicker from '../../../src/screens/StatisticsScreen/components/ModalDatePicker';
import Chart from './chart';
import DropDownPicker from 'react-native-dropdown-picker';
import apis from '../../../src/apis';

const GRADIENT_COLORS = ['#bbd4ef', '#edbbd8'];

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export default function Statistical({route, navigation}) {
  const [isVisibleDevice, setIsVisibleDevice] = useState(false);
  const [listMonth, setListMonth] = useState([
    {
      value: 1,
      label: 'Jan',
    },
    {
      value: 2,
      label: 'Feb',
    },
    {
      value: 3,
      label: 'Mar',
    },
    {
      value: 4,
      label: 'Apr',
    },
    {
      value: 5,
      label: 'May',
    },
    {
      value: 6,
      label: 'Jun',
    },
    {
      value: 7,
      label: 'Jul',
    },
    {
      value: 8,
      label: 'Aug',
    },
    {
      value: 9,
      label: 'Sep',
    },
    {
      value: 10,
      label: 'Oct',
    },
    {
      value: 11,
      label: 'Nov',
    },
    {
      value: 12,
      label: 'Dec',
    },
  ]);
  const [openMonth, setOpenMonth] = useState(false);
  const [valueMonth, setValueMonth] = useState(() => {
    return new Date().getMonth() + 1;
  });

  const [openYear, setOpenYear] = useState(false);
  const [valueYear, setValueYear] = useState(() => {
    return new Date().getFullYear();
  });
  const [listYear, setListYear] = useState([
    {
      value: 2020,
      label: '2020',
    },
    {
      value: 2021,
      label: '2021',
    },
    {
      value: 2022,
      label: '2022',
    },
    {
      value: 2023,
      label: '2023',
    },
  ]);

  const [openGroup, setOpenGroup] = useState(false);
  const [valueGroup, setValueGroup] = useState(3);
  const [listGroup, setListGroup] = useState([
    {
      value: 3,
      label: 'BO',
    },
    {
      value: 4,
      label: 'BA',
    },
    {
      value: 5,
      label: 'QC',
    },
    {
      value: 6,
      label: 'DEV',
    },
    {
      value: 7,
      label: 'Công Nghệ',
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const [dataChart, setDataChart] = useState([]);

  const onCloseModalDevice = () => {
    console.log('onCloseModalDevice');
    setIsVisibleDevice(!isVisibleDevice);
  };

  const getData = (groupId, month, year) => {
    setIsLoading(true);
    apis
      .reportPointByMonth({groupId, month, year})
      .then(res => setDataChart(res))
      .catch(err => console.log('err', err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData(valueGroup, valueMonth, valueYear);
  }, [valueGroup, valueMonth, valueYear]);

  return (
    <Fragment>
      <Appbar.Header style={{backgroundColor: '#61BDFF'}}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Thống kê điểm" color="white" />
        {/* <Appbar.Action
          icon="calendar"
          color="white"
          onPress={() => setIsVisibleDevice(true)}
        /> */}
        <Appbar.Action icon="magnify" color="white" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} color="white" onPress={() => {}} />
      </Appbar.Header>
      <View className="flex-1 p-1 bg-[#fff]">
        <View className="my-1 h-[8%] z-10">
          <View className="flex-row justify-between">
            <View className="w-[30%] mr-1">
              <DropDownPicker
                placeholder="Group"
                style={{minHeight: 35}}
                open={openGroup}
                value={valueGroup}
                items={listGroup}
                setOpen={setOpenGroup}
                setValue={setValueGroup}
                setItems={setListGroup}
              />
            </View>
            <View className="w-[30%] mr-1">
              <DropDownPicker
                placeholder="Month"
                style={{minHeight: 35}}
                maxHeight={1000}
                dropDownDirection="BOTTOM"
                open={openMonth}
                value={valueMonth}
                items={listMonth}
                setOpen={setOpenMonth}
                setValue={setValueMonth}
                setItems={setListMonth}
              />
            </View>
            <View className="w-[30%]">
              <DropDownPicker
                placeholder="Year"
                style={{minHeight: 35}}
                open={openYear}
                value={valueYear}
                items={listYear}
                setOpen={setOpenYear}
                setValue={setValueYear}
                setItems={setListYear}
              />
            </View>
          </View>
        </View>
        <Fragment>
          {isLoading ? (
            <ActivityIndicator size={50} className="flex-1" animating={true} />
          ) : (
            <Fragment>
              {dataChart.length ? (
                <Fragment>
                  <Chart data={dataChart} />
                  <ScrollView
                    className="h-[80%] z-1 mt-3"
                    showsVerticalScrollIndicator={false}>
                    {dataChart.map((item, index) => (
                      <TouchableOpacity
                        className="my-1"
                        key={index}
                        onPress={() => {}}>
                        <View className="flex-row p-2 bg-gray-200 rounded-md">
                          <View className="w-[70%]">
                            <Text className="py-1 text-lg font-semibold">
                              {item.username}
                            </Text>
                            <Text className="py-1">{item.email}</Text>
                          </View>
                          <View className="flex-row items-center justify-center w-[30%]">
                            <Text className="px-2">{item.score}</Text>
                            <Image
                              style={{width: 15, height: 15}}
                              source={require('../../../public/assets/rule/coin.png')}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </Fragment>
              ) : (
                <View className="items-center">
                  <Text className="text-lg font-bold">No Data</Text>
                </View>
              )}
            </Fragment>
          )}
        </Fragment>
      </View>

      {/* <ModalDatePicker
        isVisible={isVisibleDevice}
        closeModal={onCloseModalDevice}
      /> */}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  radiusLeft: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  radiusRight: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
});
