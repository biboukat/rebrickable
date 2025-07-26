import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileScreen} from '../screens/Profile';
import {UserIcon} from './Components/UserIcon';
import {MyLegoScreen} from '../screens/MyLego';
import {SearchScreen} from '../screens/Search';

const Tab = createBottomTabNavigator();

const RenderIcon = () => {
  return <UserIcon />;
};
const tabScreenOptions = {
  headerShown: false,
  tabBarActiveTintColor: '#333',
  tabBarInactiveTintColor: '#fff',
  tabBarStyle: {backgroundColor: '#8ab933'},
};
export const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="MyLegoTab"
        component={MyLegoScreen}
        options={{tabBarLabel: 'My lego'}}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{tabBarLabel: 'Search'}}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{tabBarIcon: RenderIcon, tabBarLabel: 'Profile'}}
      />
    </Tab.Navigator>
  );
};
