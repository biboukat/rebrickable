import {Button, Text, View} from 'react-native';
import {useStore} from '../../stores';
import {observer} from 'mobx-react';

export const HomeScreen = observer(() => {
  const {
    authStore,
    userStore: {getProfile, loading},
  } = useStore();

  return (
    <View>
      {loading && <Text>{'loading'}</Text>}
      <Button title={'Get profile'} onPress={getProfile} />
      <Button title={'Log out'} onPress={() => authStore.logOut()} />
    </View>
  );
});
