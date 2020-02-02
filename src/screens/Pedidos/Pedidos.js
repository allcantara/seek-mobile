import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Quant from './Quantidade';

export default ({ navigation }) => {
  const [quantidade, setQuantidade] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => {
    const { item } = navigation.state.params;
    setQuantidade(0);
    setList([...item.produtos])
  }, []);

  const handleButtonPlus = () => {
    if(quantidade >= 0) {
      const qtd = 1;
      setQuantidade(quantidade + qtd);
    }
  }

  const handleButtonMinus = () => {
    if(quantidade > 0) {
      const qtd = -1;
      setQuantidade(quantidade + qtd);
    }
  }

  return (
    <View style={styles.container}>
        <FlatList
          data={list}
          keyExtractor={e => String(e.id)}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.componentItem}>
              <View style={styles.shadow}>
                <Image source={{ uri: item.foto }} style={styles.image} />
                <View>
                  <Text style={styles.name}>{item.nome.toUpperCase()}</Text>
                  <Text style={styles.price}>{`R$${item.preco.toFixed(2)}`}</Text>
                </View>
                <View style={styles.buttons}>
                  <View style={styles.buttonComponent}>
                    <TouchableOpacity onPress={handleButtonPlus} style={styles.buttonPlus}>
                      <Icon name="plus" size={16} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleButtonMinus} style={styles.buttonMinus}>
                      <Icon name="minus" size={16} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                  <Quant quant={quantidade} />
                </View>
              </View>
            </View>
          )}
        />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  componentItem: {
    width: (Dimensions.get('window').width / 2),
    height: 300,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // borderColor: 'rgba(0, 0, 0, 0.04)',
    // borderWidth: 0.3,
  },

  shadow: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 0,
    shadowColor: "#333",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 3,
  },

  image: {
    flex: 1,
  },

  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    paddingTop: 5,
  },

  price: {
    fontSize: 14,
    color: '#555',
    paddingVertical: 3,
    fontWeight: 'bold',
  },

  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },

  buttonComponent: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  buttonPlus: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    backgroundColor: '#4F5D75',
    borderRadius: 40,
  },

  buttonMinus: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    backgroundColor: '#EF8354',
    borderRadius: 40,
    left: 5,
  },

});
