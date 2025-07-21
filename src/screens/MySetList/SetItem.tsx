import {StyleSheet, Text, View} from 'react-native';
import {ISetsListItem} from '../../api/types';
import FastImage from 'react-native-fast-image';

type Props = {item: ISetsListItem};
export const SetItem = ({item}: Props) => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.tinyLogo}
        source={{uri: item.set.set_img_url}}
        resizeMode="contain"
      />
      <View>
        <Text>{`Name: ${item.set.name}`}</Text>
        <Text>{`Num parts: ${item.set.num_parts}`}</Text>
        <Text>{`Year: ${item.set.year}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#fafafa',
    marginBottom: 4,
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  tinyLogo: {
    width: 100,
    height: 150,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
