import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Alert,
  AsyncStorage,
  ImageBackground,
} from 'react-native';

import api from '../../services/api';
import Constantes from '../../constants/Constantes'

export default ({ navigation }) => {
  const [list, setList] = useState([]);
  const [listPurchase, setListPurchase] = useState([]);
  const [sum, setSum] = useState(0);


  useEffect(() => {
    const { item } = navigation.state.params
    indexProducts(item)
  }, [])


  const indexProducts = async (item) => {
    try {
      const { status, data } = await api.get(`/restaurant/products/${item._id}`)

      if(status === 203) {
        Alert.alert('Atenção', 'Falha de autenticação!')
        navigation.navigate('Login');
        await AsyncStorage.clear()
      }

      if(status === 202) {
        Alert.alert('Atenção', data.message)
      }

      if(status === 200) {
        data.map(prod => {
          const image_url = prod.image_url.replace('localhost', Constantes.HTTP_HOST);
          prod.amount = 0
          prod.image_url = image_url
        })
        
        if(data.length === 0) {
          Alert.alert('Atenção', 'Nenhum produto cadastrado!')
        }        

        setList([...data])
      }



    } catch(error) {
      console.debug(error)
      Alert.alert('Atenção', 'Falha ao buscar os produtos!')
    }
  }

  const handleButtonPlus = (item) => {
    if(item.amount >= 0) {
      const produtos = [...list];
      produtos.map(prod => {
        if(prod._id === item._id) {
          prod.amount += 1;
        }
      })
      setList([ ...produtos ]);
      sumUp(item);
      addItemListPurchase(item);
    }
  }


  const addItemListPurchase = (item) => {
    let itemList = [...listPurchase];

    if(itemList.length === 0) {
      itemList.push(item);
    }

    let itemFilter = itemList.filter(e => e._id === item._id);
    if(itemFilter.length === 0) {
      itemList.push(item);
    }

    setListPurchase([...itemList]);
  }

  const handleButtonMinus = (item) => {
    if(item.amount > 0) {
      const produtos = [...list];
      produtos.map(prod => {
        if(prod._id === item._id) {
          prod.amount -= 1;
        }
      })
      sumDown(item)
      setList([ ...produtos ]);
    }
  }

  const sumUp = (item) => {
    const soma = sum + item.price;
    setSum(soma);
  }

  const sumDown = (item) => {
    let soma = sum - item.price;
    if(soma < 0) {
      soma = 0
    }
    setSum(soma);
  }

  const handleConfirm = () => {
    if(sum > 0) {
      const data = {
        products: listPurchase.filter(item => item.amount > 0),
        sum,
      }

      navigation.navigate('Confirmacao', { data });
    }
  }

  // A comportamento da replicação da contagem da quantidade pode estar acontecendo devido ao produto esta dentro da lista.
  // Tente criar uma lógica em que o produto virá com a quantidade e o no momento do incremento
  //  alteramos o valor de dentro da lista e e depois atualizamos o estado.
  
  // É importante lembrar de isolar os componentes pq talvez o comportamento no RN seja diferente do ReactJS.
  return (
    <>
    <View style={styles.container}>
        <FlatList
          data={list}
          keyExtractor={e => String(e._id)}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.componentItem}>
              <View style={styles.shadow}>
                <ImageBackground source={{ uri: item.image_url }} style={styles.image}>
                </ImageBackground>
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>R$ {String(item.price.toFixed(2)).replace('.', ',')}</Text>
                </View>
                <View style={styles.buttons}>
                  <View style={styles.buttonComponent}>
                    <TouchableOpacity onPress={() => handleButtonPlus(item)} style={styles.buttonPlus}>
                      <Icon name="plus" size={16} color="#624CAB" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleButtonMinus(item)} style={styles.buttonMinus}>
                      <Icon name="minus" size={16} color="#624CAB" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.qtd}>{item.amount}</Text>
                </View>
              </View>
            </View>
          )}
        />
        </View>
        <View style={styles.containerQuantidade}>
          <View style={styles.quant}>
            <Text style={styles.sum}>R$ {String(sum.toFixed(2)).replace('.', ',')}</Text>
          </View>
          <TouchableOpacity
            disabled={sum > 0 ? false : true}
            style={{ ...styles.button, backgroundColor: sum > 0 ? '#624CAB' : '#999' }} // 624CAB
            onPress={() => handleConfirm()} >
            <Text style={styles.text}>CONFIRMAR</Text>
          </TouchableOpacity>
        </View>
    </>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: 65,
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
    // height: Dimensions.get('window').height / 7
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
    backgroundColor: '#EEE',
    borderRadius: 40,
  },

  buttonMinus: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    backgroundColor: '#EEE',
    borderRadius: 40,
    left: 5,
  },

  qtd: {
    fontSize: 26,
    marginBottom: 5,
    fontWeight: 'bold',
  },



  containerQuantidade: {
    flex: 1,
    // height: 50,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 0,
    paddingHorizontal: 8,
    paddingVertical: 10,
    zIndex: 5,
    backgroundColor: '#FFF',
  },

  button: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    borderRadius: 4,
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

  quant: {
    flex: 1,
    height: 50,
    backgroundColor: 'rgb(76, 171, 100)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 5,
    shadowColor: "#333",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 3,
  },

  sum: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },

});
