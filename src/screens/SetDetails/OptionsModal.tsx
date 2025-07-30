import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
type Props = {
  visible: boolean;
  onClose: () => void;
};
export const OptionsModal = ({visible}: Props) => {
  return (
    <Modal visible={visible} transparent>
      <SafeAreaView style={styles.wrapper} edges={['top', 'bottom']}>
        <View>
          <Text>{'Modal'}</Text>
          <Text>{'Modal'}</Text>
        </View>

        <TouchableOpacity>
          <Text>{'X'}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(138, 185, 51, 0.1)',
    flex: 1,
  },
});
