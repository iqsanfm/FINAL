import React from 'react';
import {Text, View} from 'react-native';

import Dasboard from './src/screens/Dasboard';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import History from './src/screens/History';
import Navigation from './src/Navigation/Navigation';
import 'react-native-gesture-handler';

export default function App() {
  return <Navigation />;
}
