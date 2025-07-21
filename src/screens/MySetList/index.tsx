import {View, StyleSheet, FlatList} from 'react-native';
import {RootStackParamList} from '../../router';
import {useEffect} from 'react';
import {useStore} from '../../stores';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {observer} from 'mobx-react';
import {SetItem} from './SetItem';

type RouteProps = NativeStackScreenProps<RootStackParamList, 'MySetListScreen'>;
export const MySetList = observer((props: RouteProps) => {
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
  return (
    <View style={styles.container}>
      <FlatList
        refreshing={getSetListByIdLoading}
        onRefresh={getData}
        data={setListById.get(props?.route?.params?.id) || []}
        renderItem={({item}) => <SetItem item={item} />}
        keyExtractor={item => `${item.set.set_num}`}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
});
