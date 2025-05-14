import {observer} from 'mobx-react';
import {Button, View, TextInput, ActivityIndicator} from 'react-native';
import {useStore} from '../../stores';
import {useState} from 'react';

export const LoginScreen = observer(() => {
  const {authStore} = useStore();
  const [username, setUsername] = useState('alxdr');
  const [password, setPassword] = useState('UBtd-2A_9*S-j#R');
  return (
    <View>
      {authStore.loginLoading && <ActivityIndicator size={'large'} />}
      <TextInput
        placeholder="User name or Email"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="press me"
        onPress={() => authStore.login(username, password)}
      />
    </View>
  );
});
