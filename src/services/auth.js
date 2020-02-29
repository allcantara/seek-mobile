import React from 'react'
import { AsyncStorage } from 'react-native'

export const getToken = async () => {
  const token =  await AsyncStorage.getItem('TOKEN')
  return token
}

export default { getToken }