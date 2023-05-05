import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {ScrollView, View, ImageBackground, Image} from 'react-native';
import {Button, Dialog, Portal, Text, Modal} from 'react-native-paper';

const Detail = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState();

  useImperativeHandle(ref, () => ({
    open(data) {
      setData(data);
      setVisible(true);
    },
  }));
  //   console.log(data);
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{
          height: '100%',
        }}
        contentContainerStyle={{
          height: '60%',
          backgroundColor: 'white',
          padding: 6,
          margin: 5,
          borderRadius: 3,
        }}>
        <View className="h-full">
          <View className="py-1">
            <Text className="text-xl font-medium">{data?.title}</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="py-1">
              <Image
                className="w-full h-60"
                resizeMode="cover"
                source={data?.img}
              />
            </View>
            <View className="py-1">
              <Text>{data?.post}</Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
});
export default Detail;
