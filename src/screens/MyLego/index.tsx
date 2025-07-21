import {useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import { RootStackParamList } from '../../router';
type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Tabs'>;
export const MyLegoScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const navigateToMySetList = () => {
    navigation.navigate('MyAllSetListScreen');
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={navigateToMySetList} style={styles.button}>
        <Text style={styles.buttonText}>{'My Set List'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    backgroundColor: '#484848',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
