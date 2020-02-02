import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default props => <Text style={styles.qtd}>{props.quant}</Text>

const styles = StyleSheet.create({
  qtd: {
    fontSize: 26,
    fontWeight: 'bold',
  }
});
