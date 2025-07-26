import {observer} from 'mobx-react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStore} from '../../stores';

export const ProfileScreen = observer(() => {
  const {
    userStore: {user, logOut},
  } = useStore();
  const logOutPress = () => {
    logOut();
  };
  return (
    <SafeAreaView>
      {!!user.avatar_img && (
        <Image style={styles.avatar} src={user.avatar_img} />
      )}

      <Text>{`Username: ${user.username}`}</Text>
      <Text>{`Email: ${user.email}`}</Text>
      <Text>{`User Id: ${user.user_id}`}</Text>
      <Text>{`Last ip: ${user.last_ip}`}</Text>
      <Text>{`Last activity: ${user.last_activity}`}</Text>
      {!!user.lego && (
        <>
          <Text>{`All parts: ${user.lego.all_parts}`}</Text>
          <Text>{`Total figs: ${user.lego.total_figs}`}</Text>
          <Text>{`Total sets: ${user.lego.total_sets}`}</Text>
        </>
      )}
      {!!user.rewards && (
        <>
          <Text>{`Level: ${user.rewards.level}`}</Text>
          <Text>{`Points: ${user.rewards.points}`}</Text>
        </>
      )}
      <TouchableOpacity onPress={logOutPress}>
        <Text>{'Log out'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
  },
});
