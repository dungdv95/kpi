import {StyleSheet} from 'react-native';
import {IconButton, Tooltip} from 'react-native-paper';

import React, {
  Fragment,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {ScrollView, View, Image} from 'react-native';
import {Dialog, Portal, Text, Button} from 'react-native-paper';

const data = [
  {
    id: 1,
    notice:
      'Một số task của bạn đang quá deadline, vui lòng bấm vào link sau để check & cập nhật trạng thái mới nhất: *link*, số điểm bị trừ: xxx',
    date: '21/05/2023',
    time: '20:15:30',
  },
  {
    id: 2,
    notice:
      'Ngày 27-03-2023 bạn có x task đã close nhưng chưa note lại link tài liệu tương ứng, vui lòng bấm vào link sau để check & cập nhật note lại link tài liệu: *link*, số điểm bị trừ: xxx',
    date: '10/2/2023',
    time: '20:00:20',
  },
  {
    id: 3,
    notice:
      'Một số tài liệu của bạn đẩy lên git chưa đúng vị trí quy định, vui lòng bấm vào link sau để check & cập nhật lại vị trí: *link*, số điểm bị trừ: xxx',
    date: '11/12/2023',
    time: '22:15:32',
  },
  {
    id: 4,
    notice:
      'Một số tài liệu của bạn có comment của QA, vui lòng bấm vào link sau để check Review Record & phản hồi: *link*, số điểm bị trừ: xxx',
    date: '11/12/2023',
    time: '10:15:20',
  },
  {
    id: 5,
    notice:
      'Tháng qua, bạn có xxx ngày không logwork, bạn bị trừ yyy điểm. Vui lòng logwork bù cho những ngày này!',
    date: '11/12/2023',
    time: '8:25:30',
  },
];

const Notification = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
  }));

  return (
    <Fragment>
      <Portal>
        <Dialog
          style={{backgroundColor: 'white'}}
          className="h-3/4"
          visible={visible}
          onDismiss={() => setVisible(false)}>
          <Dialog.Title>Thông báo của bạn</Dialog.Title>
          <Dialog.ScrollArea className="px-2 py-3">
            <View className="h-full">
              <ScrollView showsVerticalScrollIndicator={false}>
                {data.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: 'white',
                      borderBottomWidth: 0.2,
                      paddingVertical: 13,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      {/* <Image
                        source={require('../../public/assets/home-icons/arrow2.jpg')}
                        style={{
                          resizeMode: 'contain',
                          width: 20,
                          height: 17,
                          top: -4,
                        }} */}
                      {/* /> */}
                      <Text
                        style={{
                          marginRight: 22,
                          marginLeft: 10,
                          fontSize: 14,
                          top: -5,
                        }}>
                        {'   '}
                        {item.notice}
                      </Text>
                    </View>
                    <View
                      style={{
                        top: 3,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginHorizontal: -10,
                        paddingVertical: 2,
                      }}>
                      <Text style={{color: '#57A4FF'}}>{item.date}</Text>
                      <Text style={{}}>{item.time}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </Dialog.ScrollArea>
          <Dialog.Actions className="py-2">
            <Button onPress={() => setVisible(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Fragment>
  );
});

export default Notification;
