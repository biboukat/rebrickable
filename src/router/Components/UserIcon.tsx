import {observer} from 'mobx-react';
import {Image, StyleSheet, View} from 'react-native';
import { useStore } from '../../stores';

export const UserIcon =  observer(() => {
  const {
    userStore: {
      user: {avatar_img},
    },
  } = useStore();
  return !avatar_img ? (
    <View style={styles.icon} />
  ) : (
    <Image style={styles.icon} src={avatar_img} />
  );
});

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    borderRadius: 16,
    backgroundColor: '#fdffdf',
  },
});
