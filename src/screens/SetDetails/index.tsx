import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
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
    <SafeAreaView edges={['bottom']} style={styles.wrapper}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <FastImage
              style={styles.tinyLogo}
              source={{uri: setDetails?.set_img_url}}
              resizeMode="contain"
            />
            <View style={styles.details}>
              <Text style={styles.name}>{`Name: ${setDetails?.name}`}</Text>
              <View style={styles.row}>
                <Text>{`Parts: ${setDetails?.num_parts}`}</Text>
                <Text>{'|'}</Text>
                <Text>{`${setDetails?.year}`}</Text>
              </View>
              <Text style={styles.mocs}>{`MOCs - total(${
                mocsBySetId.get(set_num)?.count
              })`}</Text>
            </View>
          </>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshing={setDetailsLoading}
        onRefresh={getData}
        data={mocsBySetId.get(set_num)?.results || []}
        renderItem={({item}) => <MocItem item={item} />}
        keyExtractor={item => `${item.set_num}`}
        style={styles.list}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  list: {flexGrow: 1},
  tinyLogo: {
    width: '100%',
    aspectRatio:
      Dimensions.get('screen').height / Dimensions.get('screen').width,
  },
  name: {
    fontSize: 20,
    fontWeight: 500,
  },
  details: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 8,
  },
  mocs: {
    fontSize: 18,
    fontWeight: 500,
  },
  separator: {
    height: 8,
  },
});
