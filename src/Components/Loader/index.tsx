import {ActivityIndicator, StyleSheet, View} from 'react-native';
type Props = {
  visible: boolean | undefined;
};
export const Loader = ({visible}: Props) => {
  return (
    visible && (
      <View style={styles.loader}>
        <ActivityIndicator size={'large'} color={'#8ab933'} />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(138, 185, 51, 0.1)',
  },
});
