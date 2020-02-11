import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';

// @ts-ignore
import obrigado from '../../assets/obrigado.jpg';

export default ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Image source={obrigado} style={styles.image} /> */}
      <Text style={styles.title}>Pedido realizado com sucesso!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Inicio')} style={styles.button}>
        <Text style={styles.text}>INÍCIO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
  },

  title: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    paddingVertical: 30,
  },

  button: {
    width: 300,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#624CAB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#333",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 3,
  },

  text: {
    color: '#FFF',
    fontSize: 18,
  },
})
