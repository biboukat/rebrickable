import {StyleSheet, FlatList, View} from 'react-native';
import {RootStackParamList} from '../../router';
import {useEffect} from 'react';
import {useStore} from '../../stores';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {observer} from 'mobx-react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {SetItem} from '../../Components/SetItem';
type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'MySetListScreen'
>;
type RouteProps = NativeStackScreenProps<RootStackParamList, 'MySetListScreen'>;
export const MySetList = observer((props: RouteProps) => {
  const navigation = useNavigation<NavigationProps>();
  const {
    setsStore: {getSetListById, getSetListByIdLoading, setListById},
  } = useStore();
  const getData = () => {
    if (props?.route?.params?.id) {
      getSetListById(props?.route?.params?.id);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const setPress = (set_num: string, name: string) => () => {
    navigation.navigate('SetDetailsScreen', {set_num, name});
  };
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        style={styles.list}
        refreshing={getSetListByIdLoading}
        onRefresh={getData}
        data={setListById.get(props?.route?.params?.id) || []}
        renderItem={({item}) => (
          <SetItem
            item={item.set}
            onPress={setPress(item.set.set_num, item.set.name)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={item => `${item.set.set_num}`}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {},
  list: {padding: 16},
  separator: {height: 8},
});
