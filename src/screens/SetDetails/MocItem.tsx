import {StyleSheet, Text, View} from 'react-native';
import {IMocDetails} from '../../api/types';
import FastImage from 'react-native-fast-image';
type Props = {
  item: IMocDetails;
};
export const MocItem = ({item}: Props) => {
  return (
    <View>
      <FastImage
        style={styles.tinyLogo}
        source={{uri: item.moc_img_url}}
        resizeMode="contain"
      />
      <Text>{`Designer name: ${item.designer_name}`}</Text>
      <Text>{`Name: ${item.name}`}</Text>
      <Text>{`Num parts: ${item.num_parts}`}</Text>
      <Text>{`Year: ${item.year}`}</Text>
      <Text>{`Designer name: ${item.designer_name}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 'auto',
    height: 150,
  },
});
