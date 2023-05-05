import React from 'react';
import {Alert} from 'react-native';

const Confirm = (title, handleConfirm, data = {}) => {
  Alert.alert('Confirm', title, [
    {
      text: 'Cancel',
      onPress: () => handleConfirm('no', data),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => handleConfirm('oke', data)},
  ]);
};
export {Confirm};
