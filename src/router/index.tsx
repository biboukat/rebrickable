import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from '../screens/home';
import {LoginScreen} from '../screens/login';
import {observer} from 'mobx-react';
import {useStore} from '../stores';
import {SplashScreen} from '../screens/SplashScreen';
import {useEffect} from 'react';

const Stack = createNativeStackNavigator();
export const RootStack = observer(() => {
  const {authStore} = useStore();
  useEffect(() => {
    authStore.init();
  }, []);

  if (authStore.initLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authStore.authToken.length > 0 ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});
