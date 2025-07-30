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
import {GeneralModal} from '../screens/GeneralModal';
import {Button} from 'react-native';

export type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
  MyAllSetListScreen: undefined;
  MySetListScreen: {id: number; name: string};
  SetDetailsScreen: {set_num: string; name: string};
  GeneralModal: {
    details: {flow: 'set_details_options'; set_num: string; name: string};
  };
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
              options={p => ({
                title: p.route.params.name,
                headerRight: () => (
                  <Button
                    onPress={() =>
                      p.navigation.navigate('GeneralModal', {
                        details: {
                          flow: 'set_details_options',
                          name: p.route.params.name,
                          set_num: p.route.params.set_num,
                        },
                      })
                    }
                    title="..."
                  />
                ),
              })}
            />
            <RootStackNavigator.Group screenOptions={{presentation: 'modal'}}>
              <RootStackNavigator.Screen
                name="GeneralModal"
                component={GeneralModal}
              />
            </RootStackNavigator.Group>
          </>
        ) : (
          <RootStackNavigator.Screen name="Login" component={LoginScreen} />
        )}
      </RootStackNavigator.Navigator>
    </NavigationContainer>
  );
});
