import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileScreen} from '../screens/Profile';
import {UserIcon} from './Components/UserIcon';
import {MyLegoScreen} from '../screens/MyLego';

const Tab = createBottomTabNavigator();

const RenderIcon = () => {
  return <UserIcon />;
};
export const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="MyLegoTab" component={MyLegoScreen} />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{tabBarIcon: RenderIcon}}
      />
    </Tab.Navigator>
  );
};
