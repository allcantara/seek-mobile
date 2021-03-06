import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './screens/Login/Login';
import Inicio from './screens/Inicio/Inicio';
import Pedidos from './screens/Pedidos/Pedidos';
import Confirmacao from './screens/Pedidos/Confirmacao';
import Sucesso from './screens/CompraRealizada/Sucesso';

export default createAppContainer(
  createStackNavigator(
    {
      Login: {
        screen: Login,
        navigationOptions: {
          headerShown: false
        }
      },
      Inicio: {
        screen: Inicio,
        navigationOptions: {
          headerShown: false
        }
      },
      Pedidos: {
        screen: Pedidos,
      },
      Confirmacao: {
        screen: Confirmacao,
        navigationOptions: {
          title: 'Finalizar',
        }
      },
      Sucesso: {
        screen: Sucesso,
        navigationOptions: {
          headerShown: false
        }
      }
    }
  )
);