import {useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useStore} from '../../stores';
import {IUserSet} from '../../api/types';
import {observer} from 'mobx-react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../router';
import {useNavigation} from '@react-navigation/native';
type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'MyAllSetListScreen'
>;
type ItemProps = {userList: IUserSet; onItemPress: () => void};
const Item = ({userList, onItemPress}: ItemProps) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <Text>{userList.name}</Text>
      <Text>{userList.num_sets}</Text>
    </TouchableOpacity>
  );
};

export const MyAllSetList = observer(() => {
  const {
    setsStore: {getSetLists, userSets, getSetListLoading},
  } = useStore();
  useEffect(() => {
    getSetLists();
  }, []);

  const navigation = useNavigation<NavigationProps>();
  const navigateToMySetList = (id: number, name: string) => () => {
    navigation.navigate('MySetListScreen', {id, name});
  };

  return (
    <View>
      <FlatList
        refreshing={getSetListLoading}
        onRefresh={getSetLists}
        data={userSets}
        renderItem={({item}) => (
          <Item
            userList={item}
            onItemPress={navigateToMySetList(item.id, item.name)}
          />
        )}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
});
