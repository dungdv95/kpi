import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Appbar} from 'react-native-paper';
import {Platform} from 'react-native';
import {Fragment} from 'react';
// import StatisticsChart from '../../../src/screens/StatisticMemberScreen/container/Statistics.Chart.Member';

// import ModalDatePicker from '../../../src/screens/StatisticsScreen/components/ModalDatePicker';

const GRADIENT_COLORS = ['#bbd4ef', '#edbbd8'];

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export default function Statistical({navigation}) {
  const [isVisibleDevice, setIsVisibleDevice] = useState(false);
  console.log('====================================');
  console.log('navigation', navigation);
  console.log('====================================');
  const onCloseModalDevice = () => {
    setIsVisibleDevice(!isVisibleDevice);
  };
  return (
    <Fragment>
      <Appbar.Header style={{backgroundColor: '#61BDFF'}}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Thống kê điểm" color="white" />
        <Appbar.Action
          icon="calendar"
          color="white"
          onPress={() => setIsVisibleDevice(true)}
        />
        <Appbar.Action icon="magnify" color="white" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} color="white" onPress={() => {}} />
      </Appbar.Header>
      <View className="mt-3 items-center">
        {/* <StatisticsChart navigation={navigation} /> */}
      </View>
      {/* <ModalDatePicker
        isVisible={isVisibleDevice}
        closeModal={onCloseModalDevice}
      /> */}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
});
