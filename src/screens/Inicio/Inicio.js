import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native';

import api from '../../services/api';

export default ({ navigation }) => {
  const [lista, setLista] = useState([]);
  const [user, setUser] = useState({})

  useEffect(() => {
    indexRestaurants()
    setUser(navigation.state.params.user)
  }, []);

  const onNavigator = (item) => {
    navigation.navigate('Pedidos', { item });
  }

  const indexRestaurants = async () => {
    try {
      if(lista.length === 0) {
        const { status, data } = await api.get('/restaurant')
        if(status === 203) {
          Alert.alert('Atenção', 'Falha de autenticação!')
          navigation.navigate('Login');
          await AsyncStorage.clear()
        }
        
        setLista([...data])
      }
    } catch(error) {
      console.debug(error)
      Alert.alert('Atenção', 'Falha ao buscar os restaurantes!')
    }
  }

  const componentList = item => {
    const image_url = item.image_url.replace('localhost', '192.168.0.116')
    return (
      <TouchableOpacity onPress={() => onNavigator(item)}>
        <View style={styles.row}>
          <ImageBackground source={{ uri: image_url }} style={styles.background}>
            <View style={styles.itemContainer}>
              <Text style={styles.nameTitle} >{item.name}</Text>
              <Text style={styles.nameSubTitle} >{item.addressName}</Text>
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

