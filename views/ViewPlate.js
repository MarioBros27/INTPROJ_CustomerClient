import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const appSettings = require('../app-settings.json');

export default function ViewPlate({navigation, route}) {
    const { restaurante } = route.params;
    const [plates, setPlates] = useState([])

    useEffect(() => {
        axios.get(`${appSettings['backend-host']}/restaurants/${restaurante.id}/items`)
            .then(response => {
                setPlates(response.data)
            })
            .catch(error => alert(error))
    },[])

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.nameRestaurante}>
          {restaurante.name}
        </Text>

        
          <FlatList
            data={plates}
            renderItem={({item}) => (
              <View style={styles.menuList}>
                <Text style={styles.plateName}>{item.name}</Text>
                <Text>MXN${item.price}</Text>
                <Text style={styles.textDesc}>{item.description}</Text>
              </View>
          )}/>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  header:{
    flexDirection: 'column',
  },
  menuList: {
    maxWidth: '100%',
    alignSelf: 'auto',
    fontSize: 18,
    flexDirection: 'column',
    textAlign: 'left',
    backgroundColor: '#FDFDF8',
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 15,
    marginTop: 20,
    borderRadius: 20,
    padding: 25,
  },
  plateName: {
    fontWeight: 'bold',
  },
  textDesc: {
    textAlign: 'justify',
  },
  nameRestaurante: {
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: '100%',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
});