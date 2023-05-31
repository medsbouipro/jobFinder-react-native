import { Dimensions } from 'react-native';
const { height } = Dimensions.get('window');
const percent= height/100;
export const space = [`${1*percent}px`, `${2*percent}px`, `${3*percent}px`, `${4*percent}px`, `${5*percent}px`, `${6*percent}px`];
