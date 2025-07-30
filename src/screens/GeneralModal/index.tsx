import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import {RootStackParamList} from '../../router';
import {SetDetailsOptions} from './Modals/SetDetailsOptions';
type RouteProps = NativeStackScreenProps<RootStackParamList, 'GeneralModal'>;
export const GeneralModal = (props: RouteProps) => {
  const {details} = props.route.params;
  switch (details.flow) {
    case 'set_details_options':
      return (
        <SetDetailsOptions set_num={details.set_num} name={details.name} />
      );
    default:
      break;
  }
  return (
    <View>
      <Text>{'Modal not implemented'}</Text>
    </View>
  );
};
