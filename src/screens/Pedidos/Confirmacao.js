// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import deviceConfig from '../../constants/Device'
import paymentConfig from '../../constants/Payment'
import api from '../../services/api'

export default ({ navigation }) => {
  const [sum, setSum] = useState(0);
  const [user, setUser] = useState({})
  const [lista, setLista] = useState([]);
  const [restaurant, setRestaurant] = useState('')

  useEffect(() => {
    const { data, user: dataUser } = navigation.state.params;
    setSum(data.sum)
    setUser(dataUser)
    setLista([...data.products])
    setRestaurant(data.restaurant)
  }, [])


  const handleFinish = async () => {
    try {
      let products = []

      lista.map(prod => {
        products.push({
          item: prod._id,
          amount: prod.amount,
        })
      })

      const purchase = {
        restaurant,
        user: user._id,
        device: deviceConfig.APP,
        priceTotal: sum,
        payment: paymentConfig.CARD,
        products,
      }

      const { status, data } = await api.post('/purchase', purchase)

      if (status === 200) {
        navigation.navigate('Sucesso', { purchase: data })
      } else if (status === 202) {
        Alert.alert('Desculpe', data.message)
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Desculpe', 'Ocorreu uma falha ao processar o pedido!')
    }

  }


  const componentList = item => {
    const image_url = item.image_url.replace('localhost', '192.168.0.116')
    return (
      <View style={styles.row}>
        <Image source={{ uri: image_url }} style={styles.image} />
        <View style={styles.itemContainer}>
          <Text style={styles.nome} >{item.name}</Text>
          <Text style={styles.preco} >Preço: R$ {String(item.price.toFixed(2)).replace('.', ',')}</Text>
          <Text style={styles.quantidade} >Quantidade: {item.amount}</Text>
        </View>
      </View>
    )
  }


  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={lista}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => componentList(item)}
        />
      </SafeAreaView>
      <View style={styles.containerQuantidade}>
        <TouchableOpacity style={styles.button} onPress={() => handleFinish()}>
          <Text style={styles.text}>FINALIZAR: R$ {String(sum.toFixed(2)).replace('.', ',')}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: 62,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'rgba(0,0,0,0.08)',
    borderBottomWidth: 0.7,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  image: {
    width: 80,
    height: 80,
  },


  itemContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },

  nome: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#333',
  },

  preco: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: '#333',
  },

  quantidade: {
    // paddingVertical: 2,
    fontSize: 14,
    // fontWeight: 'bold',
    color: '#333',
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
    backgroundColor: '#624CAB',
    borderRadius: 25,
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

});
