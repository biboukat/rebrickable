import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {IMocDetails} from '../../api/types';
import FastImage from 'react-native-fast-image';
type Props = {
  item: IMocDetails;
};
export const MocItem = ({item}: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <FastImage
          style={styles.tinyLogo}
          source={{uri: item.moc_img_url}}
          resizeMode="contain"
        />
        <Text>{`Designer name: ${item.designer_name}`}</Text>
        <Text>{`Name: ${item.name}`}</Text>
        <Text>{`Num parts: ${item.num_parts}`}</Text>
        <Text>{`Year: ${item.year}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: '100%',
    aspectRatio:
      Dimensions.get('screen').height / Dimensions.get('screen').width,
  },
  container: {
    backgroundColor: 'rgba(138, 185, 51, 0.1)',
    borderRadius: 16,
    padding: 4,
  },
  wrapper: {
    paddingHorizontal: 24,
    paddingVertical: 4,
  },
});
