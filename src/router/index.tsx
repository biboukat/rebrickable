import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {LoginScreen} from '../screens/Login';
import {observer} from 'mobx-react';
import {useStore} from '../stores';
import {SplashScreen} from '../screens/SplashScreen';
import {useEffect} from 'react';
import {Tabs} from './tabNavigator';
import {MyAllSetList} from '../screens/MyAllSetList';
import {MySetList} from '../screens/MySetList';
import {SetDetails} from '../screens/SetDetails';

export type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
  MyAllSetListScreen: undefined;
  MySetListScreen: {id: number; name: string};
  SetDetailsScreen: {set_num: string; name: string};
};
const RootStackNavigator = createNativeStackNavigator<RootStackParamList>();

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
      <RootStackNavigator.Navigator>
        {authStore.authToken.length > 0 ? (
          <>
            <RootStackNavigator.Screen
              name="Tabs"
              component={Tabs}
              options={{headerShown: false}}
            />
            <RootStackNavigator.Screen
              name="MyAllSetListScreen"
              component={MyAllSetList}
              options={{title: 'My Set Lists'}}
            />
            <RootStackNavigator.Screen
              name="MySetListScreen"
              component={MySetList}
              options={p => ({title: p.route.params.name})}
            />
            <RootStackNavigator.Screen
              name="SetDetailsScreen"
              component={SetDetails}
              options={p => ({title: p.route.params.name})}
            />
          </>
        ) : (
          <RootStackNavigator.Screen name="Login" component={LoginScreen} />
        )}
      </RootStackNavigator.Navigator>
    </NavigationContainer>
  );
});
