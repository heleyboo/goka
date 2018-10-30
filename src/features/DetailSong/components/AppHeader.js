import React from 'react';
import { Header } from 'react-native-elements';

const AppHeader = ({ headerText }) => (
  <Header
    centerComponent={{ text: headerText, style: { color: 'white', fontSize: 17 } }}
    outerContainerStyles={{ backgroundColor: '#E62117' }}
  />
);

export default AppHeader;