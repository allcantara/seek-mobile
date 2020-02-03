import React from 'react';
import { Text, StyleSheet } from 'react-native';

// Passar o componente novamente para os pedidos pq ele não terá comportamentos próprios.
// Pensar na possibilidade de isolar todas as lógicas em arquivos para limpar mais o código.
export default props => <Text style={styles.qtd}>{props.quant}</Text>

const styles = StyleSheet.create({
  qtd: {
    fontSize: 26,
    fontWeight: 'bold',
  }
});
