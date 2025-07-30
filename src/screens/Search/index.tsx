import {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStore} from '../../stores';
import {SetItem} from '../../Components/SetItem';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../router';
import {Loader} from '../../Components/Loader';
type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'MySetListScreen'
>;

export const SearchScreen = observer(() => {
  const {
    searchStore: {search, results, loading, clearSearch},
  } = useStore();
  const navigation = useNavigation<NavigationProps>();

  const [valueToSearch, setValueToSearch] = useState('');

  const onSearch = () => {
    search(valueToSearch);
  };
  const resetSearch = () => {
    clearSearch();
    setValueToSearch('');
  };
  const setPress = (set_num: string, name: string) => () => {
    navigation.navigate('SetDetailsScreen', {set_num, name});
  };
  return (
    <SafeAreaView style={styles.wrapper} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput
            placeholderTextColor={'#333'}
            style={styles.input}
            returnKeyType="search"
            value={valueToSearch}
            onChangeText={setValueToSearch}
            placeholder="Search"
            onSubmitEditing={onSearch}
          />
          {results.length > 0 && (
            <TouchableOpacity style={styles.clearSearch} onPress={resetSearch}>
              <Text style={styles.clearSearchX}>{'X'}</Text>
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          refreshing={loading}
          style={styles.list}
          data={results}
          keyExtractor={i => i.set_num}
          renderItem={({item}) => (
            <SetItem item={item} onPress={setPress(item.set_num, item.name)} />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
      <Loader visible={loading} />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  container: {flex: 1},
  list: {padding: 16},
  search: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#333',
    marginHorizontal: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    fontSize: 24,
  },
  separator: {height: 8},
  clearSearch: {
    width: 65,
    backgroundColor: 'red',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSearchX: {
    color: '#fff',
    fontSize: 24,
  },
});
