import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default props => {

  const onNavigator = () => {
    props.navigation.navigate('Inicio')
  }

  return (
    <View style={{top: 30, flex: 1, backgroundColor: '#333'}}>
      <Text>CONFIRMAÇÃO</Text>
      <TouchableOpacity onPress={onNavigator} >
        <Text>
          Inicio
        </Text>
      </TouchableOpacity>
    </View>
  );
}
