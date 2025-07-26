import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlatList, StyleSheet, Text} from 'react-native';
import {RootStackParamList} from '../../router';
import {useEffect} from 'react';
import {useStore} from '../../stores';
import {observer} from 'mobx-react';
import {MocItem} from './MocItem';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

type RouteProps = NativeStackScreenProps<
  RootStackParamList,
  'SetDetailsScreen'
>;
export const SetDetails = observer((props: RouteProps) => {
  const set_num = props?.route?.params?.set_num;
  const {
    setsStore: {
      getSpecificSetDetails,
      mocsBySetId,
      setDetailsLoading,
      setsById,
    },
  } = useStore();
  const getData = () => {
    getSpecificSetDetails(set_num);
  };
  useEffect(() => {
    getData();
  }, []);
  const setDetails = setsById.get(set_num);
  return (
    <SafeAreaView edges={['bottom']}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <FastImage
              style={styles.tinyLogo}
              source={{uri: setDetails?.set_img_url}}
              resizeMode="contain"
            />
            <Text>{`Name: ${setDetails?.name}`}</Text>
            <Text>{`Num parts ${setDetails?.num_parts}`}</Text>
            <Text>{`Year ${setDetails?.year}`}</Text>
            <Text>{`MOCs - total(${mocsBySetId.get(set_num)?.count})`}</Text>
          </>
        )}
        refreshing={setDetailsLoading}
        onRefresh={getData}
        data={mocsBySetId.get(set_num)?.results || []}
        renderItem={({item}) => <MocItem item={item} />}
        keyExtractor={item => `${item.set_num}`}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  tinyLogo: {width: 'auto', height: 200},
});
