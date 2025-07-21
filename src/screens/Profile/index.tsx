import {observer} from 'mobx-react';
import {Image, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStore} from '../../stores';

export const ProfileScreen = observer(() => {
  const {
    userStore: {user},
  } = useStore();

  return (
    <SafeAreaView>
      {!!user.avatar_img && (
        <Image style={styles.avatar} src={user.avatar_img} />
      )}

      <Text>{`Username: ${user.username}`}</Text>
      <Text>{`Email: ${user.email}`}</Text>
      <Text>{`User Id: ${user.user_id}`}</Text>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
  },
});
