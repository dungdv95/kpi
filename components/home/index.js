import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import React, {Fragment, useRef, useState, useEffect, useCallback} from 'react';
import {Badge, Tooltip} from 'react-native-paper';
import Swiper from 'react-native-swiper';
import Notification from './Notification';
import Detail from './Detail';
import ItemHome from './Item.Home';
import TextTicker from 'react-native-text-ticker';
import {getStorageData} from '../../utils/storage/storage';
import {useFocusEffect} from '@react-navigation/native';
const listHead = [
  {
    id: 1,
    img: require('../../public/assets/home-icons/BG_01.jpg'),
  },
  {
    id: 2,
    img: require('../../public/assets/home-icons/BG_02.png'),
  },
  {
    id: 3,
    img: require('../../public/assets/home-icons/BG_03.jpg'),
  },
];

// const notification = [
//   {
//     id: 1,
//     title: 'Bản tin Big Data',
//     img: require('../../public/assets/home-icons/BG_04.jpg'),
//     post: `Anh/chị/em thân mến!\nBóng đá từ lâu đã được công nhận là môn thể thao vua vì tính phổ biến, sự hấp dẫn cùng những giá trị cao đẹp và nhân văn và vô cùng 123456789120321321Bóng đá từ lâu đã được công nhận là môn thể thao vua vì tính phổ biến, sự hấp dẫn cùng những giá trị cao đẹp và nhân văn và vô cùng 123456789120321321 Bóng đá từ lâu đã được công nhận là môn thể thao vua vì tính phổ biến, sự hấp dẫn cùng những giá trị cao đẹp và nhân văn và vô cùng 123456789120321321`,
//     date: '21/03/2022',
//   },
//   {
//     id: 2,
//     title: 'Bản tin Big Data',
//     img: require('../../public/assets/home-icons/BG_05.jpg'),
//     post: `Anh/chị/em thân mến!\nBóng đá từ lâu đã được công nhận là môn thể thao vua vì tính phổ biến, sự hấp dẫn cùng những giá trị cao đẹp và nhân văn và vô cùng hú hú hù hú hù ha hahaah hahaahahahahah`,
//     date: '25/03/2022',
//   },
// ];

// const events = [
//   {
//     id: 1,
//     title: 'Sự kiện Big Data',
//     img: require('../../public/assets/home-icons/BG_06.jpg'),
//     post: `Anh/chị/em thân mến!\nBóng đá từ lâu đã được công nhận là môn thể thao vua vì tính phổ biến, sự hấp dẫn cùng những giá trị cao đẹp và nhân văn và vô cùng 123456789120321321`,
//     date: '21/03/2022',
//   },
//   {
//     id: 2,
//     title: 'Sự kiện Big Data',
//     img: require('../../public/assets/home-icons/BG_02.png'),
//     post: `Anh/chị/em thân mến!\nBóng đá từ lâu đã được công nhận là môn thể thao vua vì tính phổ biến, sự hấp dẫn cùng những giá trị cao đẹp và nhân văn và vô cùng hú hú hù hú hù ha hahaah hahaahahahahah`,
//     date: '25/03/2022',
//   },
// ];

const data = [
  {
    name: 'Cycling',
    time: '21/02/2023',
    lightColor: '#f8e4d9',
    color: '#fcf1ea',
    darkColor: '#fac5a4',
    image: require('../../public/assets/home-icons/BG_01.jpg'),
    title: 'Sự kiện Big Data',
    post: `Anh/chị/em thân mến!\nBóng đá từ lâu đã được công nhận là môn thể thao vua vì tính phổ biến, sự hấp dẫn cùng những giá trị cao đẹp và nhân văn và vô cùng 123456789120321321Bóng đá từ lâu đã được công nhận là môn thể thao vua vì tính phổ biến, sự hấp dẫn cùng những giá trị cao đẹp và nhân văn và vô cùng 123456789120321321 Bóng đá từ lâu đã được công nhận là môn thể thao vua vì tính phổ biến, sự hấp dẫn cùng những giá trị cao đẹp và nhân văn và vô cùng 123456789120321321`,
  },
  {
    name: 'Walking',
    time: '25/06/2023',
    lightColor: '#d7f0f7',
    color: '#e8f7fc',
    darkColor: '#aceafc',
    image: require('../../public/assets/home-icons/BG_02.png'),
    title: 'Sự kiện Big Data',
    post: 'Hòa chung không khí hân hoan, náo nức hướng về dịp kỉ niệm 30 năm sinh nhật MobiFone, Hội thao MobiFone 2023 “ Bứt phá vươn cao” sắp tới sẽ bước vào vòng chung kết toàn quốc. Với các thành tích mà các VĐV của chúng ta xuất sắc giành được trong Hội thao của Cụm công đoàn Miền Bắc, Trung tâm Công nghệ thông tin MobiFone chúng ta vinh dự góp mặt những VĐV tiềm năng. TTNB vô cùng tự hào khi được điểm lại các thành tích mà chúng ta đạt được:',
  },
  {
    name: 'Yoga',
    time: '15/03/2023',
    lightColor: '#dad5fe',
    color: '#e7e3ff',
    darkColor: '#8860a2',
    image: require('../../public/assets/home-icons/BG_03.jpg'),
    title: 'Sự kiện Big Data',
    post: 'Hòa chung không khí hân hoan, náo nức hướng về dịp kỉ niệm 30 năm sinh nhật MobiFone, Hội thao MobiFone 2023 “ Bứt phá vươn cao” sắp tới sẽ bước vào vòng chung kết toàn quốc. Với các thành tích mà các VĐV của chúng ta xuất sắc giành được trong Hội thao của Cụm công đoàn Miền Bắc, Trung tâm Công nghệ thông tin MobiFone chúng ta vinh dự góp mặt những VĐV tiềm năng. TTNB vô cùng tự hào khi được điểm lại các thành tích mà chúng ta đạt được:',
  },
];

export default function Home() {
  const notiRef = useRef();
  const detailRef = useRef();
  const [profile, setProfile] = useState();

  useFocusEffect(
    useCallback(() => {
      getStorageData('profile').then(value => {
        setProfile(value);
      });
      return () => {};
    }, []),
  );

  console.log('profile', profile);
  return (
    <Fragment>
      <View className="flex-1">
        <View className="w-full h-40">
          <Swiper autoplay autoplayTimeout={10}>
            {listHead.map((item, index) => (
              <View key={item.id}>
                <ImageBackground
                  className="w-full opacity-50 h-full"
                  resizeMode="cover"
                  source={item.img}
                />
              </View>
            ))}
          </Swiper>
          {/* <View className="absolute top-2 left-2">
            <TouchableOpacity>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../public/assets/home-icons/alert.png')}
              />
            </TouchableOpacity>
          </View> */}
          <View className="absolute top-2 right-2">
            <TouchableOpacity onPress={() => notiRef.current.open()}>
              <Badge className="absolute z-10" size={15}>
                3
              </Badge>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../public/assets/home-icons/notice.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="p-2 flex-row ">
          <Image
            style={{width: 36, height: 36}}
            source={require('../../public/assets/home-icons/girl.png')}
          />
          <View className="ml-3">
            <Text className="text-base font-semibold">
              Hi {profile?.fullName}!
            </Text>
            <Text className="italic text-xs">Have a nice day</Text>
          </View>
          <View
            style={{
              height: 50,
              width: 180,
              flexDirection: 'row',
              top: -7,
              left: 90,
            }}>
            <View
              style={{height: '100%', width: '25%', justifyContent: 'center'}}>
              <Image
                source={require('./image/music2.png')}
                style={{
                  resizeMode: 'cover',
                  width: '70%',
                  height: '60%',
                }}
              />
            </View>
            <View style={{justifyContent: 'center'}}>
              <TextTicker
                style={{fontSize: 20}}
                duration={5000}
                loop
                bounce
                repeatSpacer={50}
                marqueeDelay={1000}>
                Một triệu like - Đen Vâu
              </TextTicker>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="p-2">
            <View className="mb-1">
              <Text className="text-base font-bold">Điểm tin nổi bật</Text>
            </View>
            <View className="p-2 border border-dotted border-stone-300">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tab_view}>
                <View style={{flexDirection: 'row'}}>
                  {data.map((item, index) => (
                    <ItemHome key={item.name} index={index} item={item} />
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
      <Notification ref={notiRef} />
      <Detail ref={detailRef} />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  tab_view: {
    marginBottom: 16,
  },
});
