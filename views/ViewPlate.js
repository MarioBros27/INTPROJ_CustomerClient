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
  //const [plates, setPlates] = useState([
    //{ name:'Bola con Pollo', price:137, description:'Pasta tampico, aguacate, queso philadelphia y camarón. Bañada en salsa de anguila y chipotle con verdura de pepino.', key:1 },
    //{ name:'Bola con Pastor', price:133, description:'Pasta tampico, aguacate, queso philadelphia y camarón. Bañada en salsa de anguila y chipotle con verdura de pepino.', key:2 },
    //{ name:'Bola con Carne de Res', price:149, description:'Pasta tampico, aguacate, queso philadelphia y carne de res. Bañada en salsa de anguila y chipotle con verdura de pepino.', key:3 },
    //{ name:'Bola con Camaron', price:142, description:'Pasta tampico, aguacate, queso philadelphia y camarón. Bañada en salsa de anguila y chipotle con verdura de pepino.', key:4 },
    //{ name:'Bola con Tocino', price:140, description:'Pasta tampico, aguacate, queso philadelphia y pastor. Bañada en salsa de anguila y chipotle con trozos de piña.', key:5 },
    //{ name:'Bola con Pollo', price:137, description:'Pasta tampico, aguacate, queso philadelphia y camarón. Bañada en salsa de anguila y chipotle con verdura de pepino.', key:6 },
    //{ name:'Bola con Pastor', price:133, description:'Pasta tampico, aguacate, queso philadelphia y camarón. Bañada en salsa de anguila y chipotle con verdura de pepino.', key:7 },
    //{ name:'Bola con Carne de Res', price:149, description:'Pasta tampico, aguacate, queso philadelphia y carne de res. Bañada en salsa de anguila y chipotle con verdura de pepino.', key:8 },
    //{ name:'Bola con Camaron', price:142, description:'Pasta tampico, aguacate, queso philadelphia y camarón. Bañada en salsa de anguila y chipotle con verdura de pepino.', key:9 },
  //  { name:'Bola con Tocino', price:140, description:'Pasta tampico, aguacate, queso philadelphia y pastor. Bañada en salsa de anguila y chipotle con trozos de piña.', key:10 },
//  ])

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