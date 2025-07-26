import {useState} from 'react';
import {FlatList, StyleSheet, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStore} from '../../stores';
import {SetItem} from '../../Components/SetItem';
import {observer} from 'mobx-react';

export const SearchScreen = observer(() => {
  const {
    searchStore: {search, results},
  } = useStore();
  const [valueToSearch, setValueToSearch] = useState('');
  const onSearch = () => {
    search(valueToSearch);
  };
  return (
    <SafeAreaView style={styles.wrapper} edges={['top']}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          returnKeyType="search"
          value={valueToSearch}
          onChangeText={setValueToSearch}
          placeholder="Search"
          onSubmitEditing={onSearch}
        />
        <FlatList
          style={styles.list}
          data={results}
          keyExtractor={i => i.set_num}
          renderItem={({item}) => <SetItem item={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  container: {flex: 1},
  list: {padding: 16},
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#333',
    paddingVertical: 16,
    paddingHorizontal: 8,
    fontSize: 24,
    marginHorizontal: 16,
  },
  separator: {height: 8},
});
