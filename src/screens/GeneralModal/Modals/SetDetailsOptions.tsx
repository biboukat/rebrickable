import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useStore} from '../../../stores';
import {Loader} from '../../../Components/Loader';

type Props = {set_num: string; name: string};
export const SetDetailsOptions = observer(({set_num, name}: Props) => {
  const {
    setsStore: {userSets, getSetLists, addSetToList, addSetToListLoading},
  } = useStore();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({title: name});
    getSetLists();
  }, []);
  const addToSetList = (listId: number) => async () => {
    await addSetToList(listId, set_num);
    navigation.goBack();
  };
  return (
    <View style={{flex: 1}}>
      <Text>{`Add Set(${set_num}) to List`}</Text>
      {userSets.map(v => (
        <TouchableOpacity
          style={{padding: 16, marginBottom: 16, backgroundColor: '#8ab933'}}
          key={`${v.id}`}
          onPress={addToSetList(v.id)}>
          <Text>{`${v.name} (${v.num_sets})`}</Text>
        </TouchableOpacity>
      ))}

      <Loader visible={addSetToListLoading} />
    </View>
  );
});
