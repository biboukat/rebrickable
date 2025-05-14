import {ActivityIndicator, StyleSheet, View} from 'react-native';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={'#8ab933'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
