import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ISetDetails} from '../../api/types';
import FastImage from 'react-native-fast-image';

type Props = {item: ISetDetails; onPress?: () => void};
export const SetItem = ({item, onPress}: Props) => {
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
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: 500,
  },
  image: {
    width: '100%',
    aspectRatio:
      Dimensions.get('screen').height / Dimensions.get('screen').width, // Use your calculated aspect ratio
  },
  row: {
    flexDirection: 'row',
    gap: 4,
  },
  setNum: {
    fontWeight: 500,
  },
});
