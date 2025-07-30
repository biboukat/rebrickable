import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ISetDetails} from '../../api/types';
import FastImage from 'react-native-fast-image';
import {Loader} from '../Loader';

type Props = {
  item: ISetDetails;
  onPress?: () => void;
  flow?: 'set_list';
  deleteSetFromList?: () => void;
  loading?: boolean;
};
export const SetItem = ({
  item,
  onPress,
  flow,
  deleteSetFromList,
  loading,
}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FastImage
        style={styles.image}
        source={{uri: item.set_img_url}}
        resizeMode="contain"
      />
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.row}>
        <Text>{`Year: ${item.year}`}</Text>
        <Text>{'|'}</Text>
        <Text>{`Parts: ${item.num_parts}`}</Text>
        <Text>{'|'}</Text>
        <Text style={styles.setNum}>{item.set_num}</Text>
      </View>
      {flow === 'set_list' && (
        <TouchableOpacity style={styles.deleteSet} onPress={deleteSetFromList}>
          <Text>{'X'}</Text>
        </TouchableOpacity>
      )}
      <Loader visible={loading} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 4,
    overflow: 'hidden',
  },
  name: {
    fontSize: 20,
    fontWeight: 500,
  },
  image: {
    width: '100%',
    aspectRatio:
      Dimensions.get('screen').height / Dimensions.get('screen').width,
  },
  row: {
    flexDirection: 'row',
    gap: 4,
  },
  setNum: {
    fontWeight: 500,
  },
  deleteSet: {
    position: 'absolute',
    right: 4,
    top: 4,
    backgroundColor: '#ff000094',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});
