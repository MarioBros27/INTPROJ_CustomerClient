import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const appSettings = require('../app-settings.json');

export default function ViewPlate({ route }) {

    const { restaurante } = route.params;
    const [ plates, setPlates ] = useState([]);

    useEffect(() => {
      axios.get(`${appSettings['backend-host']}/restaurants/${restaurante.id}/items`)
          .then(response => {
              setPlates(response.data)
          })
          .catch(error => alert(error))
    },[])

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: "bold" }}>
        {restaurante.name}
      </Text>
      
        <FlatList
          data={plates}
          renderItem={({item}) => (
            <>
              <View style={styles.item}>
                <View style={styles.rowContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.subtitle}>{item.description}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${item.price}</Text>
                    </View>
                </View>
              </View>

              <View style={styles.breakLine}>

              </View>
            </>
        )}/>
    </View>

    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#E8EAED',
  },

  item: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    marginVertical: 6,
    borderRadius: 15
  },

  breakLine: {
    marginVertical: 3,
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    marginHorizontal: 8
  },

  title: {
    fontSize: 18,
    marginBottom: 2,
    fontWeight: "bold"
  },

  subtitle: {
    fontSize: 16
  },

  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5768'
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  titleContainer: {
    width: '80%',
    alignItems: 'flex-start'
  },

  priceContainer: {
    alignItems: 'flex-end',
    marginRight: 15
  }
});