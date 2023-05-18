import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Routes from './src/navigation/routes';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <Routes />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
