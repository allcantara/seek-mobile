import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import api from '../../services/api';

export default props => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    setLista([...api]);
  }, []);

  const onNavigator = (item) => {
    props.navigation.navigate('Pedidos', { item });
  }


  const componentList = item => {
    return (
      <TouchableOpacity onPress={() => onNavigator(item)}>
        <View style={styles.row}>
          <ImageBackground source={{ uri: item.imagem }} style={styles.background}>
            <View style={styles.itemContainer}>
              <Text style={styles.nameTitle} >{item.nome}</Text>
              <Text style={styles.nameSubTitle} >{item.endereco}</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={lista}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => componentList(item)}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  
  compList: {
    height: Dimensions.get('window').height,
    backgroundColor: '#FFF',
  },
  
  row: {
    borderColor: '#FFF',
    borderWidth: 1,
  },
  
  background: {
    height: 200,
  },
  
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  nameTitle: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
  },

  nameSubTitle: {
    color: '#FFF',
    fontSize: 18,
  }

});

