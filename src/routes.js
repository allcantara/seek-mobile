import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Inicio from './screens/Inicio/Inicio';
import Pedidos from './screens/Pedidos/Pedidos';
import Confirmacao from './screens/Pedidos/Confirmacao';

export default createAppContainer(
  createStackNavigator(
    {
      Inicio: {
        screen: Inicio,
        navigationOptions: {
          header: null
        }
      },
      Pedidos: {
        screen: Pedidos,
      },
      Confirmacao
    }
  )
);